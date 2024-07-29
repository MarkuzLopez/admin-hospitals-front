import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService, MedicoDB } from '../../services/doctors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-edit-save',
	templateUrl: './form-edit-save.component.html',
	styleUrls: ['./form-edit-save.component.css']
})
export class FormEditSaveComponent {
	id: string | null = null;
	title!: string;
	doctor!: MedicoDB;
	formDoctor: FormGroup;
	constructor(
		private activateRoute: ActivatedRoute,
		private doctorService: DoctorsService,
		private fb: FormBuilder
	) {
		this.id = this.activateRoute.snapshot.paramMap.get('id');
		this.checkSaveOrEdit();
		this.formDoctor = this.fb.group({
			id: [''],
			nameDoctor: ['', Validators.required],
			nameUser: [''],
			nameHospital: ['']
		});

		console.log(this.formDoctor.value, 'asda');
	}

	checkSaveOrEdit(): void {
		if (this.id) {
			console.log('editar');
			this.doctorService.getDoctorById(this.id).subscribe(({ medicoDB }) => {
				console.log('doctor editado', medicoDB);
				this.title = 'Actualizar';
				this.formDoctor.patchValue({
					id: medicoDB._id,
					nameDoctor: medicoDB.nombre,
					nameUser: medicoDB.usuario.nombre,
					nameHospital: medicoDB.hospital.nombre
				});
			});
		} else {
			this.title = 'Guardar';
			console.log('guardar');
		}
	}

	onAction(): void {
		if (this.title === 'Actualizar') {
			const { nameDoctor, id } = this.formDoctor.value;
			this.doctorService.updateDoctor(nameDoctor, id).subscribe({
				next: (res) => {
					// console.log('actualziado', res.medico.nombre);
					alert(`El medico ${res.medico.nombre} se actualizo !!`);
				}
			});
		}
	}
}
