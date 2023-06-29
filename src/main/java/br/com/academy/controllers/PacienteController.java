
package br.com.academy.controllers;

import br.com.academy.model.Paciente;
import br.com.academy.repository.PacienteRepository;
import br.com.academy.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

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

        if (pacienteService.verificarCpfExistente(cpf) == false) {
            pacienteRepository.save(paciente);
        }
        RedirectView redirectView = new RedirectView("/listaPacientes.html");
        return redirectView;
    }

    @GetMapping("/listaPacientes.html")
    public String exibirPaginaPacientes(Model model) {
        model.addAttribute("paciente", new Paciente());
        model.addAttribute("pacienteList", pacienteRepository.findAll());
        return "listaPacientes";
    }



    @GetMapping("/alterar/{id}")
    @ResponseBody
    public ResponseEntity<String> alterar(@PathVariable("id") Long id, Model model) {
        try {
            Paciente paciente = pacienteRepository.getReferenceById(id);
            model.addAttribute("paciente", paciente);
            if (paciente != null) {
                // Configurar o ObjectMapper para ignorar a propriedade hibernateLazyInitializer
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

                // Converter o objeto Paciente em JSON
                String pacienteJson = objectMapper.writeValueAsString(paciente);

                return ResponseEntity.ok(pacienteJson);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/alterar/{id}")
    public RedirectView alterar(@PathVariable("id") Long id, @ModelAttribute("paciente") Paciente paciente){
        pacienteRepository.save(paciente);
        RedirectView redirectView = new RedirectView("/listaPacientes.html");
        return redirectView;
    }


    @GetMapping("/excluir/{id}")
    public RedirectView excluirPaciente(@PathVariable("id") Long id){
        pacienteRepository.deleteById(id);
        RedirectView redirectView = new RedirectView("/listaPacientes.html");
        return redirectView;
    }
}
