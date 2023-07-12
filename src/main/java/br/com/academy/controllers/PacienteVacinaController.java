package br.com.academy.controllers;

import br.com.academy.model.Paciente;
import br.com.academy.model.PacienteVacina;
import br.com.academy.model.Vacina;
import br.com.academy.repository.PacienteRepository;
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
    private final PacienteRepository pacienteRepository;

    public PacienteVacinaController(PacienteVacinaRepository pacienteVacinaRepository, VacinaRepository vacinaRepository, PacienteRepository pacienteRepository) {
        this.pacienteVacinaRepository = pacienteVacinaRepository;
        this.vacinaRepository = vacinaRepository;
        this.pacienteRepository = pacienteRepository;
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
        Vacina vacina = vacinaRepository.findById(idVacina).orElse(null);
        return vacina;
    }


    @PostMapping("/inserirAssociacao")
    public String salvarAssociacao(@RequestParam("id_paciente_aplicar_vacina") Long idPaciente, PacienteVacina associacao) {
        Paciente paciente = pacienteRepository.findById(idPaciente).orElse(null);
        Long idVacina = associacao.getVacina().getId();
        Vacina vacina = vacinaRepository.findById(idVacina).orElse(null);

        if (paciente != null && vacina != null) {
            // Verificar se já existe um registro para o paciente e a vacina
            PacienteVacina existente = pacienteVacinaRepository.findByPacienteAndVacina(paciente, vacina);

            if (existente != null) {
                // Atualizar os dados do registro existente
                existente.setDoses_aplicadas(existente.getDoses_aplicadas() + 1);
                existente.setData_ultima_dose(associacao.getData_ultima_dose());
                existente.setData_prox_dose(associacao.getData_prox_dose());
                pacienteVacinaRepository.save(existente);
            } else {
                // Criar um novo registro
                associacao.setPaciente(paciente);
                associacao.setDoses_aplicadas(1);
                pacienteVacinaRepository.save(associacao);
            }

            int quantidade = vacina.getQtd();
            vacina.setQtd(quantidade - 1);
            vacinaRepository.save(vacina);

            return "redirect:/listaPacientes.html";
        } else {
            return "redirect:/erro.html";
        }
    }
}
