import { User, Mail, Phone, MapPin, ShieldAlert } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
  };
  onUpdate: (updates: Partial<PersonalInfoStepProps['formData']>) => void;
}

export function PersonalInfoStep({ formData, onUpdate }: PersonalInfoStepProps) {
  return (
    <>
      <section className="mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Let's get to know you.
        </h2>
        <p className="text-on-surface-variant text-lg">
          We want to ensure every pet finds their perfect human match. Start by sharing your basic details.
        </p>
      </section>

      <div className="space-y-8">
        <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="full_name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                id="full_name"
                placeholder="Enter your full legal name"
                type="text"
                required
                aria-required="true"
                value={formData.full_name}
                onChange={(e) => onUpdate({ full_name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" aria-hidden="true" />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                  id="phone"
                  placeholder="(555) 000-0000"
                  type="tel"
                  required
                  aria-required="true"
                  value={formData.phone}
                  onChange={(e) => onUpdate({ phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-headline font-semibold text-sm text-on-surface ml-1" htmlFor="address">
              Home Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-outline w-5 h-5" aria-hidden="true" />
              <textarea
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant resize-none"
                id="address"
                placeholder="Street, City, State, ZIP code"
                rows={3}
                required
                aria-required="true"
                value={formData.address}
                onChange={(e) => onUpdate({ address: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-secondary-container/10 border border-secondary-container/20 rounded-lg p-6 flex items-start gap-4">
          <ShieldAlert className="text-secondary w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-headline font-bold text-secondary text-sm mb-1">Your Privacy Matters</h4>
            <p className="text-on-secondary-fixed-variant text-sm leading-relaxed">
              We use this information solely for the adoption process. Your data is encrypted and only shared with our certified shelter partners.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
