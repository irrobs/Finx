package dev.Finx.controller;

import dev.Finx.model.MovimentacaoFinanceira;
import dev.Finx.model.Usuario;
import dev.Finx.config.AutenticacaoInterceptor;
import dev.Finx.service.MovimentacaoFinanceiraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacao-financeira")
public class MovimentacaoFinanceiraController {

    private final MovimentacaoFinanceiraService service;

    public MovimentacaoFinanceiraController(MovimentacaoFinanceiraService service) {
        this.service = service;
    }

    @GetMapping
    public List<MovimentacaoFinanceira> getAll(
            @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.getAll(usuario);
    }

    @PostMapping
    public MovimentacaoFinanceira cadastrar(@RequestBody MovimentacaoFinanceira movimentacaoFinanceira,
                                            @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        return service.cadastrar(movimentacaoFinanceira, usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id,
                        @RequestAttribute(AutenticacaoInterceptor.USUARIO_AUTENTICADO) Usuario usuario) {
        service.deletar(id, usuario);
    }
}
