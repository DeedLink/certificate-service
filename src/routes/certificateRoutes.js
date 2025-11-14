import express from 'express';
import * as controller from '../controllers/certificateController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.list);
router.get('/token/:tokenId', authMiddleware, controller.getByTokenId);
router.get('/:id', authMiddleware, controller.getById);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.remove);

export default router;