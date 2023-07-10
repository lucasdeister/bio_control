package br.com.academy.controllers;

import br.com.academy.model.Paciente;
import br.com.academy.model.Vacina;
import br.com.academy.repository.VacinaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class VacinaController {

    @Autowired
    private VacinaRepository vacinaRepository;

    @PostMapping("/inserirVacinas")
    public RedirectView cadastrarVacina(@ModelAttribute("vacina") Vacina vacina) {
        vacinaRepository.save(vacina);

        RedirectView redirectView = new RedirectView("/listaVacinas.html");
        return redirectView;
    }

    @GetMapping("/verificarVacinaExistente")
    @ResponseBody
    public ResponseEntity<Map<String, Boolean>> verificarVacinaExistente(@RequestParam("nome") String nVacina) {
        Map<String, Boolean> response = new HashMap<>();
        boolean ja_existe = vacinaRepository.existsByNome(nVacina);
        response.put("ja_existe", ja_existe);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/listaVacinas.html")
    public String exibirPaginaVacinas(Model model) {
        model.addAttribute("vacina", new Vacina());
        model.addAttribute("vacinaList", vacinaRepository.findAll());
        return "listaVacinas";
    }

    @GetMapping("/gerenciarQtdVacina/{id}")
    @ResponseBody
    public ResponseEntity<String> gerenciarQtdVacinaGet(@PathVariable("id") Long id, Model model) {
        try {
            Vacina vacina = vacinaRepository.getReferenceById(id);
            model.addAttribute("vacina", vacina);
            if (vacina != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

                String vacinaJson = objectMapper.writeValueAsString(vacina);

                return ResponseEntity.ok(vacinaJson);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/alterarVacina/{id}")
    @ResponseBody
    public ResponseEntity<String> alterarVacinaGet(@PathVariable("id") Long id, Model model) {
        try {
            Vacina vacina = vacinaRepository.getReferenceById(id);
            model.addAttribute("vacina", vacina);
            if (vacina != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

                String vacinaJson = objectMapper.writeValueAsString(vacina);

                return ResponseEntity.ok(vacinaJson);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/excluirVacina/{id}")
    public RedirectView excluirVacina(@PathVariable("id") Long id){
        vacinaRepository.deleteById(id);
        RedirectView redirectView = new RedirectView("/listaVacinas.html");
        return redirectView;
    }

    @PostMapping("/alterarQtd")
    public RedirectView alterarQuantidadeVacina(@ModelAttribute("vacina") Vacina vacina, @RequestParam("qtd_alteracao") int quantidadeAlteracao, @RequestParam("opcao") String opcao) {
        Vacina vacinaAtualizada = vacinaRepository.findById(vacina.getId()).orElse(null);
        if (vacinaAtualizada != null) {
            int quantidadeAtual = vacinaAtualizada.getQtd();

            if ("inc".equals(opcao)) {
                vacinaAtualizada.setQtd(quantidadeAtual + quantidadeAlteracao);
            } else if ("dec".equals(opcao)) {
                vacinaAtualizada.setQtd(quantidadeAtual - quantidadeAlteracao);
            }

            vacinaRepository.save(vacinaAtualizada);
        }

        RedirectView redirectView = new RedirectView("/listaVacinas.html");
        return redirectView;
    }

}
