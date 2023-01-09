package com.api.repository;

import com.api.enums.RoleNome;
import com.api.model.RoleModel;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Miguel Castro
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {

    Optional<RoleModel> findByRoleNome(RoleNome roleNome);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO usuario_role (usuario_id, role_id) VALUES (:usuarioId, :roleId)", nativeQuery = true)
    public void queryInsertRoles(@Param("usuarioId") Long usuarioId, @Param("roleId") Long roleId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM usuario_role WHERE usuario_id = :usuarioId", nativeQuery = true)
    public void queryDeleteRoles(@Param("usuarioId") Long usuarioId);
}
