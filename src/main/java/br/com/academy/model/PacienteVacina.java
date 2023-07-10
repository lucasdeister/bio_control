package br.com.academy.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "paciente_vacina")
public class PacienteVacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_vacina")
    private Vacina vacina;

    @Column(name = "doses_aplicadas")
    private int dosesAplicadas;

    @Column(name = "data_ultima_dose")
    private LocalDate dataUltimaDose;

    @Column(name = "data_prox_dose")
    private LocalDate dataProximaDose;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Vacina getVacina() {
        return vacina;
    }

    public void setVacina(Vacina vacina) {
        this.vacina = vacina;
    }

    public int getDosesAplicadas() {
        return dosesAplicadas;
    }

    public void setDosesAplicadas(int dosesAplicadas) {
        this.dosesAplicadas = dosesAplicadas;
    }

    public LocalDate getDataUltimaDose() {
        return dataUltimaDose;
    }

    public void setDataUltimaDose(LocalDate dataUltimaDose) {
        this.dataUltimaDose = dataUltimaDose;
    }

    public LocalDate getDataProximaDose() {
        return dataProximaDose;
    }

    public void setDataProximaDose(LocalDate dataProximaDose) {
        this.dataProximaDose = dataProximaDose;
    }
}
