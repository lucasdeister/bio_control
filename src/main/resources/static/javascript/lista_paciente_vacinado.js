function imprimirPagina() {
    window.print();
}

const celulasDataUltimaDose = document.querySelectorAll('.data_ultima_dose');

celulasDataUltimaDose.forEach(function(celula) {
    var data = celula.innerHTML;
    celula.innerHTML = converterData(data);
});

function converterData (data) {

    var partes = data.split('-');
    var dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];

    return dataFormatada;

}

var botaoPesquisar = document.querySelector(".campo_pesquisa button");
botaoPesquisar.addEventListener("click", filtrarTabela);

function filtrarTabela() {

    var filtro = document.getElementById("btn_search").value.toUpperCase();

    var linhas = document.getElementsByTagName("tr");

    for (var i = 0; i < linhas.length; i++) {
        var colunaNome = linhas[i].getElementsByTagName("td")[0];
        var colunaCPF = linhas[i].getElementsByTagName("td")[1];
        var colunaVacina = linhas[i].getElementsByTagName("td")[2];

        if (colunaNome || colunaCPF || colunaVacina) {
            var textoNome = colunaNome.innerText;
            var textoCPF = colunaCPF.innerText;
            var textoVacina = colunaVacina.innerText;

            if (textoNome.toUpperCase().indexOf(filtro) > -1 || textoCPF.toUpperCase().indexOf(filtro) > -1 || textoVacina.toUpperCase().indexOf(filtro) > -1) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}

