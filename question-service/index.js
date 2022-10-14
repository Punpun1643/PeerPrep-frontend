import express from 'express';
import cors from 'cors';
import { retrieveQuestion } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());

const router = express.Router();

router.get('/', retrieveQuestion)

app.use('/api/questions', router).all((_, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8002, () => console.log('user-service listening on port 8002'));
