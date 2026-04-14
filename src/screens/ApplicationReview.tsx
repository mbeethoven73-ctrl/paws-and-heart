import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Clock, XCircle, FileText, ShieldCheck, HeartPulse, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getLatestApplication } from '../services/applications';
import type { Application, ReviewStep } from '../types';

interface ApplicationReviewProps {
  onNavigate: (screen: string) => void;
}

export default function ApplicationReview({ onNavigate }: ApplicationReviewProps) {
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplication = async () => {
      if (!user) return;
      setIsLoading(true);
      const data = await getLatestApplication(user.id);
      setApplication(data);
      setIsLoading(false);
    };
    loadApplication();
  }, [user]);

  const steps: ReviewStep[] = application?.review_steps || [
    { id: 1, title: 'Review application details', status: 'pending', description: 'The shelter will review your personal information and home lifestyle.' },
    { id: 2, title: 'Clarifying pet condition', status: 'pending', description: 'The shelter is preparing the specific medical and behavioral notes.' },
    { id: 3, title: 'Final application approval', status: 'pending', description: 'Awaiting final sign-off from the shelter director.' },
  ];

  const petName = application?.pet?.name || 'your pet';

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle2 className="w-6 h-6 text-green-600 bg-background rounded-full" />;
    if (status === 'pending') return <Clock className="w-6 h-6 text-orange-500 bg-background rounded-full" />;
    if (status === 'rejected') return <XCircle className="w-6 h-6 text-error bg-background rounded-full" />;
    return null;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Approved</span>;
    if (status === 'pending') return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Pending</span>;
    if (status === 'rejected') return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Rejected</span>;
    return null;
  };

  const getStepContent = (step: ReviewStep) => {
    if (step.id === 1 && application) {
      return (
        <div className="mt-4 bg-surface-container-lowest rounded-xl p-4 space-y-4 border border-outline-variant/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface mb-1">Personal Information</h4>
              <p className="text-sm text-on-surface-variant">{application.full_name}</p>
              <p className="text-sm text-on-surface-variant">{application.email}</p>
              <p className="text-sm text-on-surface-variant">{application.phone}</p>
            </div>
          </div>
          <div className="h-px bg-outline-variant/20 w-full" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface mb-1">Home & Lifestyle</h4>
              <p className="text-sm text-on-surface-variant">{application.housing_type || 'Not specified'} housing</p>
              <p className="text-sm text-on-surface-variant">Yard: {application.has_yard || 'Not specified'}</p>
              <p className="text-sm text-on-surface-variant">Away {application.work_hours || 'N/A'} daily</p>
            </div>
          </div>
        </div>
      );
    }

    if (step.id === 2) {
      return (
        <div className="mt-4 bg-surface-container-lowest rounded-xl p-4 space-y-4 border border-outline-variant/20 opacity-70">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface">Daily Medication Required</h4>
              <p className="text-xs text-on-surface-variant mt-1">{petName} requires a daily joint supplement.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface">High Energy Needs</h4>
              <p className="text-xs text-on-surface-variant mt-1">Needs at least 1 hour of vigorous exercise daily.</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('profile')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-headline font-bold text-lg text-primary">Application Status</h1>
          </div>
        </header>
        <main className="pt-24 pb-32 max-w-2xl mx-auto w-full px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-surface-container-high rounded w-48"></div>
            <div className="h-4 bg-surface-container-high rounded w-full"></div>
            <div className="h-48 bg-surface-container-high rounded-xl"></div>
            <div className="h-48 bg-surface-container-high rounded-xl"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('profile')} className="active:scale-95 duration-200 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary">Application Status</h1>
        </div>
      </header>

      <main className="pt-24 pb-32 max-w-2xl mx-auto w-full px-6">
        <section className="mb-10">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
            Review Progress
          </h2>
          <p className="text-on-surface-variant">
            {application 
              ? `Track the status of your adoption application for ${petName}. No further action is required from you at this time.`
              : 'No applications found. Start your adoption journey by browsing pets!'
            }
          </p>
        </section>

        {application ? (
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative pl-10">
                {/* Timeline line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-outline-variant/30" />
                )}
                
                {/* Timeline dot/icon */}
                <div className="absolute left-0 top-0">
                  {getStatusIcon(step.status)}
                </div>

                <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">{step.title}</h3>
                      <p className="text-sm text-on-surface-variant mt-1">{step.description}</p>
                    </div>
                    <div className="shrink-0">
                      {getStatusBadge(step.status)}
                    </div>
                  </div>
                  {getStepContent(step)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <button 
              onClick={() => onNavigate('search')} 
              className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full"
            >
              Browse Pets
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
