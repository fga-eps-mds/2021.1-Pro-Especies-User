import { Request, Response } from "express";
import User from "../models/userModel";

export default class UserController {
    createUser = async (req: Request, res: Response) => {
        try {
            await User.create(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            const {email, phone} = await req.body;
            if (await User.findOne({ email })) {
                return res.status(409).json({
                    message: "Email já cadastrado!",
                });
            } else if(await User.findOne({ phone })){
                return res.status(409).json({
                    message: "Número de telefone já cadastrado!",
                });
            } 
            else {
                return res.status(400).json({
                    message: "Falha no sistema ao cadastrar, tente novamente!",
                });
            }
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const data = await User.find(
                {},
                "name email state city phone admin"
            );
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Falha ao processar requisição",
            });
        }
    }
}