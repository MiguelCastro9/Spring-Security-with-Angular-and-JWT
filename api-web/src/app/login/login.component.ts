import { HttpErrorResponse } from '@angular/common/http';
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

  loginDto = new LoginDto();
  alertMensagem = '';

  constructor(private tokenService: TokenService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(loginDto: LoginDto): void {
    this.authService.login(loginDto).subscribe(dados => {
      this.tokenService.setToken(dados.token);
      this.router.navigate(['/home']);
    }, (erro: HttpErrorResponse) => {
      this.alertMensagem = 'E-mail ou senha inválidos, verifique também se o usuário está ativo.';
    })
  }
}
