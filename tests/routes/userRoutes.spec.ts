import { Response, Request } from 'express';
import UserController from '../../src/controllers/userController';
import User from '../../src/models/userModel';

// const request = require('supertest');
// const userRoutes = require('../../src/routes/userRoutes');

const userController = new UserController();
const userMock = {
  _id: '3472417428',
  email: 'batista@sugardaddy.com',
  password: '12345678',
  phone: 'String',
  name: 'String',
  state: 'String',
  city: 'String',
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
  it('should get a statusCode 200', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      email: 'String',
      password: 'String',
      phone: 'String',
      name: 'String',
      state: 'String',
      city: 'String',
      admin: true,
    };

    const response = mockResponse();
    jest
      .spyOn(User, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await userController.createUser(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('Test Get All Users function', () => {
  it('should get a statusCode 200', async () => {
    const response = mockResponse();
    // jest.spyOn(User, "find").mockResolvedValue([userMock])
    User.find = jest.fn().mockResolvedValueOnce([userMock]);
    const res = await userController.getAllUsers(response);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('Test Login function', () => {
  it('should get a statusCode 200', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      emailPhone: 'batista@sugardaddy.com',
      password: '12345678',
    };

    const response = mockResponse();
    User.findOne = jest.fn().mockResolvedValueOnce([userMock]);
    const res = await userController.login(mockRequest, response);
    console.log(res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
