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
    @JoinColumn(name = "id_paciente_aplicar_vacina")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_vacina")
    private Vacina vacina;

    public int getDoses_aplicadas() {
        return doses_aplicadas;
    }

    public void setDoses_aplicadas(int doses_aplicadas) {
        this.doses_aplicadas = doses_aplicadas;
    }

    @Column(name = "doses_aplicadas")
    private int doses_aplicadas;

    @Column(name = "data_ultima_dose")
    private LocalDate data_ultima_dose;

    @Column(name = "data_prox_dose")
    private LocalDate data_prox_dose;

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

    public LocalDate getData_prox_dose() {
        return data_prox_dose;
    }

    public void setData_prox_dose(LocalDate data_prox_dose) {
        this.data_prox_dose = data_prox_dose;
    }

    public LocalDate getData_ultima_dose() {return data_ultima_dose;}

    public void setData_ultima_dose(LocalDate data_ultima_dose) {this.data_ultima_dose = data_ultima_dose;}
}


