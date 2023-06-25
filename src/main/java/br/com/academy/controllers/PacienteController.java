
package br.com.academy.controllers;

import br.com.academy.model.Paciente;
import br.com.academy.model.Usuario;
import br.com.academy.repository.PacienteRepository;
import br.com.academy.repository.UsuarioRepository;
import br.com.academy.service.PacienteService;
import org.apache.tomcat.util.modeler.BaseAttributeFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.Map;
import java.util.HashMap;

@Controller
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;


    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/verificarCPF")
    @ResponseBody
    public ResponseEntity<Map<String, Boolean>> verificarExistenciaCPF(@RequestParam("cpf") String cpfPaciente) {
        Map<String, Boolean> response = new HashMap<>();
        boolean ja_existe = pacienteService.verificarCpfExistente(cpfPaciente);
        response.put("ja_existe", ja_existe);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/inserirPacientes")
    public RedirectView cadastrarPaciente(@ModelAttribute("paciente") Paciente paciente) {

        String cpf = paciente.getCpf();

        if (pacienteService.verificarCpfExistente(cpf)) {
        }
        else{
            pacienteRepository.save(paciente);
        }
        RedirectView redirectView = new RedirectView("/listaPacientes.html");
        return redirectView;
    }

    @GetMapping("/listaPacientes.html")
    public String exibirPaginaPacientes(Model model) {
        model.addAttribute("paciente", new Paciente());
        return "listaPacientes";
    }

}