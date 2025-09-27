# Desafio Automação API - DemoQA

Este projeto realiza testes automatizados na API do [DemoQA](https://demoqa.com) utilizando **Supertest** e **Jest**, cobrindo o fluxo completo de criação de usuário, geração de token, autorização, listagem de livros, aluguel e validação de registros.

---

## 🔹 Funcionalidades Testadas

1. Criar um usuário dinamicamente.
2. Gerar token de acesso.
3. Validar se o usuário está autorizado.
4. Listar livros disponíveis.
5. Alugar dois livros.
6. Validar detalhes do usuário com livros alugados.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** → Ambiente de execução.
- **Supertest** → Requisições HTTP para testes de API.
- **Jest** → Framework de testes e asserções.
- **DemoQA API** → Ambiente de teste público.

---

## ▶️ Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
npm test
