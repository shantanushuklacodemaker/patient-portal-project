import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class PatientService {
  constructor(private http: HttpClient) {}
  public getPatients(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      'https://dev-api.evitalrx.in/v1/patient/patients/view',
      data,
      httpOptions
    );
  }
}
