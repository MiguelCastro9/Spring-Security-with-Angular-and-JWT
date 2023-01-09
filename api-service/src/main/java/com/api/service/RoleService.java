package com.api.service;

import com.api.enums.RoleNome;
import com.api.model.RoleModel;
import com.api.repository.RoleRepository;
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
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public Optional<RoleModel> getByRoleNome(RoleNome roleNome) {

        return roleRepository.findByRoleNome(roleNome);
    }

    public void save(RoleModel role) {

        roleRepository.save(role);
    }

    public List<RoleModel> listar() {

        return roleRepository.findAll();
    }

    public void inserir(Long usuarioId, Long roleId) {

        roleRepository.queryInsertRoles(usuarioId, roleId);
    }

    public void deletar(Long usuarioId) {

        roleRepository.queryDeleteRoles(usuarioId);
    }
}
