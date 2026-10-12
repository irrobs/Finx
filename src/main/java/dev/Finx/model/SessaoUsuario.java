package dev.Finx.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "sessoes_usuario")
public class SessaoUsuario {

    @Id
    @Column(name = "token_hash", nullable = false, length = 64)
    private String tokenHash;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Instant expiraEm;

    public SessaoUsuario() {
    }

    public SessaoUsuario(String tokenHash, Usuario usuario, Instant expiraEm) {
        this.tokenHash = tokenHash;
        this.usuario = usuario;
        this.expiraEm = expiraEm;
    }

    public String getTokenHash() {
        return tokenHash;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Instant getExpiraEm() {
        return expiraEm;
    }
}
