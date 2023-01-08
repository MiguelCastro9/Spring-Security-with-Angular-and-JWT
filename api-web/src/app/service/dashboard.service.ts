import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  token = this.tokenService.getToken();

  public ativos() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/ativo', {headers});
  }

  public inativos() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/inativo', {headers});
  }

  public admins() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/admin', {headers});
  }

  public gestores() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/gestor', {headers});
  }

  public criadores() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/criador', {headers});
  }

  public editores() {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<number>(this.url + '/editor', {headers});
  }

}
