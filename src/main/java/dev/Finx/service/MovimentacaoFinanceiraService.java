package dev.Finx.service;

import dev.Finx.model.MovimentacaoFinanceira;
import dev.Finx.repository.MovimentacaoFinanceiraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentacaoFinanceiraService {

    private final MovimentacaoFinanceiraRepository repository;

    public MovimentacaoFinanceiraService(MovimentacaoFinanceiraRepository repository) {
        this.repository = repository;
    }

    public List<MovimentacaoFinanceira> getAll() {return repository.findAll();}

    public MovimentacaoFinanceira cadastrar(MovimentacaoFinanceira movimentacaoFinanceira) {
        return repository.save(movimentacaoFinanceira);
    }

    public void deletar(Long id) {repository.deleteById(id);}
}
