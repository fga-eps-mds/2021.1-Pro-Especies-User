import { Router } from 'express';
// Rotas
import userRoutes from './userRoutes';

const router = Router();

router.use('/user', userRoutes);

export default router;
