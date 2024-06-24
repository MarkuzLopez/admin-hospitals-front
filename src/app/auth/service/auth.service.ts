import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@auth/models/login';
import { User } from '@auth/models/user';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    console.log(user, 'user');
    return this.http.post(`${this.baseUrl}/usuarios/create`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginUser(user: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response?.token);
      })
    );
  }
}
// tap es otro operador observable que dispara otro efecto secundario.
