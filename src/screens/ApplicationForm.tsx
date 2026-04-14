import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { PersonalInfoStep, HomeLifestyleStep, FinalDetailsStep, SuccessStep } from '../components/ApplicationForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { submitApplication } from '../services/applications';
import { useSearchParams } from 'react-router-dom';

interface ApplicationFormProps {
  onNavigate: (screen: string) => void;
}

export default function ApplicationForm({ onNavigate }: ApplicationFormProps) {
  const { user, profile } = useAuth();
  const [searchParams] = useSearchParams();
  const petId = parseInt(searchParams.get('petId') || '1');
  const toast = useToast();
  
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Collect form data from all steps
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    housing_type: '',
    has_yard: '',
    work_hours: '',
    veterinarian: '',
    personal_reference: '',
    certification: false,
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit application
      setIsSubmitting(true);
      setError(null);

      if (!user) {
        setError('You must be logged in to submit an application.');
        setIsSubmitting(false);
        return;
      }

      const { error: submitError } = await submitApplication({
        user_id: user.id,
        pet_id: petId,
        ...formData,
      });

      if (submitError) {
        setError(submitError);
        toast.error(submitError);
        setIsSubmitting(false);
      } else {
        toast.success('Application submitted successfully!');
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      onNavigate('details');
    }
  };

  const stepTitles = [
    "Personal Info",
    "Home & Lifestyle",
    "Final Details"
  ];

  if (isSubmitted) {
    return <SuccessStep onNavigate={onNavigate} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} aria-label="Go back" className="active:scale-95 duration-200 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6 text-primary" aria-hidden="true" />
          </button>
          <h1 className="text-2xl font-black tracking-tight text-primary font-headline">Paws & Hearts</h1>
        </div>
        <button 
          className="w-10 h-10 rounded-full bg-surface-container overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
          onClick={() => onNavigate('profile')}
          aria-label="User Profile"
        >
          <img
            alt=""
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiKC8T0uwfYS40sCJUXRexb9kCEiyE2JAjbD6wLJbzcQ70B-G8hbbjCo7uOHbgvpn9Gs11XOzLvIEcBB2jocrmCMgdPmQ5zgxJKP2K9pjnwKF2KdoB7L_vk8w1o5BTbU75VRMvKYQB_01omw33OPa504B3oT79q2YG6cP5yld-gkVNL3lv1wVOHCDkkD8MFpPtgcNWrKUOLbc_rjzjppY2vgzqzRFD1kzgESknYlheCngjUrcaGYdoyWBmm4tV75fvE5baAywDtAOF"
          />
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline font-bold text-sm uppercase tracking-widest text-primary">Step {step} of 3</span>
            <span className="font-headline font-bold text-sm text-outline">{stepTitles[step - 1]}</span>
          </div>
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-error-container/20 border border-error/30 text-error rounded-lg px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        {step === 1 && <PersonalInfoStep formData={formData} onUpdate={updateFormData} />}
        {step === 2 && <HomeLifestyleStep formData={formData} onUpdate={updateFormData} />}
        {step === 3 && <FinalDetailsStep formData={formData} onUpdate={updateFormData} />}

        <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg p-6 flex justify-center items-center z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-outline-variant/20">
          <div className="max-w-2xl w-full flex items-center justify-between">
            <button 
              onClick={handleBack} 
              className="text-primary font-headline font-bold px-6 py-3 hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-extrabold px-12 py-4 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : step === 3 ? (
                <>
                  Submit Application
                  <Check className="w-5 h-5" aria-hidden="true" />
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
