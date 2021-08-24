import { Request, Response, Router } from "express";
import FishermanController from "../controllers/fishermanController";

const fishermanRoutes = Router();

const fishermanController = new FishermanController();

fishermanRoutes.post('/', (req: Request, res: Response) => {
    fishermanController.createFisherman(req, res);
});

fishermanRoutes.get('/', (req: Request, res: Response) => {
    fishermanController.getAllFisherman(req, res);
});

export default fishermanRoutes;
