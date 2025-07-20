import express from 'express';
import Test from '../models/Test.js';

const router = express.Router();

// Create a new test (for admin / seeding)
router.post('/create', async (req, res) => {
    try {
        const { title, questions, duration } = req.body;
        const test = new Test({ title, questions, duration });
        await test.save();
        res.status(201).json({ message: 'Test created successfully', test });
    } catch (error) {
        res.status(500).json({ message: 'Error creating test', error: error.message });
    }
});

// Get a test
router.get('/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test', error: error.message });
    }
});

export default router;
