package br.com.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
	public static void main(String[] args) {
		SpringApplication.run(AcademyApplication.class, args);
	}
}


//Na tela de aplicar vacina só serão carregadas vacinas que tiverem o número de doses superior a 0
//Na hr de aplicar a vacina eu só carrego as vacinas que ele não terminou de se imunizar, ou que ainda nem tomou.
//Ou seja se tiver uma vacina que eram necessárias 3 doses e ele já tomou as 3 doses, então está vacina não será carregada para a seleção
//verificar como criar a tabela de associação entre paciente e vacina
//criar modal para a aplicação da vacina
//possibilitar a emissão de comprovante da vacina tomada
//possibilitar a geração de relatório de vacinas por paciente baseado na tabela de associação
//Proteger para que não seja possível excluir alguma vacina, caso esta esteja vinculada em algum paciente