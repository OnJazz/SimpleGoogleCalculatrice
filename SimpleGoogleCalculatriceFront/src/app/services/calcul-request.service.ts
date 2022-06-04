import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculRequestService {

  constructor(private http: HttpClient) { }
  /**
   * Send a post request to the back end which is on localhost:3000 with a string as param
   * @param calcul a string representing a calcul
   * @returns an observable containing the string which is the res of the calcul
   */
  getResultFromCalcul = (calcul: string): Observable<string> => {
    return this.http.post<string>("http://localhost:3000/calcul", { calcul });
  }
}
