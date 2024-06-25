import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)
  },
  {
    // TODO  add header, sidebar auth guards
    path: 'doctors',
    loadChildren: () => import('@doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'hospitals',
    // TODO  add header, sidebar and authguards
    loadChildren: () => import('@hospitals/hospitals.module').then( m => m.HospitalsModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('@pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
