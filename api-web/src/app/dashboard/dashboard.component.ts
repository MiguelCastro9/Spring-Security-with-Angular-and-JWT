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
  gestorValor!: number;
  criadorValor!: number;
  editorValor!: number;
  isAdmin = false;
  isGestor = false;
  isCriador = false;
  isEditor = false;
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
        if (dados == 'ROLE_GESTOR') {
          this.isGestor = true;
        }
        if (dados == 'ROLE_CRIADOR') {
          this.isCriador = true;
        }
        if (dados == 'ROLE_EDITOR') {
          this.isEditor = true;
        }
      })
    } else {

      this.isGestor = false;
      this.isAdmin = false;
    }

    this.usuarios();

    this.dashboardService.inativos().subscribe(dados => {
      this.inativoValor = dados;
    this.dashboardService.ativos().subscribe(dados => {
      this.ativoValor = dados;
    this.dashboardService.editores().subscribe(dados => {
      this.editorValor = dados;
    this.dashboardService.criadores().subscribe(dados => {
      this.criadorValor = dados;
    this.dashboardService.gestores().subscribe(dados => {
      this.gestorValor = dados;
    this.dashboardService.admins().subscribe(dados => {
      this.adminValor = dados;

    new Chart(this.elemento1.nativeElement, {
      type: 'pie',
      data: {
        labels: ["Administadores","Gestores","Criadores","Editores"],
        datasets: [{
          data: [this.adminValor, this.gestorValor, this.criadorValor, this.editorValor]
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
  });
  });
  };

  usuarios() {

    this.usuarioService.listar().subscribe(dados => this.usuarioLista = dados);
  }
}
