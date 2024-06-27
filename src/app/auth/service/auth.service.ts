/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '@auth/models/login';
import { User } from '@auth/models/user';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environment';

// for logout of google.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly baseUrl = environment.apiUrl;
	usuario!: User;

	constructor(
		private http: HttpClient,
		private router: Router,
		private ngzone: NgZone
	) {}

	createUser(user: User): Observable<ResponseRequest> {
		return this.http.post<ResponseRequest>(`${this.baseUrl}/usuarios/create`, user).pipe(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			tap((res: any) => {
				localStorage.setItem('token', res.token);
			})
		);
	}

	loginUser(user: Login): Observable<ResponseRequest> {
		return this.http.post<ResponseRequest>(`${this.baseUrl}/auth/login`, user).pipe(
			tap((response: ResponseRequest) => {
				localStorage.setItem('token', response?.token);
			})
		);
	}

	loginGoogleSignIn(token: string): Observable<ResponseRequest> {
		return this.http.post<ResponseRequest>(`${this.baseUrl}/auth/googleSignIn`, { token }).pipe(
			tap((response: ResponseRequest) => {
				localStorage.setItem('token', response?.token);
			})
		);
	}

	tokenValidation(): Observable<boolean> {
		const token = localStorage.getItem('token') || '';

		return this.http
			.get(`${this.baseUrl}/auth/renew`, {
				headers: {
					'x-token': token
				}
			})
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				tap((resp: any) => {
					const { email, google, nombre, role, uid, img } = resp.usuario;

					this.usuario = {
						email,
						google,
						nombre,
						role,
						uid,
						img
					};

					localStorage.setItem('token', resp?.token);
				}),
				map(() => true),
				catchError(() => of(false))
			);
	}

	onLogout(): void {
		const email = localStorage.getItem('email') || '';
		google.accounts.oauth2.revoke(email, () => {
			console.log('entraaa', email);

			this.ngzone.run(() => {
				this.router.navigateByUrl('/login');
			});
			localStorage.removeItem('token');
			localStorage.removeItem('email');
		});
	}

	getImageUsr(): string {
		let imgUrl: string;
		if (this.usuario.img) {
			imgUrl = environment.apiUrl + '/upload/usuarios/' + this.usuario.img;
		} else {
			imgUrl = environment.apiUrl + '/upload/usuarios/no-image';
		}
		return imgUrl;
	}
}

export interface ResponseRequest {
	ok: true;
	msg?: string;
	usuario?: User;
	token: string;
}
