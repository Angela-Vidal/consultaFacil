const btnMarcar = document.getElementById('btn-marcar-consulta');
const buscaContainer = document.getElementById('busca-container');
const modalFundo = document.getElementById('modal-fundo');

btnMarcar.addEventListener('click', (e) => {
    e.preventDefault();
    buscaContainer.style.display = 'flex';
    modalFundo.style.display = 'block';
});

// Fecha ao clicar no fundo
modalFundo.addEventListener('click', () => {
    buscaContainer.style.display = 'none';
    modalFundo.style.display = 'none';
});
