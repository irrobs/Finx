package dev.Finx.repository;

import dev.Finx.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByNomeUsuario(String nomeUsuario);

    Optional<Usuario> findByNomeUsuario(String nomeUsuario);
}
