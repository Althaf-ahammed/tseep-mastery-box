import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
    try {
        const { userId, emoji, comment } = req.body;
        if (!userId || !emoji) {
            return res.status(400).json({ message: "User ID and emoji are required." });
        }

        const feedback = new Feedback({ userId, emoji, comment });
        await feedback.save();

        res.status(201).json({ message: "Feedback submitted successfully.", feedback });
    } catch (error) {
        res.status(500).json({ message: "Error submitting feedback.", error: error.message });
    }
});

// (Optional) Get all feedback for admin review
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback.", error: error.message });
    }
});

export default router;
