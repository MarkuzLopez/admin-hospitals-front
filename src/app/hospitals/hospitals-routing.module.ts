import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from './pages/hospital.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: HospitalComponent }];

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RoutingModuleHospitals { }
