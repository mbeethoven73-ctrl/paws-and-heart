import { Home, MapPin, Briefcase } from 'lucide-react';

interface HomeLifestyleStepProps {
  formData: {
    housing_type: string;
    has_yard: string;
    work_hours: string;
  };
  onUpdate: (updates: Partial<HomeLifestyleStepProps['formData']>) => void;
}

export function HomeLifestyleStep({ formData, onUpdate }: HomeLifestyleStepProps) {
  return (
    <>
      <section className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Your Home & Lifestyle
        </h2>
        <p className="text-on-surface-variant text-lg">
          Tell us about the environment where your new pet will live.
        </p>
      </section>

      <div className="space-y-8">
        <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="housing">
              Housing Type
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-on-surface appearance-none"
                id="housing"
                required
                aria-required="true"
                value={formData.housing_type}
                onChange={(e) => onUpdate({ housing_type: e.target.value })}
              >
                <option value="">Select housing type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo / Townhouse</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="yard">
              Do you have a fenced yard?
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-on-surface appearance-none"
                id="yard"
                required
                aria-required="true"
                value={formData.has_yard}
                onChange={(e) => onUpdate({ has_yard: e.target.value })}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes, fully fenced</option>
                <option value="partial">Partially fenced</option>
                <option value="no">No yard</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="hours">
              Daily Work Hours Away From Home
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                id="hours"
                placeholder="e.g., 8 hours"
                type="text"
                required
                aria-required="true"
                value={formData.work_hours}
                onChange={(e) => onUpdate({ work_hours: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
