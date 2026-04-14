import { useState, useEffect } from 'react';
import { Settings, MapPin, ChevronRight, Heart, PlusCircle, User, FileText, Bell, SlidersHorizontal, ShieldAlert, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/favorites';
import { getLatestApplication } from '../services/applications';
import { DEFAULT_AVATAR, APP_CONFIG } from '../constants/settings';
import type { Favorite, Application } from '../types';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [latestApp, setLatestApp] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setIsLoading(true);
      
      const [favData, appData] = await Promise.all([
        getFavorites(user.id),
        getLatestApplication(user.id),
      ]);

      setFavorites(favData);
      setLatestApp(appData);
      setIsLoading(false);
    };
    loadData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    onNavigate('landing');
  };

  const displayName = profile?.full_name || user?.email || 'User';
  const displayLocation = profile?.city && profile?.state 
    ? `${profile.city}, ${profile.state}` 
    : profile?.address || 'Location not set';



  // Get completed steps count for the latest application
  const completedSteps = latestApp
    ? (latestApp.review_steps || []).filter((s) => s.status === 'approved').length
    : 0;
  const totalSteps = latestApp ? (latestApp.review_steps || []).length : APP_CONFIG.TOTAL_REVIEW_STEPS;

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="bg-surface/80 backdrop-blur-lg fixed top-0 w-full z-50 shadow-[0_4px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-5xl mx-auto">
          <button className="active:scale-95 transition-transform">
            <Settings className="text-primary w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg tracking-tight text-primary">Profile</h1>
            <img
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover"
              src={profile?.avatar_url || DEFAULT_AVATAR}
            />
          </div>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto space-y-10 w-full">
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-primary-fixed overflow-hidden">
              <img
                alt={`${displayName} Profile`}
                className="w-full h-full object-cover"
                src={profile?.avatar_url || DEFAULT_AVATAR}
              />
            </div>
            <div className="absolute -bottom-2 right-2 bg-secondary-container text-on-secondary-container p-2 rounded-full shadow-sm">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">{displayName}</h2>
            <div className="flex items-center justify-center gap-1 text-on-surface-variant font-medium">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{displayLocation}</span>
            </div>
          </div>
        </section>

        {/* Adoption Journey */}
        {latestApp && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold">Adoption Journey</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                {latestApp.status === 'pending' ? 'In Progress' : latestApp.status}
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                {latestApp.pet && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 hidden md:block">
                    <img
                      alt={latestApp.pet.name}
                      className="w-full h-full object-cover"
                      src={latestApp.pet.image_url}
                    />
                  </div>
                )}
                <div className="flex-1 space-y-6 w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-primary uppercase tracking-widest">Application Review</span>
                      <span className="text-outline-variant">•</span>
                      <span className="text-on-surface font-headline font-bold">{latestApp.pet?.name || 'Pet'}</span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Your application is moving forward! Keep an eye on the review status for updates.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div className="bg-surface-container-lowest px-4 py-2 rounded-full text-xs font-bold text-on-surface flex items-center gap-2 w-fit">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                      Step {completedSteps} of {totalSteps} Complete
                    </div>
                    <button 
                      onClick={() => onNavigate('application-review')}
                      className="text-primary font-bold text-sm hover:underline underline-offset-4 flex items-center gap-1 w-fit"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Saved Pets */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-xl font-bold">Saved Pets</h3>
            <button 
              onClick={() => onNavigate('favorites')}
              className="text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80"
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-surface-container-low rounded-xl overflow-hidden aspect-square animate-pulse"></div>
              ))
            ) : (
              <>
                {favorites.slice(0, 3).map((fav) => {
                  const pet = fav.pet;
                  if (!pet) return null;
                  return (
                    <div 
                      key={fav.id} 
                      onClick={() => navigate(`/${pet.id}/petDetails`)}
                      className="group relative bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl transition-shadow aspect-square cursor-pointer"
                    >
                      <img
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        src={pet.image_url}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-headline font-bold">{pet.name}</p>
                        <p className="text-white/80 text-xs">{pet.breed}</p>
                      </div>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center text-error">
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
            <div onClick={() => onNavigate('search')} className="bg-surface-container border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-4 text-center aspect-square active:scale-95 transition-transform cursor-pointer">
              <PlusCircle className="text-primary w-8 h-8 mb-2" />
              <p className="text-sm font-bold text-on-surface">Explore More</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Discover Pets</p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold px-2">Account Settings</h3>
            <div className="bg-surface-container-lowest rounded-lg divide-y divide-surface-variant overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Personal Information</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Adoption Documents</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Notification Settings</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold px-2">Preferences</h3>
            <div className="bg-surface-container-lowest rounded-lg divide-y divide-surface-variant overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Search Filters</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Privacy & Data</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </button>
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group"
              >
                <div className="flex items-center gap-3 text-error">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-bold">Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
