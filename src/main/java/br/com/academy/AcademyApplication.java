package br.com.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
}

//possibilitar a geração de relatório de vacinas por paciente, baseado na tabela de associação
//Proteger para que não seja possível excluir alguma vacina, caso esta esteja vinculada em algum paciente