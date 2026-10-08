package dev.Finx.service;

import dev.Finx.model.MovimentacaoFinanceira;
import dev.Finx.repository.CategoriaRepository;
import dev.Finx.repository.MovimentacaoFinanceiraRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MovimentacaoFinanceiraService {

    private final MovimentacaoFinanceiraRepository repository;
    private final CategoriaRepository categoriaRepository;

    public MovimentacaoFinanceiraService(MovimentacaoFinanceiraRepository repository,
                                         CategoriaRepository categoriaRepository) {
        this.repository = repository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<MovimentacaoFinanceira> getAll() {return repository.findAll();}

    public MovimentacaoFinanceira cadastrar(MovimentacaoFinanceira movimentacaoFinanceira) {
        if (movimentacaoFinanceira.getCategoria() == null || movimentacaoFinanceira.getCategoria().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria é obrigatória");
        }
        Long categoriaId = movimentacaoFinanceira.getCategoria().getId();
        movimentacaoFinanceira.setCategoria(categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada")));
        return repository.save(movimentacaoFinanceira);
    }

    public void deletar(Long id) {repository.deleteById(id);}
}
