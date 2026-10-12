package dev.Finx.service;

import dev.Finx.model.SessaoUsuario;
import dev.Finx.model.Usuario;
import dev.Finx.repository.SessaoUsuarioRepository;
import dev.Finx.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Locale;

@Service
public class AutenticacaoService {

    private static final long DURACAO_SESSAO_SEGUNDOS = 86_400;
    private final UsuarioRepository usuarioRepository;
    private final SessaoUsuarioRepository sessaoRepository;
    private final SenhaService senhaService;
    private final SecureRandom secureRandom = new SecureRandom();

    public AutenticacaoService(UsuarioRepository usuarioRepository,
                               SessaoUsuarioRepository sessaoRepository,
                               SenhaService senhaService) {
        this.usuarioRepository = usuarioRepository;
        this.sessaoRepository = sessaoRepository;
        this.senhaService = senhaService;
    }

    public Usuario cadastrar(String nomeUsuario, String senha) {
        String usuarioNormalizado = normalizarUsuario(nomeUsuario);
        validarCredenciais(usuarioNormalizado, senha);
        if (usuarioRepository.existsByNomeUsuario(usuarioNormalizado)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuário já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(usuarioNormalizado);
        usuario.setSenhaHash(senhaService.gerarHash(senha));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public SessaoCriada autenticar(String nomeUsuario, String senha) {
        String usuarioNormalizado = normalizarUsuario(nomeUsuario);
        Usuario usuario = usuarioRepository.findByNomeUsuario(usuarioNormalizado)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos"));
        if (senha == null || !senhaService.validar(senha, usuario.getSenhaHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos");
        }

        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        Instant expiraEm = Instant.now().plusSeconds(DURACAO_SESSAO_SEGUNDOS);
        sessaoRepository.save(new SessaoUsuario(hashToken(token), usuario, expiraEm));
        return new SessaoCriada(token, usuario.getNomeUsuario(), expiraEm);
    }

    @Transactional(readOnly = true)
    public Usuario usuarioDaSessao(String token) {
        String tokenHash = hashToken(token);
        return sessaoRepository.findByTokenHashAndExpiraEmAfter(tokenHash, Instant.now())
                .map(SessaoUsuario::getUsuario)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sessão inválida ou expirada"));
    }

    @Transactional
    public void encerrar(String token) {
        String tokenHash = hashToken(token);
        if (!sessaoRepository.existsById(tokenHash)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sessão inválida ou expirada");
        }
        sessaoRepository.deleteById(tokenHash);
    }

    private String normalizarUsuario(String nomeUsuario) {
        return nomeUsuario == null ? "" : nomeUsuario.trim().toLowerCase(Locale.ROOT);
    }

    private void validarCredenciais(String nomeUsuario, String senha) {
        if (nomeUsuario.length() < 3 || nomeUsuario.length() > 50) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário deve ter entre 3 e 50 caracteres");
        }
        if (senha == null || senha.length() < 8 || senha.length() > 128) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha deve ter entre 8 e 128 caracteres");
        }
    }

    private String hashToken(String token) {
        try {
            byte[] hash = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 não está disponível", exception);
        }
    }

    public record SessaoCriada(String token, String usuario, Instant expiraEm) {
    }
}
