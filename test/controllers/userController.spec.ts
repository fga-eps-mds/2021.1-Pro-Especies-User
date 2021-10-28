import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import AuthUser from '../../src/middleware/authUser';
import UserController from '../../src/controllers/userController';
import User from '../../src/models/userModel';

const userController = new UserController();
const userMock = {
  _id: '3472417428',
  email: 'natan@gmail.com',
  password: '123',
  phone: '56565777',
  name: 'Jerson',
  state: 'Goias',
  city: 'Rio Verde',
  admin: true,
};
const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test Create User function', () => {
  beforeEach(() => {
    process.env = {
      RESEARCHER_CONFIRMATION_CODE: 'mockCode',
    };
  });

  it('Should get a statusCode 200 when create a user with the right data', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'natan@gmail.com',
      password: '123',
      phone: '56565777',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
      token: 'mockCode',
    };

    const response = mockResponse();
    User.findOne = jest.fn();
    jest
      .spyOn(User, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 409 if provided used email', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'natan@gmail.com',
      password: '123',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
      token: 'mockCode',
    };

    const response = mockResponse();
    User.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('should get a statusCode 409 if provided used phone', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      phone: '45645434',
      password: '123',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
      token: 'mockCode',
    };

    const response = mockResponse();
    User.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it('should get a statusCode 401 if provided researcher code is invalid', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      phone: '45645434',
      password: '123',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
      token: 'invalidCode',
    };

    const response = mockResponse();
    User.findOne = jest.fn();
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 400 if request failed', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'natan@gmail.com',
      password: '123',
      phone: '56565777',
      name: 'Jerson',
      state: 'Goias',
      city: 'Rio Verde',
      admin: true,
      token: 'mockCode',
    };

    const response = mockResponse();
    jest
      .spyOn(User, 'create')
      .mockImplementationOnce(() =>
        Promise.reject(Error('Usuário já existente!'))
      );
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('Test Get All Users function', () => {
  it('should get a statusCode 200 if request succeed', async () => {
    const response = mockResponse();
    User.find = jest.fn().mockResolvedValueOnce([userMock]);
    const res = await userController.getAllUsers(response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const response = mockResponse();
    User.find = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha na requisição!'))
      );
    const res = await userController.getAllUsers(response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Login function', () => {
  it('should get a statusCode 200 if login with the right data', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      emailPhone: 'batista@sugardaddy.com',
      password: '12345678',
    };

    const response = mockResponse();
    User.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
    jest
      .spyOn(AuthUser.prototype, 'generateToken')
      .mockImplementationOnce(() => 'mockToken');
    const res = await userController.login(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 401 if password is incorrect', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      emailPhone: 'batista@sugardaddy.com',
      password: '12345678',
    };

    const response = mockResponse();
    User.findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(userMock),
    }));
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
    const res = await userController.login(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      emailPhone: 'batista@sugardaddy.com',
      password: '12345678',
    };

    const response = mockResponse();
    User.findOne = jest.fn();
    const res = await userController.login(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
