import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './pages/doctor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: DoctorComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoutingModuleDoctors {}
