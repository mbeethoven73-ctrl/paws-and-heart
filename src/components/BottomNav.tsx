import { Home, Search, Heart, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-safe bg-surface/90 backdrop-blur-lg rounded-t-[2rem] z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-outline-variant/20">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = currentScreen === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all active:scale-90 duration-200 ${
              isActive
                ? 'bg-primary-container/10 text-primary'
                : 'text-outline hover:text-primary'
            }`}
          >
            <Icon className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} />
            <span className="font-headline text-[11px] font-semibold tracking-wide uppercase mt-1">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
