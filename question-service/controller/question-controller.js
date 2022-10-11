import {
    ormCreateQuestion as _createQuestion,
    ormCheckQuestionExists as _checkQuestionExists,
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
