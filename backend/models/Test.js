import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
    duration: { type: Number, required: true }, // in minutes
});

export default mongoose.model('Test', testSchema);
