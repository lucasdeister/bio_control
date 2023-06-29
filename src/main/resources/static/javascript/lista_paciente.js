var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModalEdicao");



function atualizarAcaoFormulario() {
    var idPaciente = document.getElementById("id_paciente").value;
    var form = document.getElementById("formEditarPacientes");
    form.action = "/alterar/" + idPaciente;
    form.submit();
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

    var filtro = document.getElementById("form1").value.toUpperCase();

    var linhas = document.getElementsByTagName("tr");

    for (var i = 0; i < linhas.length; i++) {
        var colunaNome = linhas[i].getElementsByTagName("td")[0];
        var colunaCPF = linhas[i].getElementsByTagName("td")[1];

        if (colunaNome || colunaCPF) {
            var textoNome = colunaNome.textContent || colunaNome.innerText;
            var textoCPF = colunaCPF.textContent || colunaCPF.innerText;

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



const exibirToast = (titulo, texto, color) => {
    var toast_principal = document.createElement('div');
    toast_principal.id = 'toast_principal';
    toast_principal.setAttribute('aria-live', 'polite');
    toast_principal.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toast_principal);

    var toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');

    var toastHeader = document.createElement('div');
    toastHeader.classList.add('toast-header');

    var strong = document.createElement('strong');
    strong.classList.add('me-auto');
    strong.style.color = color;
    strong.textContent = titulo;

    var toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.textContent = texto;

    toastHeader.appendChild(strong);

    toast.appendChild(toastHeader);
    toast.appendChild(toastBody);

    toast_principal.appendChild(toast);

    var toastInstance = new bootstrap.Toast(toast);
    toastInstance.show();
    setTimeout(function () {
        toastInstance.hide();
        setTimeout(function () {
            toast.remove();
        }, 500);
    }, 1500);
};


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