import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getFavorites, removeFavorite } from '../services/favorites';
import type { Favorite } from '../types';
import { DEFAULT_AVATAR } from '../constants/settings';


interface FavoritesProps {
  onNavigate: (screen: string) => void;
}

export default function Favorites({ onNavigate }: FavoritesProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    
    const loadFavorites = async () => {
      if (!user) return;
      setIsLoading(true);
      const data = await getFavorites(user.id);
      setFavorites(data);
      setIsLoading(false);
    };
    loadFavorites();
  }, [user]);

  const handlePetClick = (id: number) => {
    navigate(`/${id}/petDetails`);
  };

  const handleRemoveFavorite = async (e: React.MouseEvent, petId: number) => {
    e.stopPropagation();
    if (!user) return;
    try {
      await removeFavorite(user.id, petId);
      setFavorites(prev => prev.filter(f => f.pet_id !== petId));
      toast.info('Removed from favorites');
    } catch (err) {
      toast.error('Failed to remove favorite');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('home')} className="active:scale-95 duration-200 transition-opacity hover:opacity-80">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Favorites</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container active:scale-95 duration-200"
          >
            <img
              alt="User Profile"
              src={DEFAULT_AVATAR}
  />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <section className="mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
            Saved Pets
          </h2>
          <p className="text-on-surface-variant max-w-md">
            The furry friends you've kept an eye on.
          </p>
        </section>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden h-full animate-pulse border border-outline-variant/20">
                <div className="h-72 bg-surface-container-high"></div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-surface-container-high rounded w-1/2"></div>
                    <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-surface-container-high rounded-full w-16"></div>
                    <div className="h-6 bg-surface-container-high rounded-full w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((fav) => {
              const pet = fav.pet;
              if (!pet) return null;
              return (
                <div
                  key={fav.id}
                  onClick={() => handlePetClick(pet.id)}
                  className="group relative bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={pet.image_url}
                    />
                    <button 
                      className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded-full transition-colors text-error"
                      onClick={(e) => handleRemoveFavorite(e, pet.id)}
                    >
                      <Heart className="w-5 h-5" fill="currentColor" />
                    </button>
                    {pet.badge && (
                      <div className="absolute bottom-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        {pet.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-on-surface font-headline">{pet.name}</h3>
                      <span className="text-secondary font-semibold text-sm">{pet.age}</span>
                    </div>
                    <p className="text-on-surface-variant mb-4">
                      {pet.breed} • {pet.distance}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {(pet.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-outline-variant" />
            </div>
            <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">No favorites yet</h3>
            <p className="text-on-surface-variant max-w-sm mb-8">
              Start exploring and tap the heart icon on pets you'd like to save for later.
            </p>
            <button 
              onClick={() => onNavigate('search')}
              className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Pets
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
