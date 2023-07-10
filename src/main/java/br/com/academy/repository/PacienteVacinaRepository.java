package br.com.academy.repository;

import br.com.academy.model.PacienteVacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteVacinaRepository extends JpaRepository<PacienteVacina, Long> {

    PacienteVacina findByPacienteIdAndVacinaId(Long pacienteId, Long vacinaId);

}
