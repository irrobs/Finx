package dev.Finx.controller;

import dev.Finx.model.Categoria;
import dev.Finx.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Categoria getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Categoria cadastrar(@RequestBody Categoria categoria) {
        return service.cadastrar(categoria);
    }

    @PutMapping("/{id}")
    public Categoria alterar(@PathVariable Long id, @RequestBody Categoria categoria) {
        return service.alterar(id, categoria);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
