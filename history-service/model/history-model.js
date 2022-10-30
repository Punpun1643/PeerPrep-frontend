import mongoose from 'mongoose';

const { Schema } = mongoose;
const HistoryModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    records: {
        type: [{ 
            questionTitle: {
                type: String,
                unique: true,
            },
            questionDifficulty: String
         }],
        required: true,
    }
});

export default mongoose.model('HistoryModel', HistoryModelSchema);
