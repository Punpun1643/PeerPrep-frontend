import mongoose from 'mongoose';

const { Schema } = mongoose;
const QuestionModelSchema = new Schema({
    QuestionTitle: {
        type: String,
        required: true,
        unique: true,
    },
    QuestionBody: {
        type: String,
        required: true,
    },
    QuestionDifficulty: {
        type: String,
        required: true,
    },
});

export default mongoose.model('QuestionModel', QuestionModelSchema);
