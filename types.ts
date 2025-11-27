export interface Guest {
  name: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface WifiConfig {
  ssid: string;
  passcode: string;
}

export interface LocalEvent {
  id: string;
  title: string;
  time: string;
  description: string;
  icon?: string;
}

export interface WeatherData {
  temp: number;
  condition: string; // 'Sunny', 'Cloudy', 'Rain', etc.
  high: number;
  low: number;
}
