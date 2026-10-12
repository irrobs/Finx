package dev.Finx.controller;

import dev.Finx.model.Usuario;
import dev.Finx.service.AutenticacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private final AutenticacaoService service;

    public AutenticacaoController(AutenticacaoService service) {
        this.service = service;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResposta cadastrar(@RequestBody Credenciais credenciais) {
        Usuario usuario = service.cadastrar(credenciais.usuario(), credenciais.senha());
        return new UsuarioResposta(usuario.getNomeUsuario());
    }

    @PostMapping("/login")
    public AutenticacaoService.SessaoCriada autenticar(@RequestBody Credenciais credenciais) {
        return service.autenticar(credenciais.usuario(), credenciais.senha());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void encerrar(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token de sessão obrigatório");
        }
        service.encerrar(authorization.substring(7));
    }

    public record Credenciais(String usuario, String senha) {
    }

    public record UsuarioResposta(String usuario) {
    }
}
