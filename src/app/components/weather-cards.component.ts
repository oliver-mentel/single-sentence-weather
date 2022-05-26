import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../interfaces/weatherData';
import { WeatherApiService } from '../services/weather-api.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';

enum TemperatureColor {
  veryCold = '#148efbbd',
  cold = '#1edbcbbd',
  normal = '#17ce37bd',
  warm = '#deb200',
  hot = '#de8300',
  veryHot = '#de3900',
}

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.scss'],
})
export class WeatherCardsComponent implements OnInit {
  nameOfLocation: string = '';
  weatherData: WeatherData | undefined;
  displayData: boolean | undefined;
  temperatureColor!: string;
  locations: WeatherData[] = new Array<WeatherData>();
  location: WeatherData | undefined;
  badRequest: boolean = false;
  isDetailView: boolean = false;

  // Fa Icons
  faHeart = faHeart;
  faSun = faSun;

  constructor(private httpService: WeatherApiService) {}

  ngOnInit(): void {
    // load favorite locations from local storage
    for (let i = 0; i < localStorage.length; i++) {
      this.locations.push(
        JSON.parse(localStorage.getItem(localStorage.key(i)!)!)
      );
    }
    // set all locations to displayDetails: false
    this.locations.forEach((location) => (location.displayDetails = true));
    this.displayData = true;
  }

  onSubmit(location: string) {
    if (location !== '') {
      // Used for template to display location name
      this.nameOfLocation = location;

      // Call weather service
      this.httpService.getData(location).subscribe(
        (weatherData: any) => {
          this.weatherData = weatherData;
          this.badRequest = false;
          if (this.weatherData) {
            this.defineTemperatureColor(this.weatherData?.current?.temp_c!);

            this.locations.unshift({
              id: this.locations.length + 1,
              current: { ...weatherData.current },
              location: { ...weatherData.location },
              temperatureColor: this.temperatureColor,
              displayDetails: false,
              isFavoriteLocation: false,
            });
            this.displayData = true;
          }
        },
        // Error Handling
        (error) => {
          if (error.status === 400) {
            this.badRequest = true;
          }
        }
      );
    }
  }

  defineTemperatureColor(temperature: number) {
    if (temperature < -5) {
      this.temperatureColor = TemperatureColor.veryCold;
    } else if (temperature >= -5 && temperature < 10) {
      this.temperatureColor = TemperatureColor.cold;
    } else if (temperature >= 10 && temperature < 20) {
      this.temperatureColor = TemperatureColor.normal;
    } else if (temperature >= 20 && temperature < 30) {
      this.temperatureColor = TemperatureColor.warm;
    } else if (temperature >= 30 && temperature < 40) {
      this.temperatureColor = TemperatureColor.hot;
    } else {
      this.temperatureColor = TemperatureColor.veryHot;
    }
  }

  removeLocation(id: number) {
    if (confirm('Are you sure you want to delete this location?')) {
      // Remove favorite location from local storage
      this.locations.forEach((location) => {
        if (location.id === id) {
          localStorage.removeItem(location.location!.name);
        }
      });

      // Remove location from locations array
      this.locations = this.locations.filter((location) => location.id !== id);
    }
  }

  addToFavorites(id: number) {
    // Add favorite location to locations array in local storage
    this.locations.forEach((location) => {
      if (location.id === id) {
        // set location property isFavoriteLocation to true
        location.isFavoriteLocation = true;
        localStorage.setItem(location.location!.name, JSON.stringify(location));

      }
    });
  }

  toggleDetails(id: number) {
    this.locations.forEach((location) => {
      if (location.id === id) {
        location.displayDetails = !location.displayDetails;
      }
    });
  }
}
