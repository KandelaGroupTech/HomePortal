import { Guest, LocalEvent, WifiConfig } from './types';

export const DEFAULT_GUEST: Guest = {
  name: "Ramona",
  checkInDate: new Date().toLocaleDateString(),
  checkOutDate: new Date(Date.now() + 86400000 * 3).toLocaleDateString(), // +3 days
};

export const DEFAULT_WIFI: WifiConfig = {
  ssid: "Verizon_QZ3JZY",
  passcode: "aid-maid4-zap",
};

export const INITIAL_EVENTS: LocalEvent[] = [
  {
    id: '1',
    title: 'Breakfast at The Porch',
    time: 'Tomorrow, 9:00 AM',
    description: 'Enjoy our famous pancakes and Ghanaian tea.',
    icon: 'coffee'
  },
  {
    id: '2',
    title: 'Neighborhood Walk',
    time: 'Tomorrow, 5:00 PM',
    description: 'Guided tour of the historic Springville district.',
    icon: 'map'
  },
  {
    id: '3',
    title: 'Movie Night',
    time: 'Friday, 8:00 PM',
    description: 'Screening localized classics in the media room.',
    icon: 'film'
  }
];