import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

const API_URL = environment.serverUrl;

export interface FilterRequest {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getAll(param?: any): Observable<any[]> {
    let params = new HttpParams();

    Object.keys(param).forEach((item) => {
      params = params.set(item, param[item]);
    });

    const apiUrl = `${API_URL}/cards`;
    return this.httpClient.get(apiUrl, { params }).pipe(
      map((res: any) => res),
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An ErrorEvent error occurred:', error.error.message);
    } else {
      // console.error('An HttpErrorResponse error occurred:', error.message);
      // backend error 404...
      return throwError(() => error);
    }
    return throwError(
      () => 'Ohps something wrong happen here; please try again later.'
    );
  }
}
