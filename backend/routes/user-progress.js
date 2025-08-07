import express from 'express';
import UserProgressService from '../models/UserProgressSupabase.js';

const router = express.Router();

// @desc    Get user progress data
// @route   GET /api/user-progress
// @access  Private (will add auth middleware later)
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await UserProgressService.getUserProgress(userId);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
});

// @desc    Update user progress data
// @route   PUT /api/user-progress
// @access  Private
router.put('/', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await UserProgressService.updateUserProgress(userId, updateData);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error updating user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user progress',
      error: error.message
    });
  }
});

// @desc    Add new idea for validation
// @route   POST /api/user-progress/ideas
// @access  Private
router.post('/ideas', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const ideaData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await UserProgressService.addIdea(userId, ideaData);
    res.status(201).json(result);

  } catch (error) {
    console.error('Error adding idea:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding idea',
      error: error.message
    });
  }
});

// @desc    Complete a weekly goal
// @route   PUT /api/user-progress/goals/:goalId/complete
// @access  Private
router.put('/goals/:goalId/complete', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const goalId = req.params.goalId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await UserProgressService.completeGoal(userId, goalId);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error completing goal:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing goal',
      error: error.message
    });
  }
});

// @desc    Record AI interaction
// @route   POST /api/user-progress/ai-interaction
// @access  Private
router.post('/ai-interaction', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const interactionData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await UserProgressService.recordAIInteraction(userId, interactionData);
    res.status(201).json(result);

  } catch (error) {
    console.error('Error recording AI interaction:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording AI interaction',
      error: error.message
    });
  }
});

export default router;
