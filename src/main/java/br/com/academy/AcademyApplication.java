package br.com.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
}


//criar modal para incremento e decremento da vacina
//criar rotina para atualização baseado nesta alteração de quantidade
//verificar como criar a tabela de associação entre paciente e vacina
//criar modal para a aplicação da vacina
//possibilitar a emissão de comprovante da vacina tomada
//possibilitar a geração de relatório de vacinas por paciente baseado na tabela de associação
//Proteger para que não seja possível excluir alguma vacina, caso esta esteja vinculada em algum paciente