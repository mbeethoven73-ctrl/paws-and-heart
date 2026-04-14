import React from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface VerifyEmailProps {
  onNavigate: (screen: string) => void;
}

export default function VerifyEmail({ onNavigate }: VerifyEmailProps) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Verify Email</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-6 max-w-md mx-auto w-full text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center">
            <Mail className="w-12 h-12 text-on-primary-container" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-surface shadow-md">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
          Check your inbox
        </h2>
        <p className="text-on-surface-variant font-body mb-8">
          We've sent a verification link to your email address. Please click the link to confirm your account and log in.
        </p>

        <div className="space-y-4 w-full">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-primary text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Go to Login
          </button>
          
          <button
            onClick={() => window.open('mailto:', '_blank')}
            className="w-full bg-surface-container text-on-surface py-4 rounded-full font-headline font-bold text-lg active:scale-95 transition-transform border border-outline-variant/30 hover:bg-surface-container-high"
          >
            Open Mail App
          </button>
        </div>

        <p className="mt-8 text-sm text-on-surface-variant/70">
          Didn't receive the email? Check your spam folder or try signing in again to trigger a new link.
        </p>
      </main>
    </div>
  );
}
