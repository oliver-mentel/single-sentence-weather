import { Current } from './current';
import { Identifiable } from './identifiable';
import { Location } from './location';

export interface WeatherData extends Identifiable {
  current?: Current;
  location?: Location;
  temperatureColor?: string;
  displayDetails?: boolean
  isFavoriteLocation?: boolean
}
