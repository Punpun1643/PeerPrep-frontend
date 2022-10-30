import express from 'express';
import cors from 'cors';
import { getRecord, storeRecord } from './controller/history-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());

const router = express.Router();

router.get('/:username', getRecord);
router.put('/:username', storeRecord);

app.use('/api/history', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8003, () => console.log('history-service listening on port 8003'));
