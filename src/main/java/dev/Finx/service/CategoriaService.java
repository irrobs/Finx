package dev.Finx.service;

import dev.Finx.model.Categoria;
import dev.Finx.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> getAll() {
        return repository.findAll();
    }

    public Categoria getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
    }

    public Categoria cadastrar(Categoria categoria) {
        return repository.save(categoria);
    }

    public Categoria alterar(Long id, Categoria categoria) {
        Categoria categoriaExistente = getById(id);
        categoriaExistente.setNome(categoria.getNome());
        categoriaExistente.setTipo(categoria.getTipo());
        return repository.save(categoriaExistente);
    }

    public void deletar(Long id) {
        Categoria categoria = getById(id);
        repository.delete(categoria);
    }
}
