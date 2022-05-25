import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getData(location: string): Observable<object> {
    return this.http
      .get(
        'http://api.weatherapi.com/v1/current.json?key=' +
          environment.WEATHER_API_KEY +
          '&q=' +
          location
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
