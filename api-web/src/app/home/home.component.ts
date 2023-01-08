import { TokenService } from './../service/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;
  isGestor = false;
  isCriador = false;
  isEditor = false;
  roles!: string[];
  emailLogado!: string;
  rolesLogado!: string[];
  rolesLogadoNome!: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {

      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(dados => {
        if (dados == 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
        if (dados == 'ROLE_GESTOR') {
          this.isGestor = true;
        }
        if (dados == 'ROLE_CRIADOR') {
          this.isCriador = true;
        }
        if (dados == 'ROLE_EDITOR') {
          this.isEditor = true;
        }
        this.emailLogado = this.tokenService.getEmail();
        this.rolesLogado = this.tokenService.getAuthorities();
        this.rolesLogado.filter(dados => {
          this.rolesLogadoNome = dados;
        })
      })
    } else {

      this.isGestor = false;
      this.isAdmin = false;
    }
  }

}
