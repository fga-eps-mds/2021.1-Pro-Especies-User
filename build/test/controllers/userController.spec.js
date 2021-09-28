"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authUser_1 = __importDefault(require("../../src/middleware/authUser"));
const userController_1 = __importDefault(require("../../src/controllers/userController"));
const userModel_1 = __importDefault(require("../../src/models/userModel"));
const userController = new userController_1.default();
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
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.sendStatus = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};
describe('Test Create User function', () => {
    it('Should get a statusCode 200 when create a user with the right data', async () => {
        const mockRequest = {};
        mockRequest.body = {
            email: 'natan@gmail.com',
            password: '123',
            phone: '56565777',
            name: 'Jerson',
            state: 'Goias',
            city: 'Rio Verde',
            admin: true,
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn();
        jest
            .spyOn(userModel_1.default, 'create')
            .mockImplementationOnce(() => Promise.resolve({ id: 1 }));
        const res = await userController.createUser(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should get a statusCode 409 if provided used email', async () => {
        const mockRequest = {};
        mockRequest.body = {
            email: 'natan@gmail.com',
            password: '123',
            name: 'Jerson',
            state: 'Goias',
            city: 'Rio Verde',
            admin: true,
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn().mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userMock),
        }));
        const res = await userController.createUser(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(409);
    });
    it('should get a statusCode 409 if provided used phone', async () => {
        const mockRequest = {};
        mockRequest.body = {
            phone: '45645434',
            password: '123',
            name: 'Jerson',
            state: 'Goias',
            city: 'Rio Verde',
            admin: true,
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn().mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userMock),
        }));
        const res = await userController.createUser(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(409);
    });
    it('should get a statusCode 400 if request failed', async () => {
        const mockRequest = {};
        mockRequest.body = {
            email: 'natan@gmail.com',
            password: '123',
            phone: '56565777',
            name: 'Jerson',
            state: 'Goias',
            city: 'Rio Verde',
            admin: true,
        };
        const response = mockResponse();
        jest
            .spyOn(userModel_1.default, 'create')
            .mockImplementationOnce(() => Promise.reject(Error('Usuário já existente!')));
        const res = await userController.createUser(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
describe('Test Get All Users function', () => {
    it('should get a statusCode 200 if request succeed', async () => {
        const response = mockResponse();
        userModel_1.default.find = jest.fn().mockResolvedValueOnce([userMock]);
        const res = await userController.getAllUsers(response);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should get a statusCode 500 if request failed', async () => {
        const response = mockResponse();
        userModel_1.default.find = jest
            .fn()
            .mockImplementationOnce(() => Promise.reject(Error('Falha na requisição!')));
        const res = await userController.getAllUsers(response);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
describe('Test Login function', () => {
    it('should get a statusCode 200 if login with the right data', async () => {
        const mockRequest = {};
        mockRequest.body = {
            emailPhone: 'batista@sugardaddy.com',
            password: '12345678',
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn().mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userMock),
        }));
        jest.spyOn(bcryptjs_1.default, 'compare').mockImplementationOnce(() => true);
        jest
            .spyOn(authUser_1.default.prototype, 'generateToken')
            .mockImplementationOnce(() => 'mockToken');
        const res = await userController.login(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should get a statusCode 401 if password is incorrect', async () => {
        const mockRequest = {};
        mockRequest.body = {
            emailPhone: 'batista@sugardaddy.com',
            password: '12345678',
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn().mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userMock),
        }));
        jest.spyOn(bcryptjs_1.default, 'compare').mockImplementationOnce(() => false);
        const res = await userController.login(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(401);
    });
    it('should get a statusCode 500 if request failed', async () => {
        const mockRequest = {};
        mockRequest.body = {
            emailPhone: 'batista@sugardaddy.com',
            password: '12345678',
        };
        const response = mockResponse();
        userModel_1.default.findOne = jest.fn();
        const res = await userController.login(mockRequest, response);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
