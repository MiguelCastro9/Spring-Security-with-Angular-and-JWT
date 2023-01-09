import { JwtDto } from './../model/jwtDto';
import { LoginDto } from './../model/loginDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  public login(loginDto: LoginDto) {
    return this.http.post<JwtDto>(this.url + '/login', loginDto);
  }
}
