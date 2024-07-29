import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class DoctorsService {
	private readonly baseUrl!: string;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.baseUrl = environment.apiUrl;
	}

	getDoctors(): Observable<Doctors> {
		return this.http.get<Doctors>(`${this.baseUrl}/medicos`);
	}
	getDoctorById(id: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/medicos/byId/${id}`);
	}
	updateDoctor(nombre: string, id: string): Observable<any> {
		return this.http.put(`${this.baseUrl}/medicos/update/${id}`, { nombre }, this.authService.headers);
	}
}

export interface Doctors {
	ok: boolean;
	medicoDB: MedicoDB[];
}

export interface MedicoDB {
	_id: string;
	nombre: string;
	usuario: Usuario;
	hospital: Hospital;
	img: string;
}

export interface Hospital {
	_id: string;
	nombre: string;
}

export interface Usuario {
	_id: string;
	nombre: string;
	img: string;
}
