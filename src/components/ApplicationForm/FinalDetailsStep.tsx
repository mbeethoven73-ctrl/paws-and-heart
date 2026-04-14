import { Stethoscope, User, Check } from 'lucide-react';

interface FinalDetailsStepProps {
  formData: {
    veterinarian: string;
    personal_reference: string;
    certification: boolean;
  };
  onUpdate: (updates: Partial<FinalDetailsStepProps['formData']>) => void;
}

export function FinalDetailsStep({ formData, onUpdate }: FinalDetailsStepProps) {
  return (
    <>
      <section className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Final Details
        </h2>
        <p className="text-on-surface-variant text-lg">
          Almost there! Just a few final checks before we review your application.
        </p>
      </section>

      <div className="space-y-8">
        <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="vet">
              Current Veterinarian (Optional)
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                id="vet"
                placeholder="Clinic name or doctor's name"
                type="text"
                value={formData.veterinarian}
                onChange={(e) => onUpdate({ veterinarian: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="reference">
              Personal Reference
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                id="reference"
                placeholder="Name and phone number"
                type="text"
                required
                aria-required="true"
                value={formData.personal_reference}
                onChange={(e) => onUpdate({ personal_reference: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4">
            <label className="flex items-start gap-3 cursor-pointer group" htmlFor="certify">
              <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 rounded-lg border-2 border-outline group-hover:border-primary transition-colors">
                <input 
                  type="checkbox" 
                  id="certify" 
                  className="peer sr-only" 
                  required 
                  aria-required="true"
                  checked={formData.certification}
                  onChange={(e) => onUpdate({ certification: e.target.checked })}
                />
                <Check className={`w-4 h-4 text-primary transition-opacity absolute ${formData.certification ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              </div>
              <span className="text-sm text-on-surface-variant leading-relaxed">
                I certify that the information provided is true and correct. I understand that submitting this application does not guarantee adoption.
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
