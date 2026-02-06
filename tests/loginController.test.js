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

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      msg: expect.any(String)
    }));
  });
  it('deve retornar erro se o e-mail não estiver cadastrado', async () => {
    const req = { body: { email: 'naoexiste@email.com', senha: '12345678' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    // Mock do método checkEmailExists para simular usuário não encontrado
    jest.spyOn(require('../src/models/usuarioModelo'), 'checkEmailExists').mockResolvedValue(false);

    await loginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String)
    }));
  });

  it('deve retornar erro se a senha estiver incorreta', async () => {
    const req = { body: { email: 'teste@email.com', senha: 'senhaerrada' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    // Mock do método checkEmailExists para simular usuário encontrado
    jest.spyOn(require('../src/models/usuarioModelo'), 'checkEmailExists').mockResolvedValue({ senha: 'senha_correta_hash' });
    // Mock do bcrypt.compare para simular senha incorreta
    jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(false);

    await loginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      msg: expect.any(String)
    }));
  });

  it('deve autenticar com sucesso se e-mail e senha estiverem corretos', async () => {
    const req = { body: { email: 'teste@email.com', senha: 'senha_correta' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    // Mock do método checkEmailExists para simular usuário encontrado
    jest.spyOn(require('../src/models/usuarioModelo'), 'checkEmailExists').mockResolvedValue({ senha: 'senha_correta_hash', _id: 1 });
    // Mock do bcrypt.compare para simular senha correta
    jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);
    // Mock do process.env.SECRET
    process.env.SECRET = 'segredo';
    // Mock do jwt.sign
    jest.spyOn(require('jsonwebtoken'), 'sign').mockReturnValue('token_falso');

    await loginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      msg: expect.any(String),
      token: 'token_falso'
    }));
  });
});