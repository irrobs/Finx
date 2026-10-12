package dev.Finx.controller;

import dev.Finx.model.Categoria;
import dev.Finx.model.Usuario;
import dev.Finx.config.AutenticacaoInterceptor;
import dev.Finx.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> getAll(@RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.getAll(usuario);
    }

    @GetMapping("/{id}")
    public Categoria getById(@PathVariable Long id,
                             @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.getById(id, usuario);
    }

    @PostMapping
    public Categoria cadastrar(@RequestBody Categoria categoria,
                               @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.cadastrar(categoria, usuario);
    }

    @PutMapping("/{id}")
    public Categoria alterar(@PathVariable Long id, @RequestBody Categoria categoria,
                             @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.alterar(id, categoria, usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id,
                        @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        service.deletar(id, usuario);
    }
}
