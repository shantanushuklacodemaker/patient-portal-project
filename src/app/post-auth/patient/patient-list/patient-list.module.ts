import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: PatientListComponent }];

@NgModule({
  declarations: [PatientListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class PatientListModule {
  constructor() {
    console.log('sadsad');
  }
}
