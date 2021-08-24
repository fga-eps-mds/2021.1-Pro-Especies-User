import { Router } from 'express';
// Rotas
import fishermanRoutes from './fishermanRoutes';

const router = Router();

router.use('/fisherman', fishermanRoutes);

export default router;
