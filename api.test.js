const request = require('supertest');
const api = request('https://demoqa.com');

let userId;
let token;
let credentials;

describe('Desafio API - Fluxo completo', () => {

  it('1 - Criar um usuário', async () => {
    credentials = {
      userName: 'flavio_' + Date.now(),
      password: 'Str0ng@Pass123'
    };

    const response = await api.post("/Account/v1/User").send(credentials);
    userId = response.body.userID;

    expect(response.status).toBe(201);
    expect(userId).toBeDefined();
  });

  it("2 - Gerar token de acesso", async () => {
    const response = await api.post("/Account/v1/GenerateToken").send(credentials);
    token = response.body.token;

    expect(response.status).toBe(200);
    expect(token).toBeDefined();
  });

  it("3 - Confirmar se o usuário está autorizado", async () => {
    const response = await api
      .post("/Account/v1/Authorized")
      .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toBe(true);
    });

  let selectedBooks = [];

  it("4 - Listar livros disponíveis", async () => {
    const response = await api
      .get("/BookStore/v1/Books")
      .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.books.length).toBeGreaterThanOrEqual(2);

      selectedBooks = [
        { isbn: response.body.books[0].isbn },
        { isbn: response.body.books[1].isbn }
      ];
  });

  it("5 - Alugar dois livros", async () => {
  const body = {
    userId: userId,
    collectionOfIsbns: selectedBooks
  };

  const response = await api
    .post("/BookStore/v1/Books")
    .set("Authorization", `Bearer ${token}`)
    .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("books");
    expect(response.body.books.length).toBe(2);
  });

  it("6 - Listar detalhes do usuário com livros alugados", async () => {
    const response = await api
      .get(`/Account/v1/User/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(userId);
    expect(response.body.books).toBeDefined();
    expect(response.body.books.length).toBe(2);
    expect(response.body.books[0].isbn).toBe(selectedBooks[0].isbn);
    expect(response.body.books[1].isbn).toBe(selectedBooks[1].isbn);
  });
});

