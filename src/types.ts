export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  age_category: string;
  size: string;
  gender: string;
  description: string;
  shelter_name: string;
  shelter_location: string;
  distance: string;
  image_url: string;
  gallery_urls: string[];
  tags: string[];
  traits: string[];
  badge: string | null;
  health_info: {
    vaccinations: boolean;
    neutered: boolean;
    microchipped: boolean;
  };
  volunteer_quote: {
    text: string;
    name: string;
    avatar_url: string;
  } | null;
  is_featured: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
  city: string;
  state: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  pet_id: number;
  created_at: string;
  pet?: Pet;
}

export interface Application {
  id: string;
  user_id: string;
  pet_id: number;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  full_name: string;
  email: string;
  phone: string;
  address: string;
  housing_type: string;
  has_yard: string;
  work_hours: string;
  veterinarian: string;
  personal_reference: string;
  certification: boolean;
  review_steps: ReviewStep[];
  created_at: string;
  updated_at: string;
  pet?: Pet;
}

export interface ReviewStep {
  id: number;
  title: string;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
}
