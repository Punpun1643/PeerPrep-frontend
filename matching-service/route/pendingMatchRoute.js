import express from 'express';
import pendingMatchController from '../controller/controller.js';

const router = express.Router();

router.post('/', pendingMatchController.addPendingMatch);
router.delete('/:username', pendingMatchController.deleteByUsername);
router.get('/', pendingMatchController.findAllPendingMatches);
router.get('/:username', pendingMatchController.findPendingMatchByUsername);
router.put('/:username', pendingMatchController.updatePendingMatchDifficulty);

export default router;
