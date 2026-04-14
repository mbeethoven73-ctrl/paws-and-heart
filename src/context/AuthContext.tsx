import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    metadata: SignUpMetadata
  ) => Promise<{ error: string | null; requiresConfirmation?: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; requiresConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface SignUpMetadata {
  fullName: string;
  username: string;
  phone: string;
  address: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error.message);
        return;
      }

      setProfile(data as Profile);
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  }, []);

useEffect(() => {
    let mounted = true;

    // Helper to keep state perfectly in sync
    const updateAuthState = async (currentSession: Session | null) => {
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false); // Make sure the app unlocks
    };

    // 1. Setup the listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log('onAuthStateChange:', _event);
        updateAuthState(newSession);
      }
    );

    // 2. Run the safety net, but gracefully catch the race condition
    supabase.auth.getSession()
      .then(({ data: { session: initialSession } }) => {
        updateAuthState(initialSession);
      })
      .catch((error) => {
        // ✅ We gracefully swallow the lock error!
        // If this error fires, it means onAuthStateChange successfully won the race 
        // and is already handling the session check.
        if (error.message.includes('runnable')) {
          console.warn("Expected Supabase lock race condition ignored safely.");
        } else {
          console.error("Real session fetch error:", error);
        }
      })
      .finally(() => {
        // Guarantee loading turns false no matter who won the race
        if (mounted) setLoading(false); 
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

useEffect(() => {
  if (window.location.hash.includes("access_token")) {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + "#/home"
    );
  }
}, []);

  // ✅ Sign up
  const signUp = async (
  email: string,
  password: string,
  metadata: SignUpMetadata
): Promise<{ error: string | null; requiresConfirmation?: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.fullName,
          username: metadata.username,
          phone: metadata.phone,
          address: metadata.address,
        },
        // ADD THIS: This prevents the SDK from automatically 
        // signing the user in before they confirm their email.
       emailRedirectTo: "https://mbeethoven73-ctrl.github.io/paws-and-heart/#/home",
      },
    });

    if (error) return { error: error.message };

    // CHECK THIS: If user exists but session is null, it means 
    // they MUST confirm their email first.
    const requiresConfirmation = data.user && !data.session;

    // Manual profile creation (Keep your existing upsert logic here)
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: metadata.fullName,
        username: metadata.username,
        email: email,
        // ... other fields
      });
    }

    return { error: null, requiresConfirmation: !!requiresConfirmation };
  } catch {
    return { error: 'Unexpected error during sign up' };
  }
};

  // ✅ Sign in
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: string | null; requiresConfirmation?: boolean }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          return { error: error.message, requiresConfirmation: true };
        }
        return { error: error.message };
      }

      // ✅ No manual state update needed
      // Supabase will trigger onAuthStateChange

      return { error: null };
    } catch {
      return { error: 'Unexpected error during sign in' };
    }
  };

  // ✅ Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  // ✅ Refresh profile manually
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}