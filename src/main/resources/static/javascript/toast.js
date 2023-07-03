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