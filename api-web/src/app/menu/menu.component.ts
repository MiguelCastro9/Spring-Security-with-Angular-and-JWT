import { TokenService } from './../service/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {

    window.localStorage.clear();
    window.location.reload();
    this.router.navigate(['login']);
  }

}
