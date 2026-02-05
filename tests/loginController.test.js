const loginController = require('../src/controllers/loginController');

describe('loginController', () => {
  it('deve retornar erro ao tentar login sem credenciais', async () => {
    // Simula uma requisição sem usuário e senha
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await loginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.any(String)
    }));
  });
});