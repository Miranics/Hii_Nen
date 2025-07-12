const express = require('express');
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

module.exports = router;
