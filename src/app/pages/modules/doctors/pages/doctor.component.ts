import { Component } from '@angular/core';
import { DoctorsService, MedicoDB } from '../services/doctors.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
	loading!: boolean;
	doctors!: MedicoDB[];
	action!: 'edit' | 'create';
	constructor(
		private doctorsService: DoctorsService,
		private router: Router
	) {
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
		this.router.navigate(['/doctors/save']);
	}
	// todo pending
	onEdit(item: any): void {
		console.log('Edit', item);
		this.router.navigate(['/doctors/edit', item?._id]);
	}
	// todo pending
	onDelete(id: string): void {
		console.log('Delete');
	}
}
