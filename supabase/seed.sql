-- ============================================
-- Paws & Hearts - Seed Data
-- ============================================
-- This seed data matches the hardcoded data currently in the frontend.
-- Run this after schema.sql in the Supabase SQL Editor.

INSERT INTO public.pets (name, species, breed, age, age_category, size, gender, description, shelter_name, shelter_location, distance, image_url, gallery_urls, tags, traits, badge, health_info, volunteer_quote, is_featured) VALUES

-- 1. Cooper - Golden Retriever (Featured, Match of the Day)
(
  'Cooper',
  'dog',
  'Golden Retriever',
  '2 Years',
  'young',
  'large',
  'Male',
  'Cooper is a bundle of joy waiting for his forever home. Found as a stray, he hasn''t let his past dampen his spirits. He is the ultimate adventure companion, always ready for a hike or a game of fetch in the backyard.

He excels in social settings and has shown great patience with younger children. Cooper is looking for an active family who can keep up with his zest for life!',
  'Silver Lake Shelter',
  'Silver Lake Shelter, CA',
  '1.2 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAOEMr9taV9_B5Cg0Sad2rfSUEVRy5VLe82Zeffj5JM-uJAP-aMNE2txDuLV8Qc-uDKRBg-Lns_zERJk50-NnXU44d_Hy1KDmRnBlia4yoorMmwXCvEoeb7oCvqzIkkROmhfz51c_oJDbigeTs9MSBZVhgRyB3DSxba9hBufHeCzuuv_H6KO7Zh_JbaOam2lfWRHm-G4EyN4VBFcppfEx-EqtahdeDzBnoMrKN4xO7B4IZTFxI9gQmtEyH6L-NZ84Kna9161lyQpIB',
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCkRBCJtkgAvYk2UzM8qfKTMKXyLn3E1lKcU3Tlco_3LRjL7Xfsq-UTKiUvWTNbldf67zyYm268nZ_in2REr90SDrBT2YxqT_DZ--_H68bTE0PU4xNgpWoVuzAWBHqW9V8qok4W5XaMJU5Dyqhu6sbuQ3mggUfw8dJAoD7ZwK9txSVqzWZZKAdyQ-F5Iq4FvnbTRIfcxroZLO_7WXKzQmLQkiKGXwotH5fmcDvN3_gUhEfSOD7hZsOnCk_IsuSJ_ITUwZuqEgjFjY__',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDPVp-ta9tPwiMJiVjvJMaPoNU1OnX1VmAsXj2932m9FY_owA81axvtFq_RYSUN-N_ufPhwEBbWTTXmAQy4KDNPea5DU0hc0-V8fuP5P2IjxBRv4JvezmZecCYWuDeNgtxvqXgtL9kJz7MQ7n8TuhpxNIW8mqymSgtTKKsgQy5zYu5iEKKJxo4iL8UuNZvqIrH_wwnAbUHH-R64annVb6sNdVl8MeHLvn9yFnLQRhcukE_x4fOAFzLQv5c-u4FuTazFXrDfE1D8AUJ0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvfVrkscFMc8RyA0vowJldyM3WIUvfpMeYqG0BDAaLxEk54zmdZ2kOLjEqBeF-ewHgib8sliF44mMOYcvyAuLHN2NA4yNsBQquB2DCWFrh6cBvHtqiZ5AVYsrxylMJJvHCr5YbSUatxwYMBzKax522W-WJZMOFunHS5K4Db-UxXzwF1leKUsxmcYJFouKEcVNc5bwYH7qaX5YDpl6QKpbAqxc9HjzMDvZhsMMqi2WmBAkv33gNMT9eDm-C-bOHGqibQ872rH0i7dXE'
  ],
  ARRAY['Energetic', 'Kid Friendly'],
  ARRAY['Playful', 'Loves kids', 'Very energetic'],
  'New Arrival',
  '{"vaccinations": true, "neutered": true, "microchipped": true}',
  '{"text": "Cooper is the heart of our shelter. His tail never stops wagging, and he has this magical way of making every volunteer feel special.", "name": "Sarah, Lead Volunteer", "avatar_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD13DXL66gWLRf-Neoamoe5KZQ5kZ3Z9WJU4uirK0ddW6LFxvXR7lIFZoNLMUGsGvfEz2LRkCy7PdKLek8qudqNmRp9r7qhqFEuPHU7u1lDoGQkmrs46WN10PfDTMWoFEpPZ9nVGw5_kOHqBov31N-CEd4ryLfUFQOfwCChb-T17ep-jl7xnGNy8lW5mk_a-YiCvPjUKnMBdpP-LyW9h36DI0w-wEhRZYPF-cHv1wuCFOH7d3GrvZ_guaIM6zKFk6BPbK-vWeFoCWw1"}',
  true
),

