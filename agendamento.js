document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agendamento');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const email = document.getElementById('email').value;
            const data = document.getElementById('data').value;
            
            const especialidadeSelecionada = document.querySelector('input[name="especialidade"]:checked');

            if (!especialidadeSelecionada) {
                alert('Por favor, selecione uma especialidade.');
                return; 
            }
            
            const especialidade = especialidadeSelecionada.value;

            const dadosConsulta = { nome, cpf, email, especialidade, data };

            try {
                const response = await fetch('http://localhost:3001/api/consultas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosConsulta),
                });

                const resultado = await response.json();

                if (response.ok) {
                    alert(resultado.message);
                    form.reset(); // Limpa o formulário
                } else {
                    throw new Error(resultado.message || 'Erro ao marcar consulta.');
                }
            } catch (error) {
                console.error('Erro ao enviar agendamento:', error);
                alert(error.message);
            }
        });
    }
});