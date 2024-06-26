import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
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
