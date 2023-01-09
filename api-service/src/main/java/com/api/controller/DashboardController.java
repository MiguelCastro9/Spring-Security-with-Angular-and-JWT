package com.api.controller;

import com.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Miguel Castro
 */
@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/ativo")
    public ResponseEntity<Integer> countAtivo() {

        return new ResponseEntity<>(usuarioService.countUsuarioActive(), HttpStatus.OK);
    }

    @GetMapping("/inativo")
    public ResponseEntity<Integer> countInativo() {

        return new ResponseEntity<>(usuarioService.countUsuarioInactive(), HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<Integer> countAdmin() {

        return new ResponseEntity<>(usuarioService.countUsuarioAdmin(), HttpStatus.OK);
    }

    @GetMapping("/read")
    public ResponseEntity<Integer> countRead() {

        return new ResponseEntity<>(usuarioService.countUsuarioRead(), HttpStatus.OK);
    }
}
