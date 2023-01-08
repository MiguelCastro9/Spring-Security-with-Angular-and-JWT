package com.api.service;

import com.api.model.UsuarioModel;
import com.api.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Miguel Castro
 */
@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Optional<UsuarioModel> getEmail(String email) {

        return usuarioRepository.findByEmail(email);
    }

    public boolean existsEmail(String email) {

        return usuarioRepository.existsByEmail(email);
    }

    public void save(UsuarioModel usuarioModel) {

        usuarioRepository.save(usuarioModel);
    }

    public List<UsuarioModel> list() {

        return usuarioRepository.findAll();
    }
    
    public void edit(UsuarioModel usuarioModel) {
        
        usuarioRepository.saveAndFlush(usuarioModel);
    }
    
    public void delete(Long id) {
        
        usuarioRepository.deleteById(id);
    }
    
    public UsuarioModel findId(Long id) {
        
        return usuarioRepository.getReferenceById(id);
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
