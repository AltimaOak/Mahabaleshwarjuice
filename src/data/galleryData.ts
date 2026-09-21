export interface CelebrityVisit {
  id: string;
  name: string;
  role?: string;
  outlet: string;
  imageUrl: string;
  caption?: string;
  date?: string;
}

export const CELEBRITY_VISITS: CelebrityVisit[] = [
  {
    id: '1',
    name: 'Subodh Bhave',
    role: 'Actor',
    outlet: 'Vasant Vihar, Thane',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Enjoying fresh strawberry cream at our Vasant Vihar outlet.',
    date: 'Dec 2024',
  },
  {
    id: '2',
    name: 'Siddharth Jadhav',
    role: 'Actor',
    outlet: 'Kolbad, Thane',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    caption: 'Stopped by for Dry Fruit Mastani shake.',
    date: 'Jan 2025',
  },
  {
    id: '3',
    name: 'Priya Bapat',
    role: 'Actress',
    outlet: 'Vasant Vihar, Thane',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    caption: 'Tried our seasonal Sitaphal cream.',
    date: 'Nov 2024',
  },
  {
    id: '4',
    name: 'Amey Wagh',
    role: 'Actor',
    outlet: 'Mulund West',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    caption: 'Visiting our Mulund outlet for fresh fruit cream.',
    date: 'May 2024',
  },
  {
    id: '5',
    name: 'Prarthana Behere',
    role: 'Actress',
    outlet: 'Vasant Vihar, Thane',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Fresh Mulberry Cream treat.',
    date: 'Aug 2024',
  },
  {
    id: '6',
    name: 'Thane Foodie',
    role: 'Food Vlogger',
    outlet: 'Kolbad, Thane',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    caption: 'Special Jumbo Strawberry Cream vlogging visit.',
    date: 'Feb 2025',
  },
];
