import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@auth/models/login';
import { User } from '@auth/models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl  = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  createUser(user: User): Observable<any> {
    console.log(user, 'user');    
    return this.http.post(`${this.baseUrl}/usuarios/create`, user);
  }

  loginUser (user: Login): Observable<any> { 
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }
}
