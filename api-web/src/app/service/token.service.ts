import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getEmail(): string {
    if (!this.isLogged()) {
      return "";
    }
    const token = this.getToken();
    //Recuperando dados do usuário pelo hash do token na posição 1.
    //Ex.: aaaaaaaaaa.(dados do usuário).aaaaaaaaaa
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const email = values.sub;
    return email;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    //Recuperando dados do usuário pelo hash do token na posição 1.
    //Ex.: aaaaaaaaaa.(dados do usuário).aaaaaaaaaa
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    //Verificando se é administrador.
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public isRead(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    //Recuperando dados do usuário pelo hash do token na posição 1.
    //Ex.: aaaaaaaaaa.(dados do usuário).aaaaaaaaaa
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    //Verificando se é leitor.
    if (roles.indexOf('ROLE_READ') < 0) {
      return false;
    }
    return true;
  }
}
