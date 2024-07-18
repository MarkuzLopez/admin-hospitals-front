import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './pages/hospital.component';
import { RoutingModuleHospitals } from './hospitals-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [HospitalComponent],
	imports: [CommonModule, RoutingModuleHospitals, SharedModule],
	exports: [HospitalComponent]
})
export class HospitalsModule {}
