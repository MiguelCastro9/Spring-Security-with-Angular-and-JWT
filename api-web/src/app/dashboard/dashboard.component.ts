import { UsuarioDto } from './../model/usuarioDto';
import { UsuarioService } from './../service/usuario.service';
import { TokenService } from './../service/token.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarioLista: UsuarioDto[] = [];
  ativoValor!: number;
  inativoValor!: number;
  adminValor!: number;
  readValor!: number;
  isAdmin = false;
  isRead = false;
  roles!: string[];
  total!: number;

  constructor(private tokenService: TokenService, private usuarioService: UsuarioService,
    private dashboardService: DashboardService) {
      Chart.register(...registerables);
     }

  @ViewChild("graficoPermissao", {static: true}) elemento1!: ElementRef;
  @ViewChild("graficoAtivosInativos", {static: true}) elemento2!: ElementRef;

  ngOnInit(): void {

    if (this.tokenService.getToken()) {

      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(dados => {
        if (dados == 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
        if (dados == 'ROLE_READ') {
          this.isRead = true;
        }
      })
    } else {

      this.isAdmin = false;
      this.isRead = false;
    }

    this.dashboardService.inativos().subscribe(dados => {
      this.inativoValor = dados;
    this.dashboardService.ativos().subscribe(dados => {
      this.ativoValor = dados;
    this.dashboardService.admins().subscribe(dados => {
      this.adminValor = dados;
    this.dashboardService.reads().subscribe(dados => {
      this.readValor = dados;

    new Chart(this.elemento1.nativeElement, {
      type: 'pie',
      data: {
        labels: ["Administadores", "Leitores"],
        datasets: [{
          data: [this.adminValor, this.readValor]
        }]
      },
      options: {
        responsive: true
      }
    });
    new Chart(this.elemento2.nativeElement, {
      type: 'pie',
      data: {
        labels: ["Ativos","Inativos"],
        datasets: [{
          data: [this.ativoValor, this.inativoValor]
        }]
      },
      options: {
        responsive: true
      }
    });
  });
  });
  });
  });
  };
}
