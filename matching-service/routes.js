// global route for matching-service
// yes, global routes don't need controller

import express from 'express';
import pendingMatchRoutes from './route/pendingMatchRoute.js';

const router = express.Router();

router.use('/pendingMatches', pendingMatchRoutes);

export default router;
