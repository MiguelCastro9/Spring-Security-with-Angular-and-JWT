import { TokenService } from './token.service';
import { UsuarioDto } from './../model/usuarioDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  token = this.tokenService.getToken();

  public listar() {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<UsuarioDto[]>(this.url + '/listar', {headers});
  }

  buscar(id: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.get<UsuarioDto>(this.url + '/buscar/' + id, {headers});
  }

  public inserir(usuarioDto: UsuarioDto) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.post<any>(this.url + '/inserir', usuarioDto, {headers});
  }

  public editar(usuarioDto: UsuarioDto) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.put<UsuarioDto>(this.url + '/editar', usuarioDto, {headers});
  }

  public deletar(usuarioDto: UsuarioDto) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token });
    return this.http.delete<UsuarioDto>(this.url + '/deletar/' + usuarioDto.id, {headers});
  }
}