-- 2. Luna - Cat (Featured)
(
  'Luna',
  'cat',
  'Mixed Breed Cat',
  '4 Years',
  'adult',
  'small',
  'Female',
  'Luna is a gentle and affectionate domestic shorthair who loves nothing more than curling up on a warm lap. She is quiet, independent when needed, but always happy to see her human at the end of the day.

Perfect for apartment living, Luna is litter-trained, vaccinated, and gets along well with calm dogs.',
  'Whiskers Haven',
  'Whiskers Haven, CA',
  '2.5 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAzwKDNchne3Mmw6zB7OkNb4JSogWyyA83YbJVT1XaVD7KbWt5J3EIWjHBrQf8L12WpdcahWJZ5_IjRpF0xRaN6ssSBg5k1rbEq2KEyuaO_eJRZ1iwNZwr-QOLysJb8pGVBo-BhWKlZVuxxGSEhJ7IDRmp8JU5ycgYEzXTip1yuCSzatm5NtZYL-4mJX8I3NlWTUGZ1B-NsMFiW6sa1zMeegvAz_pjLBxwa9jJbqyQpSXdr6Uhhmd6JgpgBt7qg6DmRIvHlEJit9DXu',
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCN-8iIxetLRPyRFbq7jMIFKKTn6nKLb8rgWFE3AecAv4thuqK7I6Fg-lgrb9A3DVvPemcVTTDq8J6E9CucXh5I4GPqfc0F_gKCPCI1p2hUj5Q1bhjIkzJL9wmqoVohSkcDUFQs2XDClAqaBcXRmRuDBHbAi5OjbPK3rB5RtwuA_PAPGp6CdJ4T0AOFZbyFwwjGHbKeOeoHKCRxilwezTG2z2LlbvUO42t7Tn3lOUokzXLxH_ofDN2n60nnJ1UVSQZZCiuOeoDluja5'
  ],
  ARRAY['Cuddly', 'Quiet'],
  ARRAY['Gentle', 'Lap cat', 'Independent'],
  NULL,
  '{"vaccinations": true, "neutered": true, "microchipped": true}',
  '{"text": "Luna has this calming presence about her. She''s been a favorite among our volunteers.", "name": "Maria, Shelter Manager", "avatar_url": ""}',
  true
),

-- 3. Buster - Terrier Mix
(
  'Buster',
  'dog',
  'Terrier Mix',
  '6 Months',
  'baby',
  'small',
  'Male',
  'Buster is a young pup full of energy and curiosity. He''s in the middle of his training and is picking up commands quickly. He loves squeaky toys and will play fetch until you get tired!

He''s fully vaccinated and ready for his forever home.',
  'Paw Print Rescue',
  'Paw Print Rescue, CA',
  '0.8 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Okgr3jZ6qccE1TpWjRBryF5viqZLxMr4NdbFhHsA97eQiRPp5CduoHwFzEtRcTOSfJ7OoizYF60dwqIbdI1ulKs2GWcT8l9dKpcE6glDlVMxrVyiHg2ubmVoMw7m02jBfhIsGfvFIkndbcFvU2ka6Ht4bq0Hk5gxFw1NoSvyrdQfIKFT8eKSU0PWKGx69u-GWus36KmCYnLe9FY_3iweyR2VfpiAsXw_waPihWl17BmmWMu8w8vSbcjd6b1l1UIfRgp6904vhOx6',
  ARRAY[]::TEXT[],
  ARRAY['Training', 'Vaccinated'],
  ARRAY['Curious', 'Quick learner', 'Playful'],
  NULL,
  '{"vaccinations": true, "neutered": false, "microchipped": true}',
  NULL,
  false
),

