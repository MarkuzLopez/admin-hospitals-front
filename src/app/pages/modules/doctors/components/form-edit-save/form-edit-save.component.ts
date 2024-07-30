import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService, Hospital, MedicoDB } from '../../services/doctors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '@pages/modules/hospitals/services/hospitals.service';

@Component({
	selector: 'app-form-edit-save',
	templateUrl: './form-edit-save.component.html',
	styleUrls: ['./form-edit-save.component.css']
})
export class FormEditSaveComponent implements OnInit {
	id: string | null = null;
	loading!: boolean;
	title!: string;
	doctor!: MedicoDB;
	formDoctor!: FormGroup;
	hospitals!: Hospital[];
	constructor(
		private activateRoute: ActivatedRoute,
		private doctorService: DoctorsService,
		private fb: FormBuilder,
		private hospitalService: HospitalsService
	) {
		this.id = this.activateRoute.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.checkSaveOrEdit();
		this.getHospitals();
		this.initForm();
		this.loading = true;
	}

	private initForm(): void {
		this.formDoctor = this.fb.group({
			id: [''],
			_id: [''],
			nameDoctor: ['', Validators.required],
			nameUser: [''],
			nameHospital: ['']
		});
	}

	checkSaveOrEdit(): void {
		if (this.id) {
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
					alert(`El medico ${res.medicoDB.nombre} se actualizo !!`);
				}
			});
		} else {
			console.log('guardar medico');
			this.createMedico();
		}
	}

	getHospitals(): void {
		this.loading = true;
		this.hospitalService.getHospitals().subscribe(({ hospitales }) => {
			this.hospitals = hospitales;
			this.loading = false;
		});
	}

	createMedico(): void {
		const { _id, nameDoctor } = this.formDoctor.value;
		this.doctorService.saveDoctor(nameDoctor, _id).subscribe({
			next: () => {
				alert('medico creado');
				this.formDoctor.reset();
			}
		});
	}
}
