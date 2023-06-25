package br.com.academy.service;

import br.com.academy.repository.PacienteRepository;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public boolean verificarCpfExistente(String cpf) {
        return pacienteRepository.existsByCpf(cpf);
    }
}