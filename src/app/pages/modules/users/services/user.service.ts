import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, userRegister } from '@auth/models/user';
import { AuthService, ResponseRequest } from '@auth/service/auth.service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly baseUrl!: string;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.baseUrl = environment.apiUrl;
	}

	getUsers(value?: number): Observable<ResponseUsers> {
		return this.http.get<ResponseUsers>(`${this.baseUrl}/usuarios?desde=${value}`, this.authService.headers);
	}

	createUser(user: userRegister): Observable<ResponseRequest> {
		return this.http.post<ResponseRequest>(`${this.baseUrl}/usuarios/create`, user).pipe(
			tap((response) => {
				localStorage.setItem('token', response.token);
			})
		);
	}

	updateProfile(userUpdate: { nombre: string; email: string; uid: string }): Observable<ResponseRequest> {
		const uid = userUpdate.uid;
		const headersRequest = this.authService.headers;
		return this.http.put<ResponseRequest>(`${this.baseUrl}/usuarios/update/${uid}`, userUpdate, headersRequest);
	}
}

export interface ResponseUsers {
	ok: string;
	total: number;
	usuarios: User[];
}
