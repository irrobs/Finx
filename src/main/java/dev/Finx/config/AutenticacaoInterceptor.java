package dev.Finx.config;

import dev.Finx.model.Usuario;
import dev.Finx.service.AutenticacaoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.cors.CorsUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AutenticacaoInterceptor implements HandlerInterceptor {

    public static final String USUARIO_AUTENTICADO = "usuarioAutenticado";
    private final AutenticacaoService service;

    public AutenticacaoInterceptor(AutenticacaoService service) {
        this.service = service;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (CorsUtils.isPreFlightRequest(request)) {
            return true;
        }

        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ") || authorization.length() <= 7) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        try {
            Usuario usuario = service.usuarioDaSessao(authorization.substring(7));
            request.setAttribute(USUARIO_AUTENTICADO, usuario);
            return true;
        } catch (ResponseStatusException exception) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }
}
