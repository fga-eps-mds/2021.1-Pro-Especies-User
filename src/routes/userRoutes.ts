import { Request, Response, Router } from "express";
import UserController from "../controllers/userController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', (req: Request, res: Response) => {
    userController.createUser(req, res);
});

userRoutes.get('/', (req: Request, res: Response) => {
    userController.getAllUsers(req, res);
});

export default userRoutes;
