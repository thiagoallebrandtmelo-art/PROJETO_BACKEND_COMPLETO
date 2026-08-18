const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const caminhoBD = path.join(__dirname, 'bancoDeDadosFalso.json');

function lerBD() {
    const dados = fs.readFileSync(caminhoBD, 'utf-8');
    return JSON.parse(dados);
}

function salvarBD(dados) {
    fs.writeFileSync(caminhoBD, JSON.stringify(dados, null, 2));
}

// ROTA 1: Listar produtos
app.get('/produtos', (req, res) => {
    const produtos = lerBD();
    res.json(produtos);
});

// ROTA 2: Cadastrar produto
app.post('/produtos', (req, res) => {
    const { nome, preco, quantidade } = req.body;

    // Validações no Back-End
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ erro: 'Nome é obrigatório.' });
    }
    if (isNaN(preco) || Number(preco) <= 0) {
        return res.status(400).json({ erro: 'Preço deve ser maior que zero.' });
    }
    if (isNaN(quantidade) || Number(quantidade) < 0) {
        return res.status(400).json({ erro: 'Quantidade não pode ser negativa.' });
    }

    const produtos = lerBD();

    // ID Automático
    const proximoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;

    const novoProduto = {
        id: proximoId,
        nome: nome.trim(),
        preco: Number(preco),
        quantidade: Number(quantidade)
    };

    produtos.push(novoProduto);
    salvarBD(produtos);

    res.status(201).json(novoProduto);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});