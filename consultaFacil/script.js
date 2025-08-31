// ----- BUSCAR CONSULTAS(Sidebar) -----
const btnBuscar = document.querySelector('.btn-buscar');
const buscaContainer = document.getElementById('busca-container');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultadoBusca = document.getElementById('resultadoBusca');

// Alterna exibição do buscador na sidebar
btnBuscar.addEventListener('click', () => {
    if (buscaContainer.style.display === 'none' || buscaContainer.style.display === '') {
        buscaContainer.style.display = 'flex';
    } else {
        buscaContainer.style.display = 'none';
    }
});

// Pesquisa simulada
btnPesquisar.addEventListener('click', () => {
    const nome = document.getElementById('nomeBusca').value.trim();
    if(nome) {
        resultadoBusca.textContent = `Resultado para: ${nome}`;
    } else {
        resultadoBusca.textContent = 'Digite um nome ou CPF para pesquisar.';
    }
});

// ----- MODAL MARCAR CONSULTA -----
const btnMarcar = document.getElementById('btn-marcar-consulta');
const modalFundo = document.getElementById('modal-fundo');

btnMarcar.addEventListener('click', (e) => {
    e.preventDefault();
    buscaContainer.style.display = 'flex'; // também abre o buscador se quiser
    modalFundo.style.display = 'block';
});

// Fecha ao clicar no fundo do modal
modalFundo.addEventListener('click', () => {
    buscaContainer.style.display = 'none'; // fecha buscador junto
    modalFundo.style.display = 'none';
});

function atualizarImagem() {
    const img = document.getElementById("designImg");
    if (!img) return;

    // Ajuste do breakpoint para celular
    if(window.innerWidth <= 768) { 
        img.src = "assets/designConsultaFacil2.JPG"; // versão mobile
    } else {
        img.src = "assets/designConsultaFacil.JPG"; // versão desktop
    }
}

// Executa após o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", atualizarImagem);

// Atualiza ao redimensionar a janela
window.addEventListener("resize", atualizarImagem);