-- 4. Mochi - Holland Lop Rabbit
(
  'Mochi',
  'small_pet',
  'Holland Lop',
  '1 Year',
  'young',
  'small',
  'Female',
  'Mochi is a sweet and social Holland Lop rabbit who loves to be held and petted. She''s bonded with her hutch-mate and would ideally go to a home that can adopt both of them.

Mochi is litter-trained and loves to explore safe indoor spaces.',
  'Little Paws Sanctuary',
  'Little Paws Sanctuary, CA',
  '5.1 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQk8k6H0TWI2wgVGHdgB03LKu6-vCiygFFu7PXC4hNKoR6QtH8BZfEyFtovXU69UNg4oQMUAciFamw6OxJwa1wMB0o-Qc4acG6AFH4WjdgvM9t9vhluyrnLykR0jVbU_rKS_M9VbkcnXm0bsF-e2p3akG8EkWYO-p5usn_KNyDD88Th_rFOxJ5ymVHMieARxJsmSAleNeN8__IzN7rGb4GFizlQSD37aU4j25UkquihbLnhXIx625LLbiAXm_1B0KViSdHcvTsRt5R',
  ARRAY[]::TEXT[],
  ARRAY['Social', 'Bonded'],
  ARRAY['Sweet', 'Social', 'Litter-trained'],
  NULL,
  '{"vaccinations": true, "neutered": true, "microchipped": false}',
  NULL,
  false
),

-- 5. Barnaby - French Bulldog
(
  'Barnaby',
  'dog',
  'French Bulldog',
  '5 Years',
  'adult',
  'small',
  'Male',
  'Barnaby is the definition of a lap dog. This loveable Frenchie is perfect for apartment living and wants nothing more than to be by your side all day long.

He''s calm, well-mannered, and gets along great with other dogs and cats.',
  'City Dogs Rescue',
  'City Dogs Rescue, CA',
  '3.7 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBTZWI5yT36rzBj1IqCkh_wpMeWIuf1DlygR1t4hPuq8UlEPx6lefjuf_SoQsczEuB52CacB-svkduSUxHLamRBRVufM7lx1B15s79HxRUeS_BF1cw_d9cWIx923uWIFZXgZayiMEcYKCA3quDrrXtoQwwlqdiGmKMHtF1Ee9zLO72CZYpoEQuPBhLkcLREPHEjGauh32hmdWU2Qt6Q9f8BeZevii3KfXnyl0Qgv_hAxqyCahQRYbu5o2yNnHcD64rlGV9aBt1LSX5v',
  ARRAY[]::TEXT[],
  ARRAY['Lap Dog', 'Apartment Ready'],
  ARRAY['Calm', 'Well-mannered', 'Friendly'],
  NULL,
  '{"vaccinations": true, "neutered": true, "microchipped": true}',
  NULL,
  false
),

