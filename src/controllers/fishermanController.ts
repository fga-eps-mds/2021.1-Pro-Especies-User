import { Request, Response } from "express";
import Fisherman from "../models/fishermanModel";

export default class FishermanController {
    createFisherman = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const fisherman = await Fisherman.create(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Falha ao criar usuário!",
            });
        }
    }

    getAllFisherman = async (req: Request, res: Response) => {
        try {
            const data = await Fisherman.find(
                {},
                "name email password state city telephone"
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