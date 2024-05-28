import { Component, Inject, OnInit } from '@angular/core';
import { localStorageKeys } from '../../../app.constant';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  authToken: any;
  subscriptions: Subscription = new Subscription();
  constructor(
    @Inject('LOCALSTORAGE') protected localStorage: Storage,
    private authSvc: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authToken = this.localStorage?.getItem(localStorageKeys.authToken);
    this.subscriptions.add(
      this.authSvc.loggedInSuccess.subscribe((value: any) => {
        if (!value) {
          return;
        }
        this.authToken = this.localStorage?.getItem(localStorageKeys.authToken);
      })
    );
  }

  logout(event: any): void {
    this.authSvc.logout();
    setTimeout(() => {
      this.router.navigate(['login']);
      this.authToken = this.localStorage?.getItem(localStorageKeys.authToken);
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }
}
