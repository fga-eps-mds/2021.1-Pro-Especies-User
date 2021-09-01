import jwt from 'jsonwebtoken';

export default class AuthUser {
  generateToken = async (data: object) =>
    jwt.sign(data, process.env.AUTH_CONFIG_SECRET as string, {
      expiresIn: '1d',
    });
}
