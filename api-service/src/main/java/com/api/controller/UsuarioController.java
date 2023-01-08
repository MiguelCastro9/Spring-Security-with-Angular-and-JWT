package com.api.controller;

import com.api.model.UsuarioModel;
import com.api.service.RoleService;
import com.api.service.UsuarioService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Miguel Castro
 */
@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioModel>> listar() {

        return new ResponseEntity<>(usuarioService.list(), HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public UsuarioModel buscarId(@PathVariable("id") Long id) {

        return usuarioService.findId(id);
    }

    @PostMapping("/novo")
    public ResponseEntity<?> novo(@RequestBody UsuarioModel usuarioModel) {

        usuarioModel.setSenha(passwordEncoder.encode(usuarioModel.getSenha()));
        usuarioService.save(usuarioModel);
        roleService.insertRoles(usuarioModel.getId(), usuarioModel.getRoleValor());
        return new ResponseEntity<>("Usuário salvo com sucesso!", HttpStatus.CREATED);
    }

    @PutMapping("/editar")
    public ResponseEntity<?> editar(@RequestBody UsuarioModel usuarioModel) {

        usuarioModel.setSenha(passwordEncoder.encode(usuarioModel.getSenha()));
        usuarioService.edit(usuarioModel);
        roleService.insertRoles(usuarioModel.getId(), usuarioModel.getRoleValor());

        return new ResponseEntity<>("Usuário editado com sucesso!", HttpStatus.CREATED);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

        usuarioService.delete(id);
        roleService.deleteRoles(id);

        return new ResponseEntity<>("Usuário deletado com sucesso!", HttpStatus.OK);
    }

}
