import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    emoji: { type: String, required: true },
    comment: { type: String },
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
