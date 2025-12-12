
import { Pet, HealthRecord, TrainingModule, LessonDetail, CommunityEvent, VetClinic, LostPet, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Selin Yılmaz',
  memberSince: '2022',
  level: 3,
  levelTitle: 'Süper Ebeveyn',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  isPremium: false
};

export const MY_PETS: Pet[] = [
  {
    id: 'p1',
    name: 'Barnaby',
    breed: 'Golden Retriever',
    age: 3,
    weight: 32,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    nextVaccine: 'İç Parazit Hapı',
    nextVaccineDate: 'Yarın'
  },
  {
    id: 'p2',
    name: 'Mia',
    breed: 'Scottish Fold',
    age: 1,
    weight: 4.2,
    photoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    nextVaccine: 'Karma Aşı',
    nextVaccineDate: '15 gün sonra'
  }
];

export const CURRENT_PET: Pet = MY_PETS[0];

export const DOG_BREEDS = [
  'Golden Retriever', 'Labrador', 'Poodle', 'French Bulldog', 'Beagle',
  'German Shepherd', 'Pug', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Husky'
];

export const CAT_BREEDS = [
  'Tekir', 'British Shorthair', 'Scottish Fold', 'Persian', 'Maine Coon',
  'Siamese', 'Sphynx', 'Ragdoll', 'Bengal'
];

export const TRAINING_MODULES: TrainingModule[] = [
  { id: 't1', title: 'Otur & Bekle', duration: '5 dk', difficulty: 'Kolay', completed: true, icon: '🦮', color: 'bg-green-100 text-green-600' },
  { id: 't2', title: 'Çak Bir Beşlik', duration: '10 dk', difficulty: 'Orta', completed: false, icon: '✋', color: 'bg-blue-100 text-blue-600' },
  { id: 't3', title: 'Tasmalı Yürüyüş', duration: '15 dk', difficulty: 'Zor', completed: false, icon: '🐕', color: 'bg-orange-100 text-orange-600' },
  { id: 't4', title: 'Gel Komutu', duration: '8 dk', difficulty: 'Orta', completed: false, icon: '📢', color: 'bg-purple-100 text-purple-600' },
  { id: 't5', title: 'Kafes Eğitimi', duration: '20 dk', difficulty: 'Kolay', completed: false, icon: '🏠', color: 'bg-pink-100 text-pink-600' },
];

export const LESSON_DETAILS: Record<string, LessonDetail> = {
  't1': {
    ...TRAINING_MODULES[0],
    description: "Her köpek için en temel komut. Sabrı ve dürtü kontrolünü öğretir.",
    videoPlaceholder: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    steps: [
      { order: 1, text: "Ödül mamasını köpeğinizin burnuna yakın tutun.", duration: "30sn" },
      { order: 2, text: "Elinizi yukarı kaldırın, başıyla takip etmesini ve kalçasının yere değmesini sağlayın.", duration: "1 dk" },
      { order: 3, text: "Oturma pozisyonuna geçince 'Otur' deyin ve ödülü verin.", duration: "1 dk" },
      { order: 4, text: "Bu seriyi her gün birkaç kez tekrarlayın.", duration: "sürekli" }
    ]
  },
  't2': {
    ...TRAINING_MODULES[1],
    description: "Sizinle evcil hayvanınız arasında bağ kuran eğlenceli bir numara.",
    videoPlaceholder: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80",
    steps: [
      { order: 1, text: "Köpeğinize otur komutu verin.", duration: "10sn" },
      { order: 2, text: "Kapalı avucunuzda bir ödül tutun.", duration: "30sn" },
      { order: 3, text: "Elinize pati atmasını bekleyin.", duration: "değişken" },
      { order: 4, text: "'Çak bir beşlik' deyin ve hemen ödüllendirin.", duration: "tekrar" }
    ]
  },
  'default': {
    id: 'tx', title: 'Genel Ders', duration: '10dk', difficulty: 'Kolay', completed: false, icon: '🎓', color: 'bg-gray-100',
    description: "Bu numarayı öğrenmek için aşağıdaki adımları izleyin.",
    videoPlaceholder: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    steps: [
      { order: 1, text: "Sessiz bir ortam hazırlayın.", duration: "1 dk" },
      { order: 2, text: "Lezzetli ödüller hazır bulundurun.", duration: "1 dk" },
      { order: 3, text: "Kısa seanslarla pratik yapın.", duration: "5 dk" }
    ]
  }
};

export const HEALTH_HISTORY: HealthRecord[] = [
  { id: 'h1', date: '15 Eki', type: 'Aşı', details: 'Kuduz Aşısı', vetName: 'Dr. Yılmaz', status: 'Tamamlandı' },
  { id: 'h2', date: '20 Ağu', type: 'Muayene', details: 'Yıllık Kontrol', vetName: 'Dr. Yılmaz', status: 'Tamamlandı' },
  { id: 'h3', date: '10 May', type: 'İlaç', details: 'Pire & Kene', vetName: 'PatiPet', status: 'Tamamlandı' },
];

export const WEIGHT_DATA = [
  { name: 'Oca', weight: 28 },
  { name: 'Şub', weight: 28.5 },
  { name: 'Mar', weight: 29 },
  { name: 'Nis', weight: 29.2 },
  { name: 'May', weight: 30 },
  { name: 'Haz', weight: 30.5 },
  { name: 'Tem', weight: 31 },
  { name: 'Ağu', weight: 31.2 },
  { name: 'Eyl', weight: 31.5 },
  { name: 'Eki', weight: 31.8 },
  { name: 'Kas', weight: 32 },
];

