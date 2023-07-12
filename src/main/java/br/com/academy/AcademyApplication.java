package br.com.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
}

//possibilitar a geração de relatório de vacinas por paciente, baseado na tabela paciente_vacina
//Proteger para que não seja possível excluir alguma vacina, caso esta esteja vinculada em algum paciente
//proteger para que caso seja removido um paciente do banco, ele remova todos os registros de vacina daquele paciente na tabela paciente_vacina