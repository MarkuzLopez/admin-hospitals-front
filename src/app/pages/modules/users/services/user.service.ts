import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, userRegister } from '@auth/models/user';
import { AuthService, ResponseRequest } from '@auth/service/auth.service';
import { Observable, tap } from 'rxjs';
import { searchCollection } from 'src/app/models/searchCollection';
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

	updateProfile(userUpdate: userUpdate): Observable<ResponseRequest> {
		const uid = userUpdate.uid;
		const headersRequest = this.authService.headers;
		return this.http.put<ResponseRequest>(`${this.baseUrl}/usuarios/update/${uid}`, userUpdate, headersRequest);
	}

	deleteUser(uid: string): Observable<unknown> {
		return this.http.delete(`${this.baseUrl}/usuarios/delete/${uid}`, this.authService.headers);
	}

	searchUsers(word: string): Observable<searchCollection<User>> {
		return this.http.get<searchCollection<User>>(
			`${this.baseUrl}/todo/collection/usuarios/${word}`,
			this.authService.headers
		);
	}
}

export interface ResponseUsers {
	ok: string;
	total: number;
	usuarios: User[];
}

export interface userUpdate extends userRegister {
	uid: string;
	role?: string;
}
