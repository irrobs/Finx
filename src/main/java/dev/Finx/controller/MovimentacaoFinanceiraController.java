package dev.Finx.controller;

import dev.Finx.model.MovimentacaoFinanceira;
import dev.Finx.service.MovimentacaoFinanceiraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacao-financeira")
@CrossOrigin(origins = "http://localhost:4200")
public class MovimentacaoFinanceiraController {

    private final MovimentacaoFinanceiraService service;

    public MovimentacaoFinanceiraController(MovimentacaoFinanceiraService service) {
        this.service = service;
    }

    @GetMapping
    public List<MovimentacaoFinanceira> getAll() {
        return service.getAll();};

    @PostMapping
    public MovimentacaoFinanceira cadastrar(@RequestBody MovimentacaoFinanceira movimentacaoFinanceira) {
        return service.cadastrar(movimentacaoFinanceira);
    }
}
