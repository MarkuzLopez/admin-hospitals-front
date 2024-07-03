import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'hospitals',
				loadChildren: () => import('@pages/modules/hospitals/hospitals.module').then((m) => m.HospitalsModule)
			},
			{
				path: 'doctors',
				loadChildren: () => import('@pages/modules/doctors/doctors.module').then((m) => m.DoctorsModule)
			},
			{
				path: 'profile',
				component: PerfilUserComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoutingModulePages {}
