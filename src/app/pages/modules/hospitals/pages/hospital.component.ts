import { Component } from '@angular/core';
import { environment } from 'src/environment';
import { Hospitals, HospitalsService } from '../services/hospitals.service';

@Component({
	selector: 'app-hospital',
	templateUrl: './hospital.component.html',
	styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
	loading!: boolean;
	hospitals: Hospitals[] = [];
	imgView!: string;
	constructor(private hospitalsService: HospitalsService) {
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
}
