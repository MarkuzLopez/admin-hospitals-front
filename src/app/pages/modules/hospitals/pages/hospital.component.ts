import { Component } from '@angular/core';
import { environment } from 'src/environment';
import { Hospital, HospitalsService } from '../services/hospitals.service';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { FormEditSaveComponent } from '../components/form-edit-save/form-edit-save.component';

@Component({
	selector: 'app-hospital',
	templateUrl: './hospital.component.html',
	styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
	loading!: boolean;
	hospitals: Hospital[] = [];
	imgView!: string;
	bsModalRef?: BsModalRef;
	constructor(
		private hospitalsService: HospitalsService,
		private modalService: BsModalService
	) {
		console.log('si entraaa aqui');
		this.imgView = environment.apiUrl + '/upload/hospitals';
		this.getHospitals();
	}

	getHospitals(): void {
		this.loading = true;
		this.hospitalsService.getHospitals().subscribe(({ hospitales }) => {
			this.hospitals = hospitales;
			this.loading = false;
		});
	}

	fireAction(options: { dataHospital: Hospital | null; mode: 'edit' | 'create'; title: string }): void {
		const initialState: ModalOptions = {
			initialState: {
				title: options.title,
				mode: options.mode
			}
		};
		this.bsModalRef = this.modalService.show(FormEditSaveComponent, initialState);
		this.bsModalRef.content?.setData(options.dataHospital);
		this.bsModalRef.onHidden?.subscribe(() => this.getHospitals());
	}

	onCreate(): void {
		this.fireAction({
			dataHospital: null,
			mode: 'create',
			title: 'Crear Hospital'
		});
	}

	onEdit(hospital: Hospital): void {
		this.fireAction({
			dataHospital: hospital,
			mode: 'edit',
			title: 'Editar Hospital'
		});
	}
}
