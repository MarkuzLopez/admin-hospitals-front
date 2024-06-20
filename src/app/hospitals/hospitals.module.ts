import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './pages/hospital.component';
import { RoutingModuleHospitals } from './hospitals-routing.module';



@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    CommonModule,
    RoutingModuleHospitals
  ]
})
export class HospitalsModule { }
