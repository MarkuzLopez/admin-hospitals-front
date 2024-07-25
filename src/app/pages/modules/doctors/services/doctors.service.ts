import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class DoctorsService {
	private readonly baseUrl!: string;

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	getDoctors(): Observable<Doctors> {
		return this.http.get<Doctors>(`${this.baseUrl}/medicos`);
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
	img?: string;
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
