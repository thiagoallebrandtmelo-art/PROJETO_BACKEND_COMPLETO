const form = document.getElementById('meuFormulario');
const tabela = document.getElementById('tabelaCorpo');

// Buscar produtos e colocar na tabela (GET)
async function carregarProdutos() {
    const resposta = await fetch('/produtos');
    const produtos = await resposta.json();

    tabela.innerHTML = '';

    produtos.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.nome}</td>
            <td>R$ ${prod.preco.toFixed(2)}</td>
            <td>${prod.quantidade}</td>
        `;
        tabela.appendChild(tr);
    });
}

// Enviar formulário ao servidor (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        preco: document.getElementById('preco').value,
        quantidade: document.getElementById('quantidade').value
    };

    const resposta = await fetch('/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        form.reset();
        carregarProdutos();
    } else {
        const erro = await resposta.json();
        alert(erro.erro);
    }
});

// Executa ao abrir a página
carregarProdutos();