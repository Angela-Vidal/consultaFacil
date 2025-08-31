// ----- BUSCAR CONSULTAS(Sidebar) -----
const btnBuscar = document.querySelector('.btn-buscar');
const buscaContainer = document.getElementById('busca-container');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultadoBusca = document.getElementById('resultadoBusca');
const nomeBuscaInput = document.getElementById('nomeBusca');

// Alterna exibição do buscador na sidebar
btnBuscar.addEventListener('click', () => {
    if (buscaContainer.style.display === 'none' || buscaContainer.style.display === '') {
        buscaContainer.style.display = 'flex';
    } else {
        buscaContainer.style.display = 'none';
    }
});

btnPesquisar.addEventListener('click', async () => {
    const termo = nomeBuscaInput.value.trim();

    if (!termo) {
        resultadoBusca.textContent = 'Digite um nome ou CPF para pesquisar.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/consultas/search?q=${termo}`);
        
        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro.message || 'Erro ao buscar consultas.');
        }

        const consultas = await response.json();

        resultadoBusca.innerHTML = ''; 

        if (consultas.length > 0) {
            consultas.forEach(consulta => {
                const dataFormatada = new Date(consulta.data_consulta).toLocaleDateString('pt-BR');
                const p = document.createElement('p');
                p.textContent = `Paciente: ${consulta.nome} - Especialidade: ${consulta.nome_especialidade} - Data: ${dataFormatada}`;
                resultadoBusca.appendChild(p);
            });
        } else {
            resultadoBusca.textContent = `Nenhum resultado encontrado para: ${termo}`;
        }

    } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        resultadoBusca.textContent = 'Erro no servidor ao buscar consultas.';
    }
});
/*
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
*/
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
