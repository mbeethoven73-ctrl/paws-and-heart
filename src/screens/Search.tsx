import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Search as SearchIcon, SlidersHorizontal, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getPets } from '../services/pets';
import { addFavorite, removeFavorite, getFavoriteIds } from '../services/favorites';
import { DEFAULT_AVATAR, SEARCH_FILTERS, PET_CATEGORIES } from '../constants/settings';
import type { Pet } from '../types';

interface SearchProps {
  onNavigate: (screen: string) => void;
}

export default function Search({ onNavigate }: SearchProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: 'Dogs',
    age: 'Any',
    size: 'Any',
    distance: SEARCH_FILTERS.DEFAULT_DISTANCE
  });

  const loadPets = useCallback(async () => {
    setIsLoading(true);
    const data = await getPets({
      species: activeFilters.type,
      age_category: activeFilters.age,
      size: activeFilters.size,
      search: searchQuery || undefined,
    });
    setPets(data);
    setIsLoading(false);
  }, [activeFilters.type, activeFilters.age, activeFilters.size, searchQuery]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favIds = await getFavoriteIds(user.id);
        setFavoriteIds(favIds);
      }
    };
    loadFavorites();
  }, [user]);

  const handleToggleFavorite = async (e: React.MouseEvent, petId: number) => {
    e.stopPropagation();
    if (!user) {
      onNavigate('login');
      return;
    }

    if (favoriteIds.has(petId)) {
      try {
        await removeFavorite(user.id, petId);
        setFavoriteIds(prev => {
          const next = new Set(prev);
          next.delete(petId);
          return next;
        });
        toast.info('Removed from favorites');
      } catch (err) {
        toast.error('Failed to remove from favorites');
      }
    } else {
      try {
        await addFavorite(user.id, petId);
        setFavoriteIds(prev => new Set(prev).add(petId));
        toast.success('Added to favorites!');
      } catch (err) {
        toast.error('Failed to add to favorites');
      }
    }
  };

  const handleApplyFilters = () => {
    setIsFiltersOpen(false);
    loadPets();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadPets();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('home')} className="active:scale-95 duration-200 transition-opacity hover:opacity-80">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Paws & Hearts</h1>
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

      <main className="pt-20 pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <section className="mb-8">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
                Find your new best friend
              </h2>
              <p className="text-on-surface-variant max-w-md">
                Browse lovable companions waiting for a forever home near you.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/60 shadow-sm"
                  placeholder="Search breeds or personality..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                aria-label="Filters"
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors shadow-sm border border-outline/10 ${isFiltersOpen ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary hover:bg-primary/10'}`}
              >
                {isFiltersOpen ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
              </button>
            </div>

            <AnimatePresence>
              {isFiltersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-surface-container-low rounded-2xl p-6 space-y-6 border border-outline-variant/20">
                    {/* Pet Type */}
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-3">Pet Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {SEARCH_FILTERS.TYPES.map(type => (
                          <button 
                            key={type} 
                            onClick={() => setActiveFilters({...activeFilters, type})}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilters.type === type ? 'bg-secondary-container text-on-secondary-container border-secondary-container' : 'border-outline/20 hover:bg-surface-container-high text-on-surface-variant'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Age Range */}
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-3">Age Range</h4>
                      <div className="flex flex-wrap gap-2">
                        {SEARCH_FILTERS.AGES.map(age => (
                          <button 
                            key={age} 
                            onClick={() => setActiveFilters({...activeFilters, age})}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilters.age === age ? 'bg-secondary-container text-on-secondary-container border-secondary-container' : 'border-outline/20 hover:bg-surface-container-high text-on-surface-variant'}`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <h4 className="text-sm font-bold text-on-surface mb-3">Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {SEARCH_FILTERS.SIZES.map(size => (
                          <button 
                            key={size} 
                            onClick={() => setActiveFilters({...activeFilters, size})}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilters.size === size ? 'bg-secondary-container text-on-secondary-container border-secondary-container' : 'border-outline/20 hover:bg-surface-container-high text-on-surface-variant'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Distance */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold text-on-surface">Distance</h4>
                        <span className="text-sm text-primary font-bold">Within {activeFilters.distance} miles</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="100" 
                        step="5"
                        value={activeFilters.distance}
                        onChange={(e) => setActiveFilters({...activeFilters, distance: parseInt(e.target.value)})}
                        className="w-full accent-primary" 
                      />
                      <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                        <span>5 mi</span>
                        <span>100+ mi</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t border-outline-variant/20">
                      <button 
                        onClick={() => setActiveFilters({ type: 'Any', age: 'Any', size: 'Any', distance: SEARCH_FILTERS.DEFAULT_DISTANCE })}
                        className="flex-1 py-3 text-on-surface font-bold hover:bg-surface-container rounded-full transition-colors"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={handleApplyFilters}
                        className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isFiltersOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2 overflow-x-auto pb-2" 
                  style={{ scrollbarWidth: 'none' }}
                >
                  {SEARCH_FILTERS.TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveFilters({...activeFilters, type})}
                      className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                        activeFilters.type === type
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
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
            ))
          ) : pets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                <SearchIcon className="w-10 h-10 text-outline-variant" />
              </div>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">No pets found</h3>
              <p className="text-on-surface-variant max-w-sm">
                Try adjusting your filters or search query to find more pets.
              </p>
            </div>
          ) : (
            pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => navigate(`/${pet.id}/petDetails`)}
                className="group relative bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={pet.image_url}
                  />
                  <button 
                    onClick={(e) => handleToggleFavorite(e, pet.id)}
                    className={`absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded-full transition-colors ${favoriteIds.has(pet.id) ? 'text-error' : 'text-primary hover:text-error'}`}
                  >
                    <Heart className="w-5 h-5" fill={favoriteIds.has(pet.id) ? 'currentColor' : 'none'} />
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
