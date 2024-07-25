import { Component } from '@angular/core';
import { DoctorsService, MedicoDB } from '../services/doctors.service';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
	loading!: boolean;
	doctors!: MedicoDB[];
	constructor(private doctorsService: DoctorsService) {
		this.getDoctors();
	}

	getDoctors(): void {
		this.loading = true;
		this.doctorsService.getDoctors().subscribe({
			next: ({ medicoDB }) => {
				this.doctors = medicoDB;
				this.loading = false;
			}
		});
	}

	// todo pending
	onSearch(e: any): void {
		console.log('Search');
	}
	// todo pending
	onCreate(): void {
		console.log('Create');
	}
	// todo pending
	onEdit(item: unknown): void {
		console.log('Edit');
	}
	// todo pending
	onDelete(id: string): void {
		console.log('Delete');
	}
}
