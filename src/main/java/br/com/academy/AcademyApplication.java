package br.com.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
}

/*
* Impedir a submissão do formulário caso:

-O número de doses necessárias para aplicar a vacina naquele paciente seja 0
-O número de doses disponíveis da vacina selecionada seja 0

O que ele vai ter que fazer quando tentar aplicar alguma vacina em algum paciente
*
* Verificar se a data de próxima dose for vazia, se for então deve gravar a data de próxima dose como 01/01/1989
*
*update na tabela paciente_vacina, incrementando em um o número de doses aplicadas daquela vacina naquele paciente
*update na tabela paciente_vacina, atualizando a data de última dose com a data da aplicação da vacina
*update na tabela vacina, decrementando em um o número de qtd de doses disponíveis daquela vacina
* */

//possibilitar a emissão de comprovante da vacina tomada
//possibilitar a geração de relatório de vacinas por paciente baseado na tabela de associação
//Proteger para que não seja possível excluir alguma vacina, caso esta esteja vinculada em algum paciente