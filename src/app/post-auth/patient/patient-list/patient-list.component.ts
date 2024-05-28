import { Component, Inject, OnInit } from '@angular/core';
import { PatientService } from '../../../core/services/patient.service';
import { localStorageKeys } from '../../../app.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  authToken: any;
  patients: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'mobile'];
  constructor(
    private patientSvc: PatientService,
    @Inject('LOCALSTORAGE') protected localStorage: Storage,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authToken = this.localStorage?.getItem(localStorageKeys.authToken);
    this.loadPatient();
  }

  loadPatient(): void {
    try {
      let data: any = {};
      let authToken = this.localStorage.getItem(localStorageKeys.authToken);
      let mobile = this.localStorage.getItem(localStorageKeys.mobile);
      data.apikey = authToken;
      data.mobile = mobile;
      console.log(data.mobile);

      let listData$ = this.patientSvc.getPatients(data);
      listData$.subscribe((listData: any) => {
        this.patients = listData.data;
        console.log(this.patients);
      });
    } catch (e) {}
  }

  navigateToPatientDetail(mobile: string) {
    const url = `/patient-detail/${mobile}`;
    this.router.navigateByUrl(url);
  }
}
