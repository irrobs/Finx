package dev.Finx.repository;

import dev.Finx.model.SessaoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface SessaoUsuarioRepository extends JpaRepository<SessaoUsuario, String> {
    Optional<SessaoUsuario> findByTokenHashAndExpiraEmAfter(String tokenHash, Instant instante);
}
