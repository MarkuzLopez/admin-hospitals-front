import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './pages/doctor.component';
import { RoutingModuleDoctors } from './doctors-routing.module';

@NgModule({
	declarations: [DoctorComponent],
	imports: [CommonModule, RoutingModuleDoctors]
})
export class DoctorsModule {}
