function login() {

    var nome = document.getElementById("campo_nome").value;
    var senha = document.getElementById("campo_senha").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                window.location.href = "/listaPacientes.html";
            } else {
                exibirToast("Erro", "Login inválido. Por favor, tente novamente", "red");
            }
        }
    };
    var data = JSON.stringify({ "nome": nome, "senha": senha });
    xhr.send(data);
}
