// Set up mongoose connection
import mongoose from 'mongoose';

import QuestionModel from './question-model.js';
import 'dotenv/config';

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion(params) {
    return new QuestionModel(params);
}

export async function deleteQuestion(params) {
    return QuestionModel.findOneAndDelete({ QuestionTitle: params });
}

export async function findQuestion(param) {
    return QuestionModel.findOne({ QuestionTitle: param });
}
