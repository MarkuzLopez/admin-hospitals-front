import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './pages/doctor.component';
import { RoutingModuleDoctors } from './doctors-routing.module';
import { FormEditSaveComponent } from './components/form-edit-save/form-edit-save.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [DoctorComponent, FormEditSaveComponent],
	imports: [CommonModule, RoutingModuleDoctors, SharedModule]
})
export class DoctorsModule {}
