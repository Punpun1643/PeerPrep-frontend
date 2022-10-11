import { createQuestion, deleteQuestion, findQuestion } from './repository.js';

// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateQuestion(QuestionTitle, QuestionBody, QuestionDiffficulty) {
    try {
        const newQuestion = await createQuestion({ QuestionTitle, QuestionBody, QuestionDiffficulty });
        newQuestion.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new Question');
        return { err };
    }
}

export async function ormDeleteQuestion(QuestionTitle) {
    try {
        const deletedQuestion = await deleteQuestion(QuestionTitle);
        console.log(deletedQuestion);
        if (deletedQuestion) {
            return true;
        }
        return false;
    } catch (err) {
        console.log('ERROR: Could not delete Question');
        return { err };
    }
}

export async function ormUpdateQuestion(Question, changes) {
    try {
        const { QuestionTitle, QuestionBody, QuestionDiffficulty } = changes;
        const updatedQuestion = Question;
        updatedQuestion.QuestionTitle = QuestionTitle;
        updatedQuestion.QuestionBody = QuestionBody;
        updatedQuestion.QuestionDiffficulty = QuestionDiffficulty;
        updatedQuestion.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not update Question');
        return { err };
    }
}

export async function ormFindQuestion(QuestionTitle) {
    try {
        const Question = await findQuestion(QuestionTitle);
        console.log(Question);
        return Question;
    } catch (err) {
        console.log('ERROR: Could not find Question');
        return { err };
    }
}

export async function ormCheckQuestionExists(QuestionTitle) {
    try {
        const Question = await ormFindQuestion(QuestionTitle);
        console.log(Question);
        if (Question) {
            return true;
        }
        return false;
    } catch (err) {
        console.log('ERROR: Could not check for Question');
        return { err };
    }
}
