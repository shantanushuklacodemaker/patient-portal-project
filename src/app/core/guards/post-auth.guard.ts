import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { localStorageKeys } from '../../app.constant';

@Injectable({
  providedIn: CoreModule,
})
export class PostAuthGuard implements CanActivate {
  constructor(
    @Inject('LOCALSTORAGE') protected localStorage: any,
    protected router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkSession();
  }

  checkSession() {
    try {
      let authToken: any = this.localStorage.getItem(
        localStorageKeys.authToken
      );
      if (!authToken) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      this.router.navigate(['login']);
      return false;
    }
  }
}
