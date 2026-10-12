package dev.Finx.service;

import dev.Finx.model.Categoria;
import dev.Finx.repository.CategoriaRepository;
import dev.Finx.model.Usuario;
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

    public List<Categoria> getAll(Usuario usuario) {
        return repository.findAllByUsuario_Id(usuario.getId());
    }

    public Categoria getById(Long id, Usuario usuario) {
        return repository.findByIdAndUsuario_Id(id, usuario.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
    }

    public Categoria cadastrar(Categoria categoria, Usuario usuario) {
        categoria.setUsuario(usuario);
        return repository.save(categoria);
    }

    public Categoria alterar(Long id, Categoria categoria, Usuario usuario) {
        Categoria categoriaExistente = getById(id, usuario);
        categoriaExistente.setNome(categoria.getNome());
        categoriaExistente.setTipo(categoria.getTipo());
        return repository.save(categoriaExistente);
    }

    public void deletar(Long id, Usuario usuario) {
        Categoria categoria = getById(id, usuario);
        repository.delete(categoria);
    }
}