-- 6. Ginger - Tabby Cat
(
  'Ginger',
  'cat',
  'Tabby Cat',
  '3 Years',
  'adult',
  'medium',
  'Female',
  'Ginger is a beautiful tabby with a fiery personality to match her name. She''s independent and loves to bask in the sun by the window. While she can be a bit shy at first, she warms up quickly and becomes an affectionate companion.

She would do best in a calm household without young children.',
  'Feline Friends',
  'Feline Friends, CA',
  '1.9 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBuq9thg8-cbLSDYGgvP4L7VQxpf_kweDL4iRiZAta0WpAj2Qbi5YuwWrJyN895-bmuTx8Vo7p4I3RJD_mW5WipKjeMENSyw2ElVesn0UKAYWxCq2mJo-4YhAkQRt18GJ-uMPjgCmdrgIZQD6ty2M7JhLQy2Xho17Bt7cLJxdZ1CaLfFF4P8qKVR6q5ETUqsenhu5CaoR2x217_HpAwqzehI7chaXhlnfuniaJ1yXXR0kfXgF5A4qMKZqtKYKAShc6Pr3iubtazyMW1',
  ARRAY[]::TEXT[],
  ARRAY['Independent', 'Loves Sunsets'],
  ARRAY['Independent', 'Affectionate', 'Sun-lover'],
  NULL,
  '{"vaccinations": true, "neutered": true, "microchipped": true}',
  NULL,
  false
),

-- 7. Peanut - Hamster (Featured)
(
  'Peanut',
  'small_pet',
  'Syrian Hamster',
  '6 Months',
  'baby',
  'small',
  'Male',
  'Peanut is an adorable Syrian hamster who is nocturnal and loves running on his wheel at night. He''s easy to care for and makes a great first pet for older children or busy adults.

Peanut enjoys being hand-fed treats and will stuff his cheeks with sunflower seeds!',
  'Small Pals Adoption',
  'Small Pals Adoption, CA',
  '4.2 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD3_KrsFEiqebeoK6-xwLtQokfCghJVtqOvaEGhp_7hnNEPug-aQET3IjAqXkAygxDdrasKiPuyWwaDfMi5tSq190DMhORG5WBuztkwFVVc6Xfpp3ZhYVdoGfU88HZ272umkiSUKpzLFQzcg5QLvw1w6vbpzxbZTd72ceTWWu0OFMQWCNswUL7xHOR9tyYWoE6sLCA4dfSJm2nAu3HC0FbYHpmqDhGr2h6LufrhnTqIsxkcRnkD-uEXuA2viKmJa8lpwuEfuZeuzAtY',
  ARRAY[]::TEXT[],
  ARRAY['Easy Care', 'Nocturnal'],
  ARRAY['Adorable', 'Low maintenance', 'Friendly'],
  NULL,
  '{"vaccinations": false, "neutered": false, "microchipped": false}',
  NULL,
  true
),

-- 8. Oliver - Beagle Mix
(
  'Oliver',
  'dog',
  'Beagle Mix',
  '3 Years',
  'adult',
  'medium',
  'Male',
  'Oliver is a friendly beagle mix with an incredible nose and a love for outdoor adventures. He''s great on a leash and loves meeting new people and dogs.

Oliver has been fully trained and is ready to join an active family.',
  'Happy Tails Shelter',
  'Happy Tails Shelter, CA',
  '2.1 miles away',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCd5F0ZmkhBaSu9nsAnIpQp4JwklquFzobLkJDWvqqAc9cypeRG4sWiisONc_xBCCbrq3M2T_shVGPSkmAbp8bripmJwaRMjaodlF4IQSj0YYpiHYoP0F1htxIOBw1SIlptbQtRj5sp3HcvRuGP0rxvpra40vNQyRKV9tb117Mj22_wnFhfDWZLvorV2Oq7zmwdif1qJl5L2XbFrTEOLVwQf7ZsuWEfpCiKI96d-kBezpxYNrB6CZvbg3fB772ea2LXKi5hdWWe1OV-',
  ARRAY[]::TEXT[],
  ARRAY['Adventurous', 'Friendly'],
  ARRAY['Friendly', 'Trained', 'Active'],
  NULL,
  '{"vaccinations": true, "neutered": true, "microchipped": true}',
  NULL,
  false
);
