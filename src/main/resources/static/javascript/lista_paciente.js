var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModalEdicao");
var modal3 = document.getElementById("myModalAplicarVacina");

function atualizarAcaoFormulario() {
    var idPaciente = document.getElementById("id_paciente").value;
    var form = document.getElementById("formEditarPacientes");
    form.action = "/alterar/" + idPaciente;
    form.submit();
}

function exibirModalAplicarVacina(id){

    modal3.style.display = "block";

    var diaAtual = obterDataAtual();
    document.querySelector('#data_ultima_dose').value = diaAtual;

    document.querySelector('#id_paciente').value = id;
    document.querySelector('#id_paciente_aplicar_vacina').value = id;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/alterar/' + id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var paciente = JSON.parse(xhr.responseText);
            document.getElementById('nome_aplicar_vacina').value = paciente.nome;
        } else {
            console.error('Erro na requisição. Status: ' + xhr.status);
        }
    };
    xhr.send();

}

function fecharModalAplicarVacina(){
    limparCamposFormAplicarVacina();
    modal3.style.display = "none";
}

function exibirModalEdicao(id) {

    document.querySelector('#id_paciente').value = id;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/alterar/' + id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var paciente = JSON.parse(xhr.responseText);
            preencherCamposEdicao(paciente);
            modal2.style.display = "block";
        } else {
            console.error('Erro na requisição. Status: ' + xhr.status);
        }
    };
    xhr.send();
}

const preencherCamposEdicao = (paciente) =>{
    document.getElementById('nome_edicao').value = paciente.nome;
    document.getElementById('cpf_edicao').value = paciente.cpf;
    document.getElementById('idade_edicao').value = paciente.idade;
    document.getElementById('email_edicao').value = paciente.email;
    document.getElementById('telefone_edicao').value = paciente.telefone;

    if (paciente.sexo === 'm') {
        document.getElementById('masculino_edicao').checked = true;
    } else if (paciente.sexo === 'f') {
        document.getElementById('feminino_edicao').checked = true;
    }
}

function fecharModalEdicao() {
    modal2.style.display = "none";
}


function exibirModalCriacao() {
    limparCamposForm();
    marcarCampoSexo();
    limparCampoIdade();
    modal.style.display = "block";
}

function fecharModalCriacao() {
    modal.style.display = "none";
}

const inserirMascaraCpf = (v) =>{
    v=v.replace(/\D/g,"")
    v=v.replace(/(\d{3})(\d)/,"$1.$2")
    v=v.replace(/(\d{3})(\d)/,"$1.$2")
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    document.querySelector('#cpf').value = v;
}


