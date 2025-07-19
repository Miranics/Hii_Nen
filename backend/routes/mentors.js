import express from 'express';
const router = express.Router();

// @desc    Get mentors
// @route   GET /api/mentors
// @access  Private
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Mentors endpoint - Coming soon!',
    features: ['Mentor Matching', 'Expert Connections', 'Industry Specialists']
  });
});

export default router;
