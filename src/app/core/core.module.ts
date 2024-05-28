import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { PatientService } from './services/patient.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, PatientService],
})
export class CoreModule {}
