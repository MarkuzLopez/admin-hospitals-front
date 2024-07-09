import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth/models/user';
import { AuthService } from '@auth/service/auth.service';
import { Observable } from 'rxjs';
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
}

export interface ResponseUsers {
	ok: string;
	total: number;
	usuarios: User[];
}
