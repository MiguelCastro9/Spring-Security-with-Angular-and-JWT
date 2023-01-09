package com.api.repository;

import com.api.model.UsuarioModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Miguel Castro
 */
@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
    
    Optional<UsuarioModel> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query(value = "SELECT COUNT(id) FROM usuario_model WHERE status = 1", nativeQuery = true)
    public Integer queryCountUsuarioActive();
    
    @Query(value = "SELECT COUNT(id) FROM usuario_model WHERE status = 0", nativeQuery = true)
    public Integer queryCountUsuarioInactive();
    
    @Query(value = "SELECT COUNT(id) FROM usuario_model WHERE role_valor = 1", nativeQuery = true)
    public Integer queryCountUsuarioAdmin();
    
    @Query(value = "SELECT COUNT(id) FROM usuario_model WHERE role_valor = 2", nativeQuery = true)
    public Integer queryCountUsuarioRead();
}
