import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SuccessStepProps {
  onNavigate: (screen: string) => void;
}

export function SuccessStep({ onNavigate }: SuccessStepProps) {
  return (
    <div className="flex flex-col min-h-screen bg-surface items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          bounce: 0.5
        }}
        className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary/20"
      >
        <Check className="w-12 h-12" strokeWidth={3} />
      </motion.div>
      
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4"
      >
        Application Received!
      </motion.h2>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-on-surface-variant text-lg mb-10 max-w-sm"
      >
        We're reviewing your application. Keep an eye on your profile for updates!
      </motion.p>
      
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => onNavigate('profile')}
        className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-extrabold px-12 py-4 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all w-full max-w-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        View Application Status
      </motion.button>
    </div>
  );
}
