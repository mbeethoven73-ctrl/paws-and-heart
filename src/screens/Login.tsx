import React, { useState, useEffect } from 'react';
import { User, Lock, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onNavigate: (screen: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const { signIn, user, loading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Auto-redirect if user gets authenticated successfully
  useEffect(() => {
    if (!loading && user) {
      onNavigate('home');
    }
  }, [user, loading, onNavigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError, requiresConfirmation } = await signIn(identifier, password);
     
    if (requiresConfirmation) {
      toast.info('Please confirm your email address first.');
      setIsLoading(false);
      onNavigate('verify-email');
      return;
    }

    if (signInError) {
      setError(signInError);
      toast.error(signInError);
      setIsLoading(false);
      return;
    }

    // ✅ optional but cleaner UX
    setIsLoading(false);
    // Note: Do not manually navigate here. If signIn succeeds, the AuthContext 
    // will detect the session change (via onAuthStateChange), update the `user` object, 
    // and trigger the useEffect above to auto-redirect.
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Login</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-24 pb-12 px-6 max-w-md mx-auto w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
            Welcome Back!
          </h2>
          <p className="text-on-surface-variant font-body">
            Log in to continue your adoption journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-4">
            {error && (
              <div className="bg-error-container/20 border border-error/30 text-error rounded-lg px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading || loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || loading}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="button" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                Forgot password?
              </button>
            </div>
          </div>

          <div className="mt-auto pt-8 space-y-4">
            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {(isLoading || loading) ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <p className="text-center text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('signup')}
                className="font-bold text-primary hover:underline underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
