import { useEffect } from 'react';
import { Heart, ShieldCheck, Smile, Home, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LANDING_HERO_IMAGE } from '../constants/settings';

interface LandingProps {
  onNavigate: (screen: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      onNavigate('home');
    }
  }, [user, loading, onNavigate]);
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-md flex justify-between items-center px-6 h-16 border-b border-surface-variant/30">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-primary font-headline">Paws & Hearts</span>
        </div>
        <button className="text-primary font-headline font-bold text-sm hover:opacity-80 transition-opacity">
          Help
        </button>
      </header>

      <main className="flex-1 flex flex-col pt-6 pb-12 px-6 max-w-lg mx-auto w-full gap-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface-container rotate-3 shadow-lg ring-4 ring-white">
              <img
                className="w-full h-full object-cover"
                alt="Small cute puppy looking up"
                src={LANDING_HERO_IMAGE}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary-container text-white p-2 rounded-full shadow-lg">
              <Heart className="w-5 h-5" fill="currentColor" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-on-surface tracking-tight leading-tight font-headline">
              Find Your <br />
              <span className="text-primary italic">Furry Soulmate</span>
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed font-body">
              A compassionate space to find the perfect pet companion for your lifestyle.
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-3xl p-6 space-y-6">
          <h2 className="text-center text-xs font-headline font-extrabold uppercase tracking-[0.2em] text-outline">
            The Paws & Hearts Promise
          </h2>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-primary-fixed-dim text-on-primary-fixed p-2.5 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-base">Vetted Shelters</h3>
                <p className="text-sm text-on-surface-variant leading-snug">
                  Every partner shelter is thoroughly inspected for ethics and care standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-secondary-fixed-dim text-on-secondary-fixed p-2.5 rounded-2xl flex items-center justify-center">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-base">Personality Matching</h3>
                <p className="text-sm text-on-surface-variant leading-snug">
                  Our smart assessment finds the dog or cat that truly vibes with your home.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-tertiary-fixed-dim text-on-tertiary-fixed p-2.5 rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-base">Trial Adoption</h3>
                <p className="text-sm text-on-surface-variant leading-snug">
                  Bring them home for 2 weeks. Ensure it's a perfect match before finalizing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-primary text-on-primary py-5 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            Login
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col gap-2 items-center">
            <button 
              onClick={() => onNavigate('signup')}
              className="w-full bg-surface-container-high text-on-surface py-4 rounded-full font-headline font-bold text-base transition-colors hover:bg-surface-container-highest active:scale-95"
            >
              Sign Up
            </button>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="text-secondary font-headline font-bold text-sm border-b-2 border-secondary-container hover:opacity-80 transition-opacity"
              >
                Browse pets without signing up
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
