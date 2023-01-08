import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { TokenService } from './../service/token.service';
import { LoginDto } from './../model/loginDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logado = false;
  deslogado = false;
  loginDto = new LoginDto();
  roles: string[] = [];
  alertMensagem = '';

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()) {

      this.logado = true;
      this.deslogado = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  login(loginDto: LoginDto): void {

    this.authService.login(this.loginDto).subscribe(dados => {

      this.logado = true;
      this.deslogado = false;

      this.tokenService.setToken(dados.token);
      this.tokenService.setEmail(dados.email);
      this.tokenService.setAuthorities(dados.authorities);
      this.roles = dados.authorities;
      this.router.navigate(['/home']);

    }, err => {
      this.logado = false;
      this.deslogado = true;
      this.alertMensagem = 'E-mail ou senha inválidos, verifique também se o usuário está ativo.';
    })
  }

}
