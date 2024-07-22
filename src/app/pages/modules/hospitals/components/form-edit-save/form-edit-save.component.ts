import { Component } from '@angular/core';
import { Hospital, HospitalsService } from '../../services/hospitals.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-edit-save',
	templateUrl: './form-edit-save.component.html',
	styleUrls: ['./form-edit-save.component.css']
})
export class FormEditSaveComponent {
	title!: string;
	formHospital!: FormGroup;
	imgTemp!: string;
	mode!: string;
	constructor(
		private hospitalService: HospitalsService,
		private fbBldr: FormBuilder,
		public bsModalRef: BsModalRef
	) {
		this.formHospital = this.fbBldr.group({
			_id: [''],
			nombre: ['', Validators.required]
		});
	}

	setData(hospital: Hospital): void {
		this.formHospital.patchValue({
			nombre: hospital?.nombre,
			_id: hospital?._id
		});
	}

	doAction(): void {
		if (this.mode === 'create') {
			this.createHospital();
		} else {
			this.updateHospital();
		}
	}

	createHospital(): void {
		this.hospitalService.createHospital(this.formHospital.value).subscribe(() => {
			// todo alerts
			console.log('hospital creado correctamente');
			this.bsModalRef.hide();
		});
	}

	updateHospital(): void {
		if (this.formHospital.valid) {
			this.hospitalService.updateHospital(this.formHospital.value).subscribe(() => {
				//TODOD alerts
				alert('hospital actualizado correctamente');
			});
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any): void {
		console.log(event);
	}

	uploadImagen(): void {
		console.log('upload');
	}
}
