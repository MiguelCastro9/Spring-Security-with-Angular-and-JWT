package com.api.jwt;

import com.api.model.UsuarioPrincipal;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 *
 * @author Miguel Castro
 */
//Classe que vai gerar o token.
@Component
public class JwtProvider {

    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    public String gerarToken(Authentication authentication) {

        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
        return Jwts.builder().setSubject(usuarioPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String getEmailToken(String token) {

        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validarToken(String token) {

        try {

            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);

            return true;

        } catch (MalformedJwtException malformedJwtException) {

            logger.error("Token mal formatado.");

        } catch (UnsupportedJwtException unsupportedJwtException) {

            logger.error("Token não suportado.");

        } catch (ExpiredJwtException expiredJwtException) {

            logger.error("Token expirado.");

        } catch (IllegalArgumentException illegalArgumentException) {

            logger.error("Token vazio.");

        } catch (SignatureException signatureException) {

            logger.error("Token falhou na assinatura.");

        }

        return false;
    }
}
