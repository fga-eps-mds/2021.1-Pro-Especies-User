import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import AuthUser from '../middleware/authUser';

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      await User.create(req.body);
      return res.status(200).json(req.body);
    } catch (error) {
      const { email, phone } = await req.body;
      if (await User.findOne({ email })) {
        return res.status(409).json({
          message: 'Email já cadastrado!',
        });
      }
      if (await User.findOne({ phone })) {
        return res.status(409).json({
          message: 'Número de telefone já cadastrado!',
        });
      }
      return res.status(400).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllUsers = async (res: Response) => {
    try {
      const data = await User.find({}, 'name email state city phone admin');
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  login = async (req: Request, res: Response) => {
    const { emailPhone, password } = req.body;
    const authenticateUser = new AuthUser();
    try {
      const user =
        (await User.findOne({ email: emailPhone }).select('+password')) ||
        (await User.findOne({ phone: emailPhone }).select('+password'));
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontado: Email ou telefone inválido!',
        });
      }

      if (!(await bcrypt.compare(password, user!.password))) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
      const token = await authenticateUser.generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
        admin: user.admin,
      });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Falha no sistema ao logar, tente novamente!' });
    }
  };
}
