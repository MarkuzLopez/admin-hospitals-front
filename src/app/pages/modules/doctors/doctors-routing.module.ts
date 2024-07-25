import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './pages/doctor.component';
import { NgModule } from '@angular/core';
import { FormEditSaveComponent } from './components/form-edit-save/form-edit-save.component';

const routes: Routes = [
	{ path: '', component: DoctorComponent },
	{
		path: 'edit/:id',
		component: FormEditSaveComponent
	},
	{
		path: 'save',
		component: FormEditSaveComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoutingModuleDoctors {}
