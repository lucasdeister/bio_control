package br.com.academy.repository;
import br.com.academy.model.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacinaRepository extends JpaRepository<Vacina, Long> {

    boolean existsByNome(String nomeVacina);

}