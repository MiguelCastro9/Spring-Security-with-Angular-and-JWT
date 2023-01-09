import { TokenService } from './../service/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;
  isRead = false;
  emailLogado!: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isRead = this.tokenService.isRead();
    this.emailLogado = this.tokenService.getEmail();
  }
}
