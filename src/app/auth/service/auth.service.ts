import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  createUser(usuario: User): Observable<any> {
    console.log(usuario, 'user');    
    return this.http.post(`${this.baseUrl}/usuarios/create`, usuario);
  }
}
