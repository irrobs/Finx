package dev.Finx.service;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class SenhaService {

    private static final int ITERACOES = 310_000;
    private static final int TAMANHO_SALT = 16;
    private static final int TAMANHO_HASH = 256;
    private final SecureRandom secureRandom = new SecureRandom();

    public String gerarHash(String senha) {
        byte[] salt = new byte[TAMANHO_SALT];
        secureRandom.nextBytes(salt);
        byte[] hash = derivar(senha.toCharArray(), salt);
        return ITERACOES + ":" + Base64.getEncoder().encodeToString(salt) + ":"
                + Base64.getEncoder().encodeToString(hash);
    }

    public boolean validar(String senha, String hashArmazenado) {
        String[] partes = hashArmazenado.split(":", 3);
        if (partes.length != 3) {
            return false;
        }
        try {
            int iteracoes = Integer.parseInt(partes[0]);
            byte[] salt = Base64.getDecoder().decode(partes[1]);
            byte[] hashEsperado = Base64.getDecoder().decode(partes[2]);
            byte[] hashRecebido = derivar(senha.toCharArray(), salt, iteracoes, hashEsperado.length * 8);
            return MessageDigest.isEqual(hashEsperado, hashRecebido);
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }

    private byte[] derivar(char[] senha, byte[] salt) {
        return derivar(senha, salt, ITERACOES, TAMANHO_HASH);
    }

    private byte[] derivar(char[] senha, byte[] salt, int iteracoes, int tamanhoBits) {
        PBEKeySpec spec = new PBEKeySpec(senha, salt, iteracoes, tamanhoBits);
        try {
            return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Não foi possível processar a senha", exception);
        } finally {
            spec.clearPassword();
        }
    }
}
