import { Observable, take } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageKeys } from '../../app.constant';
import { AuthService } from '../../core/services/auth.service';
import { AppValidators } from '../../core/classes/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    @Inject('LOCALSTORAGE') protected localStorage: Storage,
    private router: Router,
    private authSvc: AuthService,
    protected formBuilder: FormBuilder
  ) {}

  get form(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      apikey: ['dwkoortGX8DVYzLP559sGJeWty4wX0de'],
      mobile: [null, [Validators.required, AppValidators.contact]],
      password: [null, [Validators.required]],
    });
  }

  async onSubmit($event: Event): Promise<void> {
    $event.preventDefault();
    if (!this.loginForm.valid) {
      return;
    }
    try {
      let response$: Observable<any> = this.authSvc
        .login(this.loginForm.value)
        .pipe(take(1));
      response$.subscribe({
        next: (responseData) => {
          if (responseData == undefined || !responseData) {
            return;
          }
          this.localStorage.setItem(
            localStorageKeys.authToken,
            'dwkoortGX8DVYzLP559sGJeWty4wX0de'
          );
          this.localStorage.setItem(localStorageKeys.mobile, '7777777777');
          this.authSvc.setLoggedInSuccess(true);

          this.router.navigate(['patients']);
        },
        error: (err: any) => {},
      });
    } catch (e) {}
  }
}
