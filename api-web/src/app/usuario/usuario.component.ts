import { TokenService } from './../service/token.service';
import { UsuarioService } from './../service/usuario.service';
import { UsuarioDto } from './../model/usuarioDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioDto = new UsuarioDto();
  usuarioLista: UsuarioDto[] = [];
  insereOuAltera = false;
  senha = '';
  senhaRepetida = '';
  alertMensagem = '';

  constructor(private usuarioService: UsuarioService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioService.listar().subscribe(dados => this.usuarioLista = dados);
  }

  validarFormulario() {
    if (!this.usuarioDto.nome) {
      this.alertMensagem = 'Campo nome é obrigatório.';
      return false;
    }
    if (!this.usuarioDto.email) {
      this.alertMensagem = 'Campo e-mail é obrigatório.';
      return false;
    }
    if (!this.usuarioDto.email.match("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")) {
      this.alertMensagem = 'Campo e-mail inválido.';
      return false;
    }
    if (!this.senha) {
      this.alertMensagem = 'Campo senha é obrigatório.';
      return false;
    }
    if (this.senha.length < 8) {
      this.alertMensagem = 'Campo senha deve conter no mínimo 8 digítos.';
      return false;
    }
    if (!this.senhaRepetida) {
      this.alertMensagem = 'Campo repetir senha é obrigatório.';
      return false;
    }
    if (this.senhaRepetida.length < 8) {
      this.alertMensagem = 'Campo repetir senha deve conter no mínimo 8 digítos.';
      return false;
    }
    if (this.senha != this.senhaRepetida) {
      this.alertMensagem = 'As senhas não são iguais.';
      return false;
    }
    if (!this.usuarioDto.roleValor) {
      this.alertMensagem = 'Campo permissão é obrigatório.';
      return false;
    }
    return true;
  }

  inserir(usuarioDto: UsuarioDto) {
    if (!this.validarFormulario()) {
      return;
    }
    if (!this.insereOuAltera) {
      this.usuarioDto.senha = this.senha;
      this.usuarioService.inserir(usuarioDto).subscribe().unsubscribe();
      alert('Usuário salvo com sucesso!');
      window.location.reload();

    } else {
      this.usuarioDto.senha = this.senha;
      this.usuarioService.alterar(usuarioDto).subscribe().unsubscribe();
      alert('Usuário alterado com sucesso!');
      window.location.reload();
    }
  }

  alterar(usuarioDto: UsuarioDto) {
    this.insereOuAltera = true;
    localStorage.setItem('id', usuarioDto.id.toString());
    let id = localStorage.getItem('id');
    this.usuarioService.buscar(id)
    .subscribe(dados => this.usuarioDto = dados);
  }

  deletar(usuarioDto: UsuarioDto) {
    if(confirm("Deseja deletar este usuário ?")){
      this.usuarioService.deletar(usuarioDto)
      .subscribe(dados => this.usuarioLista = this.usuarioLista.filter(p => usuarioDto));
      alert('Usuário deletado com sucesso!');
      window.location.reload();
    }
  }
}
