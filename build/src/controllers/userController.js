"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authUser_1 = __importDefault(require("../middleware/authUser"));
class UserController {
    createUser = async (req, res) => {
        try {
            const { email, phone } = await req.body;
            if ((await userModel_1.default.findOne({ email })) || (await userModel_1.default.findOne({ phone }))) {
                return res.status(409).json({
                    message: `${email ? 'Email' : 'Número de telefone'} já cadastrado`,
                });
            }
            await userModel_1.default.create(req.body);
            return res.status(200).json(req.body);
        }
        catch (error) {
            return res.status(400).json({
                message: 'Falha no sistema ao cadastrar, tente novamente!',
            });
        }
    };
    getAllUsers = async (res) => {
        try {
            const data = await userModel_1.default.find({}, 'name email state city phone admin');
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(500).json({
                message: 'Falha ao processar requisição',
            });
        }
    };
    login = async (req, res) => {
        const { emailPhone, password } = req.body;
        const authenticateUser = new authUser_1.default();
        try {
            const user = (await userModel_1.default.findOne({ email: emailPhone }).select('+password')) ||
                (await userModel_1.default.findOne({ phone: emailPhone }).select('+password'));
            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontado: Email ou telefone inválido!',
                });
            }
            if (!(await bcryptjs_1.default.compare(password, user.password))) {
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
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: 'Falha no sistema ao logar, tente novamente!' });
        }
    };
}
exports.default = UserController;
