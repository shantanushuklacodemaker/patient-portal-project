import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, lastValueFrom, take } from 'rxjs';
import { PatientService } from '../../../core/services/patient.service';
import { localStorageKeys } from '../../../app.constant';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css',
})
export class PatientDetailComponent implements OnInit {
  subscriptions!: Subscription;
  patient: any = null;
  transcriptions: any = '';

  constructor(
    private ar: ActivatedRoute,
    public patientSvc: PatientService,
    @Inject('LOCALSTORAGE') protected localStorage: Storage
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.ar.params.subscribe(async (params: any) => {
        try {
          console.log(params.mobile);
          let data: any = {};
          let authToken = this.localStorage.getItem(localStorageKeys.authToken);
          data.apikey = authToken;
          data.mobile = params.mobile;
          let patientApiResponse: any = await lastValueFrom(
            this.patientSvc.getPatients(data)
          );
          this.patient = patientApiResponse.data[0] || null;
          console.log(this.patient);
        } catch (e) {
          this.patient = {};
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }
}
