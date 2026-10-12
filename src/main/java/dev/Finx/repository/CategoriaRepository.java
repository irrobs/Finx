package dev.Finx.repository;

import dev.Finx.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findAllByUsuario_Id(Long usuarioId);

    Optional<Categoria> findByIdAndUsuario_Id(Long id, Long usuarioId);
}
