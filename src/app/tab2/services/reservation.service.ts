import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://localhost:3000/reservation/findReservation' ;


@Injectable({
  providedIn: 'root'
})
export class ReservationService {




  constructor(private http: HttpClient) {
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
   getReservations(): Observable<any> {
    return this.http.get(apiUrl,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
   cancelReservation(res) {
    return this.http.patch<any>('http://localhost:3000/reservation/cancelReservation/' +res._id, res);
  }



}
