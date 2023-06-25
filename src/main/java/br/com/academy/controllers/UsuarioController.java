package br.com.academy.controllers;

import br.com.academy.model.Usuario;
import br.com.academy.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/inserirUsuarios")
    public RedirectView cadastrarUsuario(@ModelAttribute("usuario") Usuario usuario) {
        usuarioRepository.save(usuario);
        RedirectView redirectView = new RedirectView("/");
        return redirectView;
    }

    @GetMapping("/usuario.html")
    public String exibirPaginaUsuario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario";
    }

    @GetMapping("/verificarUsuarioExistente")
    @ResponseBody
    public ResponseEntity<Map<String, Boolean>> verificarUsuarioExistente(@RequestParam("nome") String nomeUsuario) {
        Map<String, Boolean> response = new HashMap<>();
        boolean ja_existe = usuarioRepository.existsByNome(nomeUsuario);
        response.put("ja_existe", ja_existe);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> fazerLogin(@RequestBody Usuario usuario) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuarioExistente = usuarioRepository.findByNome(usuario.getNome());
        if (usuarioExistente != null && usuarioExistente.getSenha().equals(usuario.getSenha())) {
            response.put("success", true);
        } else {
            response.put("success", false);
        }
        return response;
    }
}
