import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MapPin, Baby, Users, Zap, Syringe, Scissors, ShieldCheck, MessageCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPetById } from '../services/pets';
import { addFavorite, removeFavorite, isFavorited } from '../services/favorites';
import type { Pet } from '../types';

interface PetDetailsProps {
  onNavigate: (screen: string) => void;
}

export default function PetDetails({ onNavigate }: PetDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pet, setPet] = useState<Pet | null>(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      setIsLoading(true);
      const petId = parseInt(id || '1');
      const data = await getPetById(petId);
      setPet(data);

      if (user && data) {
        const fav = await isFavorited(user.id, data.id);
        setIsFav(fav);
      }

      setIsLoading(false);
    };
    loadPet();
  }, [id, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    if (!pet) return;

    if (isFav) {
      await removeFavorite(user.id, pet.id);
      setIsFav(false);
    } else {
      await addFavorite(user.id, pet.id);
      setIsFav(true);
    }
  };

  const healthInfo = pet?.health_info || { vaccinations: true, neutered: true, microchipped: true };
  const volunteerQuote = pet?.volunteer_quote;

  // Trait icons mapping
  const traitIcons: Record<string, React.ReactNode> = {
    'Playful': <Baby className="w-5 h-5" />,
    'Loves kids': <Users className="w-5 h-5" />,
    'Very energetic': <Zap className="w-5 h-5" />,
    'Gentle': <Baby className="w-5 h-5" />,
    'Calm': <Baby className="w-5 h-5" />,
    'Friendly': <Users className="w-5 h-5" />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('search')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Paws & Hearts</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleToggleFavorite} className={`active:scale-95 duration-200 hover:opacity-80 transition-opacity ${isFav ? 'text-error' : 'text-primary'}`}>
            <Heart className="w-6 h-6" fill={isFav ? 'currentColor' : 'none'} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container cursor-pointer" onClick={() => onNavigate('profile')}>
            <img
              className="w-full h-full object-cover"
              alt="User"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpis2Kc_XYpoWTu9-LLwWvywjvvrqSB3WmpjBnvhO-xr29i0lgNyNZdinu0VFlp5zg3_FFfqQT4zPiV_A9MLQXBlGSlwlKUlzcGDSPTywIxVR6mNCfWux7Hw4rXBJpaX2v2BjgcDFSxYkZC7-DdnLJqAZ0GMOqL3z3G3Zo_DLQYqCGc9m0bctw7zrEW0CahEqStIYEUYWF2vN0fKjG6H8wFIjbF4_Ay_6WnvmvEblv-hK_XdGLZjtbrbJ5Mz8kVxc8gzq7nqtd-1sV"
            />
          </div>
        </div>
      </header>

      <main className="pt-16 pb-32 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <div className="animate-pulse">
            <section className="px-6 py-6 grid grid-cols-12 gap-4 h-[450px]">
              <div className="col-span-8 h-full rounded-xl bg-surface-container-high border border-outline-variant/20"></div>
              <div className="col-span-4 flex flex-col gap-4 h-full">
                <div className="h-1/2 rounded-xl bg-surface-container-high border border-outline-variant/20"></div>
                <div className="h-1/2 rounded-xl bg-surface-container-high border border-outline-variant/20"></div>
              </div>
            </section>

            <div className="px-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="h-10 bg-surface-container-high rounded w-48"></div>
                  <div className="h-4 bg-surface-container-high rounded w-32"></div>
                </div>
                <div className="w-16 h-16 bg-surface-container-high rounded-lg"></div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <div className="h-8 bg-surface-container-high rounded-full w-24"></div>
                <div className="h-8 bg-surface-container-high rounded-full w-24"></div>
                <div className="h-8 bg-surface-container-high rounded-full w-32"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48 bg-surface-container-high rounded-xl border border-outline-variant/20"></div>
                <div className="h-48 bg-surface-container-high rounded-xl border border-outline-variant/20"></div>
              </div>
            </div>
          </div>
        ) : pet ? (
          <>
            <section className="px-6 py-6 grid grid-cols-12 gap-4 h-[450px]">
              <div className="col-span-8 h-full rounded-xl overflow-hidden relative group">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={pet.name}
                  src={pet.image_url}
                />
                {pet.badge && (
                  <div className="absolute bottom-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary tracking-wider uppercase">
                    Hero Choice
                  </div>
                )}
              </div>
              <div className="col-span-4 flex flex-col gap-4 h-full">
                {(pet.gallery_urls || []).slice(0, 2).map((url, idx) => (
                  <div key={idx} className={`h-1/2 rounded-xl overflow-hidden ${idx === 1 ? 'relative' : ''}`}>
                    <img
                      className="w-full h-full object-cover"
                      alt={`${pet.name} photo ${idx + 2}`}
                      src={url}
                    />
                    {idx === 1 && (pet.gallery_urls || []).length > 2 && (
                      <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center">
                        <span className="text-white font-headline font-bold text-xl">+{(pet.gallery_urls || []).length - 2}</span>
                      </div>
                    )}
                  </div>
                ))}
                {(!pet.gallery_urls || pet.gallery_urls.length === 0) && (
                  <>
                    <div className="h-1/2 rounded-xl overflow-hidden bg-surface-container-high"></div>
                    <div className="h-1/2 rounded-xl overflow-hidden bg-surface-container-high"></div>
                  </>
                )}
              </div>
            </section>

            <div className="px-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-1">{pet.name}</h2>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{pet.shelter_location}</span>
                  </div>
                </div>
                <div className="bg-secondary-fixed text-on-secondary-fixed px-4 py-2 rounded-lg flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">Age</span>
                  <span className="text-xl font-headline font-black">{pet.age}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {(pet.traits || []).map((trait) => (
                  <div key={trait} className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    {traitIcons[trait] || <Zap className="w-5 h-5" />}
                    {trait}
                  </div>
                ))}
                <div className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full text-sm font-semibold">
                  {pet.breed}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-4">
                  <h3 className="font-headline font-bold text-xl text-on-surface">About {pet.name}</h3>
                  {(pet.description || '').split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-on-surface-variant leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm flex flex-col gap-6">
                  <h3 className="font-headline font-bold text-xl text-on-surface">Health & Safety</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary">
                          <Syringe className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Vaccinations</p>
                          <p className="text-xs text-on-surface-variant">{healthInfo.vaccinations ? 'Up to date' : 'Not yet'}</p>
                        </div>
                      </div>
                      {healthInfo.vaccinations && <ShieldCheck className="w-6 h-6 text-primary" fill="currentColor" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary">
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Neutered</p>
                          <p className="text-xs text-on-surface-variant">{healthInfo.neutered ? 'Completed' : 'Not yet'}</p>
                        </div>
                      </div>
                      {healthInfo.neutered && <ShieldCheck className="w-6 h-6 text-primary" fill="currentColor" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Microchipped</p>
                          <p className="text-xs text-on-surface-variant">{healthInfo.microchipped ? 'Registered' : 'Not yet'}</p>
                        </div>
                      </div>
                      {healthInfo.microchipped && <ShieldCheck className="w-6 h-6 text-primary" fill="currentColor" />}
                    </div>
                  </div>
                </div>

                {volunteerQuote && (
                  <div className="md:col-span-2 mt-2 relative rounded-xl overflow-hidden p-8 bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shrink-0">
                        {volunteerQuote.avatar_url ? (
                          <img
                            className="w-full h-full object-cover"
                            alt={volunteerQuote.name}
                            src={volunteerQuote.avatar_url}
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-container flex items-center justify-center text-on-primary-container text-sm font-bold">
                            {volunteerQuote.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="italic text-on-surface-variant mb-2">
                          "{volunteerQuote.text}"
                        </p>
                        <p className="font-bold text-primary text-sm">— {volunteerQuote.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">Pet not found</h3>
            <p className="text-on-surface-variant mb-6">This pet may have been adopted already!</p>
            <button onClick={() => onNavigate('search')} className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full">
              Browse Other Pets
            </button>
          </div>
        )}
      </main>

      {pet && (
        <div className="fixed bottom-0 left-0 w-full p-6 bg-surface/90 backdrop-blur-lg z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-outline-variant/20">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => {
                if (!user) {
                  onNavigate('login');
                } else {
                  navigate(`/application?petId=${pet.id}`);
                }
              }}
              className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all duration-200"
            >
              Adopt {pet.name}
            </button>
            <button className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-primary active:scale-95 transition-all">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
