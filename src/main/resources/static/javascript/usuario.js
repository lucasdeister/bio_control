function validarCadastroUsuario(){

  event.preventDefault();

  const campo_nome =  document.querySelector('#campo_nome').value.length;
  const campo_senha =  document.querySelector('#campo_senha').value.length;

  if(campo_nome > 3 && campo_senha > 3){
    return true;
  }else{
    exibirToast("Erro", "Os campos nome e senha devem ter no mínimo 4 caracteres", "red");
    return false;
  }
}

document.getElementById('cadastrar_usuario').addEventListener('click', function() {

  let validouCadastro = validarCadastroUsuario();

  if(validouCadastro){

    const nomeUsuario = document.querySelector('#campo_nome').value;

    // Fazer requisição AJAX para verificar se o usuário já existe
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/verificarUsuarioExistente?nome=' + nomeUsuario, true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const usuario = JSON.parse(xhr.responseText);

        if (usuario.ja_existe) {
          exibirToast("Erro", "Usuário já existe no banco de dados", "red");
        } else {
          exibirToast("Sucesso!", "Usuário cadastrado com sucesso", "green");
          setTimeout(function() {
            document.getElementById('formCadastrar').submit();
          }, 1000);
        }
      }else{
        exibirToast("Erro", "Erro na requisição", "red");
      }
    };
    xhr.send();
  }
});