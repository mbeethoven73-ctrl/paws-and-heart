import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Lock, ArrowLeft, AtSign, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface SignUpProps {
  onNavigate: (screen: string) => void;
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const { signUp, user, loading } = useAuth();

  // Auto-redirect if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      onNavigate('home');
    }
  }, [user, loading, onNavigate]);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signUpError, requiresConfirmation } = await signUp(formData.email, formData.password, {
      fullName: formData.fullName,
      username: formData.username,
      phone: formData.phone,
      address: formData.address,
    });

    if (signUpError) {
      setError(signUpError);
      toast.error(signUpError);
      setIsLoading(false);
    } else if (requiresConfirmation) {
      toast.info('Account created! Please check your email.');
      setIsLoading(false);
      onNavigate('verify-email');
    } else {
      toast.success('Account created successfully! Welcome to Paws & Hearts.');
      onNavigate('home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Sign Up</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-24 pb-12 px-6 max-w-md mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
            Create Account
          </h2>
          <p className="text-on-surface-variant font-body">
            Join Paws & Hearts to find your furry soulmate.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-4">
            {error && (
              <div className="bg-error-container/20 border border-error/30 text-error rounded-lg px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="johndoe123"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="john@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="(555) 123-4567"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface ml-1">Home Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-outline" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="123 Main St, City, State"
                  required
                  disabled={isLoading}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  placeholder="Create a strong password (min 6 characters)"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <p className="text-center text-sm text-on-surface-variant pb-8">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('login')}
                className="font-bold text-primary hover:underline underline-offset-4"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