function filtrarTabela() {

    var filtro = document.getElementById("btn_search").value.toUpperCase();

    var linhas = document.getElementsByTagName("tr");

    for (var i = 0; i < linhas.length; i++) {
        var colunaNome = linhas[i].getElementsByTagName("td")[0];
        var colunaCPF = linhas[i].getElementsByTagName("td")[1];

        if (colunaNome || colunaCPF) {
            var textoNome = colunaNome.innerText;
            var textoCPF = colunaCPF.innerText;

            if (textoNome.toUpperCase().indexOf(filtro) > -1 || textoCPF.toUpperCase().indexOf(filtro) > -1) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}

var botaoPesquisar = document.querySelector(".campo_pesquisa button");

botaoPesquisar.addEventListener("click", filtrarTabela);


const marcarCampoSexo = () =>{
    document.querySelector('#masculino').checked = true;
}


const limparCampoIdade = () =>{
    document.querySelector('#idade').value = '';
}

let campo_cpf =  document.querySelector('#cpf').value;

const validarPreenchimentoCamposForm = (i) =>{

    event.preventDefault();

    const nome =  document.querySelectorAll('.campo_nome')[i].value.length;
    const idade =  document.querySelectorAll('.campo_idade')[i].value;
    const email =  document.querySelectorAll('.campo_email')[i].value.length;
    const telefone =  document.querySelectorAll('.campo_telefone')[i].value.length;

    if(i==1) {//edicao
        if (nome > 0 && idade > 0 && email > 0 && telefone > 0) {
            return true;
        } else {
            return false;
        }
    }
        else{
            if (nome > 0 && (verificarCPF(campo_cpf)) && idade > 0 && email > 0 && telefone > 0) {
                return true;
            } else {
                return false;
            }
        }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    soma = 0;
    for (var j = 0; j < 10; j++) {
        soma += parseInt(cpf.charAt(j)) * (11 - j);
    }
    resto = 11 - (soma % 11);
    var digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

function verificarCPF() {
    var cpf = document.getElementById('cpf').value;

    var valido = validarCPF(cpf);
    if (valido) {
        return true;
    } else {
        return false;
    }
}

const limparCamposForm = () =>{
    document.querySelector('#formCadastrarPacientes').reset();
}

function verificarExistenciaCPF() {
    var cpf = document.getElementById('cpf').value;
    let jaExiste = false;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/verificarCPF?cpf=' + cpf, false);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const paciente = JSON.parse(xhr.responseText);
            if (paciente.ja_existe) {
                jaExiste = true;
            } else {
                jaExiste = false;
            }
        } else {
            exibirToast("Erro", "Erro na requisição AJAX", "red");
        }
    };
    xhr.send();
    return jaExiste;
}



document.getElementById('editar_paciente').addEventListener('click', function() {
    let campos_preenchidos = validarPreenchimentoCamposForm(1);

    if (campos_preenchidos) {
        exibirToast('Sucesso!', 'Paciente editado com sucesso', 'green');
        fecharModalEdicao();
        setTimeout(function() {
            atualizarAcaoFormulario();
        }, 1000);
    } else {
        exibirToast("Erro", "Favor preencher todos os dados corretamente", "red");
    }
});


document.getElementById('cadastrar_paciente').addEventListener('click', function() {
    let campos_preenchidos = validarPreenchimentoCamposForm(0);

    const cpfJaExiste = verificarExistenciaCPF();

    if (cpfJaExiste) {
        exibirToast("Erro", "O CPF informado já existe na base de dados", "red");
    } else {
        if (campos_preenchidos) {
            exibirToast('Sucesso!', 'Paciente cadastrado com sucesso', 'green');
            fecharModalCriacao();
            setTimeout(function() {
                document.getElementById('formCadastrarPacientes').submit();
            }, 1000);
        } else {
            exibirToast("Erro", "Favor preencher todos os dados corretamente", "red");
        }
    }
});

function excluirPaciente(id){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/excluir/' + id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            exibirToast('Sucesso!', 'Paciente excluído com sucesso', 'green');
            setTimeout(function () {
                location.reload();
            }, 1500);
        } else {
            console.error('Erro na requisição. Status: ' + xhr.status);
        }
    };
    xhr.send();
}

$(function() {
    $("#data_prox_dose").datepicker($.datepicker.regional["pt-BR"]);
});


function obterDataAtual() {
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    if(dia < 10){
        dia = '0' + dia;
    }
    var mes = dataAtual.getMonth() + 1;
    if(mes < 10){
        mes = '0' + mes;
    }
    var ano = dataAtual.getFullYear();
    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada;
}

function validarDataProximaDose(dataProximaDose) {
    var dataAtual = new Date();

    var data_aplicacao = document.querySelector('#data_ultima_dose').value;
    var data_prox = document.querySelector('#data_prox_dose').value;

    var dataProximaParts = dataProximaDose.split('/');
    var diaProxima = parseInt(dataProximaParts[0], 10);
    var mesProxima = parseInt(dataProximaParts[1], 10) - 1;
    var anoProxima = parseInt(dataProximaParts[2], 10);

    var dataProxima = new Date(anoProxima, mesProxima, diaProxima);

    if (dataProxima < dataAtual || data_aplicacao === data_prox) {
        exibirToast("Atenção", "A próxima dose deve ser maior do que a data atual", "red");
        document.querySelector('#data_prox_dose').value = '';
    }
}

function limparCamposFormAplicarVacina(){
    document.querySelector('#nome_aplicar_vacina').value = '';
    document.querySelector('#doses_aplicadas').value = '';
    document.querySelector('#doses_restantes').value = '';
    document.querySelector('#data_prox_dose').value = '';
    document.getElementById('vacina').selectedIndex = 0;
}



