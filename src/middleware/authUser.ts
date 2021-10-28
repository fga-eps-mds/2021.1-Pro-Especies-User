import jwt from 'jsonwebtoken';

export default class AuthUser {
  generateToken(data: object) {
    return jwt.sign(data, process.env.AUTH_CONFIG_SECRET as string, {});
  }
}
