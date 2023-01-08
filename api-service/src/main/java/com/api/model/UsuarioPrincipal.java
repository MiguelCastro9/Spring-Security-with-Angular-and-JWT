package com.api.model;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author Miguel Castro
 */
public class UsuarioPrincipal implements UserDetails {

    private String nome;

    private String email;

    private String senha;

    private boolean status;

    private Collection<? extends GrantedAuthority> authorities;

    public UsuarioPrincipal(String nome, String email, String senha, boolean status, Collection<? extends GrantedAuthority> authorities) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.status = status;
        this.authorities = authorities;
    }

    //Convertendo a entidade usuario em 'GrantedAuthority' e passando os privilégios de cada usuário.
    public static UsuarioPrincipal build(UsuarioModel usuarioModel) {

        //Obtendo uma lista de 'GrantedAuthority' através de uma role.
        List<GrantedAuthority> authorities = usuarioModel.getRoles().stream().map(
                role -> new SimpleGrantedAuthority(role.getRoleNome().name())).collect(Collectors.toList());

        return new UsuarioPrincipal(usuarioModel.getNome(), usuarioModel.getEmail(), usuarioModel.getSenha(), usuarioModel.isStatus(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }

    @Override
    public String getPassword() {

        return senha;
    }

    @Override
    public String getUsername() {

        return email;
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return status;
    }

    public String getNome() {
        return nome;
    }

}
