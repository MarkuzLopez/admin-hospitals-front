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
			nombre: ['', Validators.required]
		});
	}

	setData(hospital: Hospital): void {
		this.formHospital.patchValue({
			nombre: hospital?.nombre
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
		this.hospitalService.createHospitals(this.formHospital.value).subscribe(() => {
			console.log('hospital creado correctamente');
			this.bsModalRef.hide();
		});
	}

	updateHospital(): void {
		console.log('update hospitals');
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any): void {
		console.log(event);
	}

	uploadImagen(): void {
		console.log('upload');
	}
}
