import { Request, Response } from "express";
import User from "../models/userModel";

export default class UserController {
    createUser = async (req: Request, res: Response) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Falha ao criar usuário!",
            });
        }
    }

    getAllUser = async (req: Request, res: Response) => {
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