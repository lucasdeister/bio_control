var modal = document.getElementById("myModal");

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

const validarPreenchimentoCamposForm = () =>{

    event.preventDefault();
    const nome =  document.querySelector('#nome').value.length;
    const idade =  document.querySelector('#idade').value.length;
    const email =  document.querySelector('#email').value.length;
    const telefone =  document.querySelector('#telefone').value.length;

    if(nome > 0 && (verificarCPF(campo_cpf)) && idade > 0 && email > 0 && telefone > 0){
        return true;
    }else{
        alert('Todos os campos devem ser preenchidos corretamente');
        return false;
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
            alert('Erro na requisição AJAX');
        }
    };
    xhr.send();
    return jaExiste;
}

document.getElementById('cadastrar_paciente').addEventListener('click', function() {

    let campos_preenchidos = validarPreenchimentoCamposForm();

    const cpfJaExiste = verificarExistenciaCPF();

    if(cpfJaExiste){
        alert("O CPF informado já existe na base de dados")
    }else{
        if(campos_preenchidos){
            var toastSucesso = document.getElementById('toastSucesso');
            var toast = document.createElement('div');
            toast.classList.add('toast');
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.setAttribute('aria-atomic', 'true');

            var toastHeader = document.createElement('div');
            toastHeader.classList.add('toast-header');

            var strong = document.createElement('strong');
            strong.classList.add('me-auto');
            strong.style.color = 'green';
            strong.textContent = 'Sucesso!';

            var toastBody = document.createElement('div');
            toastBody.classList.add('toast-body');
            toastBody.textContent = 'Paciente cadastrado com sucesso';

            toastHeader.appendChild(strong);

            toast.appendChild(toastHeader);
            toast.appendChild(toastBody);

            toastSucesso.appendChild(toast);

            var toastInstance = new bootstrap.Toast(toast);
            toastInstance.show();
            setTimeout(function () {
                toastInstance.hide();
                setTimeout(function () {
                    toast.remove();
                    document.getElementById('formCadastrarPacientes').submit();
                    fecharModalCriacao();
                }, 500);
            }, 1500);
        }
        else{
            alert('Favor preencher todos os dados corretamente');
        }
    }
});


//implementar renderização dinâmica dos elementos em js da listagem de pacientes
//fazer o update, delete e findall de pacientes