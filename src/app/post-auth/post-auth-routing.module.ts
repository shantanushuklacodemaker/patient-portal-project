import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAuthGuard } from '../core/guards/post-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PostAuthGuard],
    children: [
      {
        path: 'patients',
        loadChildren: () =>
          import('./patient/patient-list/patient-list.module').then(
            (m) => m.PatientListModule
          ),
      },
      {
        path: 'patient-detail/:mobile',
        loadChildren: () =>
          import('./patient/patient-detail/patient-detail.module').then(
            (m) => m.PatientDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAuthRoutingModule {}
