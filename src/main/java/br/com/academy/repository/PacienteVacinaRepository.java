package br.com.academy.repository;

import br.com.academy.model.Paciente;
import br.com.academy.model.PacienteVacina;
import br.com.academy.model.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteVacinaRepository extends JpaRepository<PacienteVacina, Long> {

    PacienteVacina findByPacienteIdAndVacinaId(Long pacienteId, Long vacinaId);

    PacienteVacina findByPacienteAndVacina(Paciente paciente, Vacina vacina);
}
