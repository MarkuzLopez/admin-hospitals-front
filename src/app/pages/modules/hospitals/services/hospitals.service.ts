import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class HospitalsService {
	private readonly baseUrl = environment.apiUrl;
	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {}

	getHospitals(): Observable<ResponseHospitals> {
		return this.http.get<ResponseHospitals>(`${this.baseUrl}/hospitales`);
	}

	createHospitals(data: { nombre: string }): Observable<ResponseCreate> {
		return this.http.post<ResponseCreate>(`${this.baseUrl}/hospitales/create`, data, this.authService.headers);
	}
}

interface ResponseHospitals {
	ok: boolean;
	hospitales: Hospital[];
}

export interface Hospital {
	_id: string;
	nombre: string;
	img: string;
	usuario: unknown;
}

export interface ResponseCreate {
	ok: boolean;
	hospital: Hospital;
}
