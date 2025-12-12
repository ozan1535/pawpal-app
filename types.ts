
export enum UserMode {
  OWNER = 'OWNER',
  WALKER = 'WALKER'
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  difficulty: string; // Changed from literal to string to support Turkish
  completed: boolean;
  icon: string;
  color: string;
}

export interface LessonStep {
  order: number;
  text: string;
  duration?: string;
}

export interface LessonDetail extends TrainingModule {
  description: string;
  steps: LessonStep[];
  videoPlaceholder: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photoUrl: string;
  nextVaccine: string;
  nextVaccineDate: string;
}

export interface PetDraft {
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  gender: 'male' | 'female';
  birthday: string;
  weight: string;
  weightUnit: 'kg' | 'lbs';
  isNeutered: boolean;
  photoUrl: string | null;
  // New fields for Onboarding Update
  ownerName?: string;
  ownerRole?: string;
  estimatedAge?: {
    years: number;
    months: number;
  };
}

export interface HealthRecord {
  id?: string;
  date: string;
  type: string;
  details: string;
  vetName: string;
  status: string; // Changed to string
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  isThinking?: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  description: string;
  isJoined?: boolean;
}

export interface VetClinic {
  id: string;
  name: string;
  distance: string;
  isOpen24Hours: boolean;
  rating: number;
  address: string;
  phone: string;
}

export interface LostPet {
  id: string;
  name: string;
  breed: string;
  distance: string;
  imageUrl: string;
  lastSeen: string;
  ownerContact: string;
  // New fields for Lost & Found Upgrade
  status: 'ACTIVE' | 'FOUND' | 'ARCHIVED';
  ownerId: string;
  details: {
    collar: string;
    reward?: string;
    description: string;
    microchip: boolean;
  };
  sightings: {
    id: string;
    lat: number;
    long: number;
    photoUrl?: string;
    timestamp: string;
    reporterName: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  memberSince: string;
  level: number;
  levelTitle: string;
  photoUrl: string;
  isPremium: boolean;
}