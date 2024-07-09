/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '@auth/models/login';
import { User, userRegister } from '@auth/models/user';
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

	createUser(user: userRegister): Observable<ResponseRequest> {
		return this.http.post<ResponseRequest>(`${this.baseUrl}/usuarios/create`, user).pipe(
			tap((response) => {
				localStorage.setItem('token', response.token);
			})
		);
	}

	updateProfile(user: User): Observable<ResponseRequest> {
		return this.http.put<ResponseRequest>(`${this.baseUrl}/usuarios/update/${this.usuario.uid}`, user, this.headers);
	}

	loginUser(user: UserLogin): Observable<ResponseRequest> {
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
		return this.http
			.get(`${this.baseUrl}/auth/renew`, {
				headers: {
					'x-token': this.token
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
			this.ngzone.run(() => {
				this.router.navigateByUrl('/login');
			});
			localStorage.removeItem('token');
			localStorage.removeItem('email');
		});
	}

	getImageUsr(): string {
		let imgUrl: string;
		if (this.usuario.google) {
			imgUrl = this.usuario.img || '';
		} else if (this.usuario.img) {
			imgUrl = environment.apiUrl + '/upload/usuarios/' + this.usuario.img;
		} else {
			imgUrl = environment.apiUrl + '/upload/usuarios/no-image';
		}
		return imgUrl;
	}

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	get headers() {
		return {
			headers: {
				'x-token': this.token
			}
		};
	}
}

export interface ResponseRequest {
	ok: true;
	msg?: string;
	usuario?: User;
	token: string;
}
