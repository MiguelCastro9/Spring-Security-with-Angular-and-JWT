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

  ativoValor!: number;
  inativoValor!: number;
  adminValor!: number;
  readValor!: number;
  isRead = false;

  constructor(private tokenService: TokenService, private usuarioService: UsuarioService,
    private dashboardService: DashboardService) {
      Chart.register(...registerables);
     }

  @ViewChild("graficoPermissao", {static: true}) elemento1!: ElementRef;
  @ViewChild("graficoAtivosInativos", {static: true}) elemento2!: ElementRef;

  ngOnInit(): void {
    this.isRead = this.tokenService.isRead();
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
