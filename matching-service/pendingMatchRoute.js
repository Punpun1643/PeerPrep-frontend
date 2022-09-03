import express from 'express';
import pendingMatchController from './controller.js';

const router = express.Router();

router.post('/', pendingMatchController.addPendingMatch);
router.delete('/:username', pendingMatchController.deleteByUsername);

export default router;
