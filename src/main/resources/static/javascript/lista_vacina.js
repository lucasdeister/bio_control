var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModalEdicao");

function fecharModalEdicao() {
    modal2.style.display = "none";
}

function exibirModalCriacao() {
    modal.style.display = "block";
    limparCampoDias();
    limparCampoDosesNecessarias();
    limparCampoDosesDisponiveis();
}

function fecharModalCriacao() {
    modal.style.display = "none";
}

const preencherCamposEdicao = (vacina) =>{
    document.getElementById('nome_edicao').value = vacina.nome;
    document.getElementById('tipo_edicao').value = vacina.tipo;
    document.getElementById('prox_dose_edicao').value = vacina.recorrencia;
    document.getElementById('doses_min_edicao').value = vacina.doses_necessarias;
    document.getElementById('doses_qtd').value = vacina.qtd;
}

function exibirModalEdicao(id) {

    document.querySelector('#id_vacina').value = id;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/alterarVacina/' + id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var vacina = JSON.parse(xhr.responseText);
            preencherCamposEdicao(vacina);
            modal2.style.display = "block";
        } else {
            console.error('Erro na requisição. Status: ' + xhr.status);
        }
    };
    xhr.send();
}


const limparCampoDias = () =>{
    document.querySelector('#recorrenciaDias').value = '';
}


const limparCampoDosesNecessarias = () =>{
    document.querySelector('#doses_necessarias').value = '';
}


const limparCampoDosesDisponiveis = () =>{
    document.querySelector('#dosesDisponiveis').value = '';
}


function excluirVacina(id){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/excluirVacina/' + id);
    xhr.onload = function() {
        if (xhr.status === 200) {
            exibirToast('Sucesso!', 'Vacina excluída com sucesso', 'green');
            setTimeout(function () {
                location.reload();
            }, 1500);
        } else {
            console.error('Erro na requisição. Status: ' + xhr.status);
        }
    };
    xhr.send();
}

var botaoPesquisar = document.querySelector(".campo_pesquisa button");
botaoPesquisar.addEventListener("click", filtrarTabela);

function filtrarTabela() {

    var filtro = document.getElementById("btn_search").value.toUpperCase();

    var linhas = document.getElementsByTagName("tr");

    for (var i = 0; i < linhas.length; i++) {
        var colunaNome = linhas[i].getElementsByTagName("td")[0];
        var colunaTipo = linhas[i].getElementsByTagName("td")[1];

        if (colunaNome || colunaTipo) {
            var textoNome = colunaNome.innerText;
            var textoTipo = colunaTipo.innerText;

            if (textoNome.toUpperCase().indexOf(filtro) > -1 || textoTipo.toUpperCase().indexOf(filtro) > -1) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}
document.getElementById('cadastrar_vacina').addEventListener('click', function() {

    event.preventDefault();

    const nomeVacina = document.querySelector('#nome').value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/verificarVacinaExistente?nome=' + nomeVacina, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(xhr.responseText);
            if (data.ja_existe) {
                exibirToast("Erro", "Vacina já existe no banco de dados", "red");
            } else {
                let campos_preenchidos = validarPreenchimentoCamposForm();

                if (campos_preenchidos) {
                    exibirToast('Sucesso!', 'Vacina cadastrada com sucesso', 'green');
                    fecharModalCriacao();
                    setTimeout(function () {
                        document.getElementById('formCadastrarVacinas').submit();
                    }, 1000);
                } else {
                    exibirToast("Erro", "Favor preencher todos os dados corretamente", "red");
                }
            }
        } else {
            const errorMessage = 'Erro na requisição. Código: ' + xhr.status;
            console.error(errorMessage);
            exibirToast("Erro", "Erro na requisição", "red");
        }
    };

    xhr.onerror = function() {
        console.error('Erro na requisição');
        exibirToast("Erro", "Erro na requisição", "red");
    };

    xhr.send();
});





const validarPreenchimentoCamposForm = () =>{

    event.preventDefault();

    const nome =  document.querySelector('#nome').value.length;
    const tipo =  document.querySelector('#tipo').value.length;
    const dias_proxima_dose =  document.querySelector('#recorrenciaDias').value;
    const doses_necessarias =  document.querySelector('#doses_necessarias').value;
    const doses_disponiveis =  document.querySelector('#dosesDisponiveis').value;

    if (nome > 0 && tipo > 0 && dias_proxima_dose > -1 && doses_necessarias > 0 && doses_disponiveis > 0) {
        return true;
    } else {
        return false;
    }
}