document.querySelector('#vacina').addEventListener("change", function() {

    preencherDadosFormulario();

});
function preencherDadosFormulario() {

    var idPaciente = document.getElementById('id_paciente').value;
    var idVacina = document.getElementById('vacina').value;

    fetch('/buscarDadosPacienteVacina?idPaciente=' + idPaciente + '&idVacina=' + idVacina)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro na requisição da tabela paciente_vacina: ' + response.status);
            }
            return response.text();
        })
        .then(function(text) {
            if (text.length > 0) {
                var data = JSON.parse(text);
                document.getElementById('doses_aplicadas').value = data.doses_aplicadas;
                fetch('/buscarDadosVacina?idVacina=' + idVacina)
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('Erro na requisição da tabela paciente_vacina: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(function(vacinaData) {
                        // Preencher o campo doses_restantes com o valor adequado
                        var dosesNecessarias = vacinaData.doses_necessarias;
                        var dosesAplicadas = document.getElementById('doses_aplicadas').value;
                        var dosesRestantes = dosesNecessarias - dosesAplicadas;
                        document.getElementById('doses_restantes').value = dosesRestantes;

                        if (dosesRestantes === 1 || dosesRestantes === 0)
                            document.getElementById('data_prox_dose').value = '';
                        else{
                            var recorrencia = vacinaData.recorrencia;
                            var dataAtual = new Date();
                            var recorrenciaEmDias = recorrencia;
                            var dataProximaDose = new Date(dataAtual.getTime() + recorrenciaEmDias * 24 * 60 * 60 * 1000);
                            var dataProximaDoseFormatada = formatDate(dataProximaDose);
                            document.getElementById('data_prox_dose').value = dataProximaDoseFormatada;
                        }
                    })
                    .catch(function(error) {
                        console.log('Erro na requisição da tabela vacina: ' + error);
                    });
            } else {
                // Não há associação correspondente, preencher os campos do formulário com valores padrão
                document.getElementById('doses_aplicadas').value = 0;

                fetch('/buscarDadosVacina?idVacina=' + idVacina)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(vacinaData) {
                        var dosesNecessarias = vacinaData.doses_necessarias;
                        document.getElementById('doses_restantes').value = dosesNecessarias;
                        if(dosesNecessarias == 1 || dosesNecessarias == 0){
                            document.getElementById('data_prox_dose').value = '';
                        }else{
                            var recorrencia = vacinaData.recorrencia;
                            var dataProximaDose = new Date();
                            dataProximaDose.setDate(dataProximaDose.getDate() + recorrencia);
                            document.getElementById('data_prox_dose').value = formatDate(dataProximaDose);
                        }
                    })
                    .catch(function(error) {
                        console.log('Erro na requisição da tabela vacina: ' + error);
                    });
            }
        })
        .catch(function(error) {
            console.log('Erro na requisição da tabela paciente_vacina: ' + error);
        });
}
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
}



function verificarDosesDisponiveis(idVacina) {
    return fetch('/buscarDadosVacina?idVacina=' + idVacina)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(function(vacina) {
            if (vacina.qtd > 0) {
                return true;
            } else {
                return false;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}


const validarSubmissaoFormAplicarVacina = async () => {
    const doses_necessarias = document.querySelector('#doses_restantes').value;
    const idVacina = document.getElementById('vacina').value;

    try {
        const dosesDisponiveis = await verificarDosesDisponiveis(idVacina);

        if (dosesDisponiveis && doses_necessarias > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('#vacinar_paciente').addEventListener("click", function() {

    event.preventDefault();

    validarSubmissaoFormAplicarVacina().then(async function (validouSubmissao) {
        if (validouSubmissao) {
            exibirToast("Sucesso", "Paciente vacinado com sucesso!", "green");
            setTimeout(function() {
                var form_aplicar_vacina = document.getElementById("formAplicarVacina");
                form_aplicar_vacina.submit();
            }, 1500);
        } else {
            exibirToast("Erro", "O paciente já foi imunizado ou o número de doses desta vacina está zerado", "red");
        }
    });
});





