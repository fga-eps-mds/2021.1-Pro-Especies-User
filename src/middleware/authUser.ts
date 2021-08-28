import jwt from 'jsonwebtoken';

export default class AuthUser {
  generateToken = async (data: object) =>
    jwt.sign(data, 'secret', { expiresIn: '1d' });
}
