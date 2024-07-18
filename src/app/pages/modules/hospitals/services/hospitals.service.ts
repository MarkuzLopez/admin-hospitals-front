import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class HospitalsService {
	private readonly baseUrl = environment.apiUrl;
	constructor(private http: HttpClient) {}

	getHospitals(): Observable<ResponseHospitals> {
		return this.http.get<ResponseHospitals>(`${this.baseUrl}/hospitales`);
	}
}

interface ResponseHospitals {
	ok: boolean;
	hospitales: Hospitals[];
}

export interface Hospitals {
	_id: string;
	nombre: string;
	img: string;
	usuario: unknown;
}
