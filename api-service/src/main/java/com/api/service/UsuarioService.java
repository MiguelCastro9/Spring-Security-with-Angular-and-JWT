package com.api.service;

import com.api.model.UsuarioModel;
import com.api.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Miguel Castro
 */
@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<UsuarioModel> getEmail(String email) {

        return usuarioRepository.findByEmail(email);
    }

    public boolean existsEmail(String email) {

        return usuarioRepository.existsByEmail(email);
    }

    public List<UsuarioModel> list() {

        return usuarioRepository.findAll();
    }

    public Optional<UsuarioModel> find(Long id) {

        Optional<UsuarioModel> usuarioModel = usuarioRepository.findById(id);

        if (!usuarioModel.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado.");
        }

        return usuarioModel;
    }

    public UsuarioModel save(UsuarioModel usuarioModel) {

        if ("".equalsIgnoreCase(usuarioModel.getNome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome inválido.");
        }
        if ("".equalsIgnoreCase(usuarioModel.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail inválido.");
        }
        if ("".equalsIgnoreCase(usuarioModel.getSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha inválida.");
        }
        if (usuarioModel.getRoleValor() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valor da role inválida.");
        }

        usuarioModel.setSenha(passwordEncoder.encode(usuarioModel.getSenha()));
        usuarioModel.setStatus(true);
        usuarioRepository.save(usuarioModel);

        return usuarioModel;
    }

    public UsuarioModel edit(UsuarioModel usuarioModel) {

        if ("".equalsIgnoreCase(usuarioModel.getNome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome inválido.");
        }
        if ("".equalsIgnoreCase(usuarioModel.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail inválido.");
        }
        if ("".equalsIgnoreCase(usuarioModel.getSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha inválida.");
        }
        if (usuarioModel.getRoleValor() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valor da role inválida.");
        }

        usuarioModel.setSenha(passwordEncoder.encode(usuarioModel.getSenha()));
        usuarioRepository.saveAndFlush(usuarioModel);

        return usuarioModel;
    }

    public void delete(Long id) {

        Optional<UsuarioModel> usuarioModel = usuarioRepository.findById(id);

        if (!usuarioModel.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado.");
        }

        usuarioRepository.deleteById(id);
    }

    public Integer countUsuarioActive() {

        return usuarioRepository.queryCountUsuarioActive();
    }

    public Integer countUsuarioInactive() {

        return usuarioRepository.queryCountUsuarioInactive();
    }

    public Integer countUsuarioAdmin() {

        return usuarioRepository.queryCountUsuarioAdmin();
    }

    public Integer countUsuarioRead() {

        return usuarioRepository.queryCountUsuarioRead();
    }
}
