function validarCadastroUsuario(){

  event.preventDefault();

  const campo_nome =  document.querySelector('#campo_nome').value.length;
  const campo_senha =  document.querySelector('#campo_senha').value.length;

  if(campo_nome > 3 && campo_senha > 3){
    return true;
  }else{
    alert('Os campos nome e senha devem ter no mínimo 4 caracteres');
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
          alert('Usuário já existe no banco de dados. Não é possível cadastrar novamente.');
        } else {
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
          toastBody.textContent = 'Usuário cadastrado com sucesso';

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
              document.getElementById('formCadastrar').submit();
            }, 500);
          }, 1500);
        }
      }else{
          alert('Erro na requisição AJAX');
        }
    };
    xhr.send();
  }
});
