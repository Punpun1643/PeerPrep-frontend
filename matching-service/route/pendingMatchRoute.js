import express from 'express';
import pendingMatchController from '../controller/controller.js';

const router = express.Router();

router.post('/', pendingMatchController.addPendingMatch);
router.delete('/:id', pendingMatchController.deleteById);
router.get('/', pendingMatchController.findAllPendingMatches);
router.get('/:id', pendingMatchController.findPendingMatchById);
router.put('/:username', pendingMatchController.updatePendingMatchDifficulty);

// router.delete('/:username', pendingMatchController.deleteByUsername);
// router.get('/:username', pendingMatchController.findPendingMatchByUsername);

export default router;
