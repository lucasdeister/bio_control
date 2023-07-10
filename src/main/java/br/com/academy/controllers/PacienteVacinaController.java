package br.com.academy.controllers;

import br.com.academy.model.PacienteVacina;
import br.com.academy.model.Vacina;
import br.com.academy.repository.PacienteVacinaRepository;
import br.com.academy.repository.VacinaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PacienteVacinaController {
    private final PacienteVacinaRepository pacienteVacinaRepository;
    private final VacinaRepository vacinaRepository;

    public PacienteVacinaController(PacienteVacinaRepository pacienteVacinaRepository, VacinaRepository vacinaRepository) {
        this.pacienteVacinaRepository = pacienteVacinaRepository;
        this.vacinaRepository = vacinaRepository;
    }

    @GetMapping("/buscarDadosPacienteVacina")
    @ResponseBody
    public PacienteVacina buscarDadosPacienteVacina(@RequestParam("idPaciente") Long idPaciente, @RequestParam("idVacina") Long idVacina) {
        PacienteVacina pacienteVacina = pacienteVacinaRepository.findByPacienteIdAndVacinaId(idPaciente, idVacina);
        return pacienteVacina;
    }

    @GetMapping("/buscarDadosVacina")
    @ResponseBody
    public Vacina buscarDadosVacina(@RequestParam("idVacina") Long idVacina) {
        // Implemente a lógica para buscar os dados da tabela vacina com base no ID da vacina
        Vacina vacina = vacinaRepository.findById(idVacina).orElse(null);
        return vacina;
    }

    @PostMapping("/inserirAssociacao")
    public String salvarAssociacao(PacienteVacina associacao) {
        System.out.println("xpto");
        pacienteVacinaRepository.save(associacao);
        return "redirect:/listaPacientes.html";
    }

}
