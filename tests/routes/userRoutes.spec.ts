import { Response } from 'express';
import UserController from '../../src/controllers/userController';
import User from '../../src/models/userModel';

// const request = require('supertest');
// const userRoutes = require('../../src/routes/userRoutes');

const userController = new UserController();
const userMock = {
  _id: '3472417428',
  email: 'String',
  password: 'String',
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

describe('Test userController', () => {
  it('should get create a user', async () => {
    const response = mockResponse();
    jest
      .spyOn(User, 'create')
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
    const res = await userController.createUser(
      {
        email: 'String',
        password: 'String',
        phone: 'String',
        name: 'String',
        state: 'String',
        city: 'String',
        admin: true,
      },
      response
    );
    console.log(res);
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.body).toHaveProperty('name');
  });

  it('should get all users', async () => {
    const response = mockResponse();
    // jest.spyOn(User, "find").mockResolvedValue([userMock])
    User.find = jest.fn().mockResolvedValueOnce([userMock]);
    const res = await userController.getAllUsers(response);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
