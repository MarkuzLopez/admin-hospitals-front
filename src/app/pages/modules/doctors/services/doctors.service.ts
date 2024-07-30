import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';
import { Observable } from 'rxjs';
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

	getDoctors(): Observable<Doctors<MedicoDB[]>> {
		return this.http.get<Doctors<MedicoDB[]>>(`${this.baseUrl}/medicos`);
	}
	getDoctorById(id: string): Observable<Doctors<MedicoDB>> {
		return this.http.get<Doctors<MedicoDB>>(`${this.baseUrl}/medicos/byId/${id}`);
	}
	updateDoctor(nombre: string, id: string): Observable<Doctors<MedicoDB>> {
		return this.http.put<Doctors<MedicoDB>>(
			`${this.baseUrl}/medicos/update/${id}`,
			{ nombre },
			this.authService.headers
		);
	}
	saveDoctor(nombre: string, hospital: string): Observable<Doctors<MedicoDB>> {
		return this.http.post<Doctors<MedicoDB>>(
			`${this.baseUrl}/medicos/create`,
			{ nombre, hospital },
			this.authService.headers
		);
	}
}

export interface Doctors<T> {
	ok: boolean;
	medicoDB: T;
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
