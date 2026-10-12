package dev.Finx.repository;

import dev.Finx.model.MovimentacaoFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface MovimentacaoFinanceiraRepository extends JpaRepository<MovimentacaoFinanceira, Long> {
    List<MovimentacaoFinanceira> findAllByUsuario_Id(Long usuarioId);

    Optional<MovimentacaoFinanceira> findByIdAndUsuario_Id(Long id, Long usuarioId);
}
