import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials } from '../interfaces/login-credentials.interface';
import { localStorageKeys } from '../../app.constant';

@Injectable()
export class AuthService {
  private _loggedInSuccess!: BehaviorSubject<boolean>;
  loggedInSuccess!: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: any
  ) {
    this._loggedInSuccess = new BehaviorSubject(false);
    this.loggedInSuccess = this._loggedInSuccess.asObservable();
  }

  setLoggedInSuccess(value: boolean) {
    this._loggedInSuccess.next(value);
  }

  public login(loginCredentials: LoginCredentials): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      'https://dev-api.evitalrx.in/v1/patient/login',
      loginCredentials,
      httpOptions
    );
  }

  public logout() {
    this.localStorage.removeItem(localStorageKeys.authToken);
  }
}
