import {
    ormCreateQuestion as _createQuestion,
    ormCheckQuestionExists as _checkQuestionExists,
    ormFindQuestion,
} from '../model/question-orm.js';

export async function createQuestion(req, res, next) {
    try {
        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when creating new Question!' });
    }
}

export async function deleteQuestion(req, res, next) {
    try {
        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when deleting Question!' });
    }
}

export async function retrieveQuestion(req, res) {
    try {
        const level = req.query.level;
        console.log(level)
        const qn = await ormFindQuestion(level);
        return res.status(200).json({ message: `Successfully retrieved ${level} question!`, question: qn});
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when retrieving question!' });
    }
}