export const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'Golden Retriever Buluşması',
    date: 'Pazar, 24 Eki',
    time: '10:00',
    location: 'Maçka Parkı, İstanbul',
    attendees: 24,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    description: "Tüm Golden Retriever'lar ve sahipleri için eğlenceli bir buluşma! Atıştırmalıklar bizden.",
    isJoined: false
  },
  {
    id: 'e2',
    title: 'Yavru Köpek Sosyalleşmesi',
    date: 'Cumartesi, 23 Eki',
    time: '14:00',
    location: 'Şehir Vet Bahçesi',
    attendees: 8,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    description: "6 aydan küçük yavruların sosyal beceriler kazanması için güvenli ortam.",
    isJoined: true
  }
];

export const MOCK_WALKERS = [
  {
    id: 'w1',
    name: 'Selin Yılmaz',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    price: '₺250/sa',
    rating: 4.9,
    reviewsCount: 124,
    distance: '0.8km',
    bio: '5 yıllık deneyime sahip sertifikalı köpek eğitmeni. Enerjik köpekleri ve park yürüyüşlerini severim!',
    availability: 'Pzt - Cum',
    whatsappNumber: '15550109999'
  },
  {
    id: 'w2',
    name: 'Mert Demir',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    isVerified: false,
    price: '₺180/sa',
    rating: 4.7,
    reviewsCount: 45,
    distance: '2.1km',
    bio: 'Öğrenci ve hayvan sever. Sabah yürüyüşleri ve hafta sonları uygun.',
    availability: 'Hafta Sonu',
    whatsappNumber: '15550108888'
  },
  {
    id: 'w3',
    name: 'Ceren Kaya',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    price: '₺200/sa',
    rating: 4.8,
    reviewsCount: 82,
    distance: '1.2km',
    bio: 'Büyük ırklar konusunda deneyimli. Esnek çalışma saatleri.',
    availability: 'Her Gün',
    whatsappNumber: '15550107777'
  }
];

export const MOCK_NEEDS = [
  {
    id: 'n1',
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80',
    petName: 'Max',
    offerPrice: '₺200',
    petBreed: 'Beagle',
    location: 'Maçka Parkı Çevresi',
    timeNeeded: 'Bugün, 14:00'
  },
  {
    id: 'n2',
    photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80',
    petName: 'Luna',
    offerPrice: '₺250',
    petBreed: 'French Bulldog',
    location: 'Nişantaşı',
    timeNeeded: 'Yarın, 09:00'
  },
  {
    id: 'n3',
    photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=200&q=80',
    petName: 'Rocky',
    offerPrice: '₺300',
    petBreed: 'Alman Kurdu',
    location: 'Moda Sahil',
    timeNeeded: 'Cmt, 10:00'
  }
];

export const EMERGENCY_VETS: VetClinic[] = [
  { id: 'v1', name: '7/24 Şehir Hayvan Hastanesi', distance: '1.2km', isOpen24Hours: true, rating: 4.9, address: 'Bağdat Caddesi No:12', phone: '555-0199' },
  { id: 'v2', name: 'PatiAcil Veteriner', distance: '3.5km', isOpen24Hours: true, rating: 4.7, address: 'Moda Caddesi No:45', phone: '555-0200' },
  { id: 'v3', name: 'Kuzey Veteriner Kliniği', distance: '4.8km', isOpen24Hours: false, rating: 4.5, address: 'Ulus Yolu No:88', phone: '555-0300' }
];

export const NEARBY_LOST_PETS: LostPet[] = [
  {
    id: 'lp1',
    name: 'Pamuk',
    breed: 'Poodle',
    distance: '0.5km',
    lastSeen: 'Bebek Parkı',
    ownerContact: '555-9999',
    imageUrl: '/pamuk.png',
    status: 'ACTIVE',
    ownerId: 'u2',
    details: {
      collar: 'Kırmızı Tasma',
      description: 'Çok ürkek, lütfen yaklaşırken dikkatli olun. İsmiyle seslenince bakıyor.',
      microchip: true,
      reward: '₺1000'
    },
    sightings: []
  },
  {
    id: 'lp2',
    name: 'Rocky',
    breed: 'Boxer',
    distance: '1.8km',
    lastSeen: 'Beşiktaş Çarşı',
    ownerContact: '555-8888',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE',
    ownerId: 'u1', // Current User's Pet
    details: {
      collar: 'Mavi Tasma',
      description: 'Oyun oynamayı sever, zararsızdır. Sol patisinde beyazlık var.',
      microchip: true
    },
    sightings: [
      { id: 's1', lat: 41.0, long: 29.0, timestamp: '10 dk önce', reporterName: 'Ahmet K.' }
    ]
  },
  {
    id: 'lp3',
    name: 'Duman',
    breed: 'Tekir Kedi',
    distance: '2.3km',
    lastSeen: 'Lise Caddesi',
    ownerContact: '555-7777',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    status: 'FOUND',
    ownerId: 'u3',
    details: {
      collar: 'Yok',
      description: 'Tasması yoktu, çok açtı.',
      microchip: false
    },
    sightings: []
  },
];