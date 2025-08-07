const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Dashboard Stats
  stats: {
    ideasValidated: {
      type: Number,
      default: 0
    },
    businessScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    networkConnections: {
      type: Number,
      default: 0
    },
    fundingReadiness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },

  // User's Ideas and Validation Progress
  ideas: [{
    title: String,
    description: String,
    industry: String,
    stage: {
      type: String,
      enum: ['concept', 'validation', 'mvp', 'launch', 'growth'],
      default: 'concept'
    },
    validationScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    marketSize: String,
    competitors: [String],
    targetAudience: String,
    uniqueValueProposition: String,
    revenueModel: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],

  // Mentorship and Learning Progress
  mentorship: {
    sessionsCompleted: {
      type: Number,
      default: 0
    },
    topicsDiscussed: [String],
    currentFocus: String,
    mentorFeedback: [{
      topic: String,
      feedback: String,
      rating: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },

  // Business Planning Progress
  businessPlan: {
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    sections: {
      executiveSummary: { completed: Boolean, lastUpdated: Date },
      marketAnalysis: { completed: Boolean, lastUpdated: Date },
      competitiveAnalysis: { completed: Boolean, lastUpdated: Date },
      marketingPlan: { completed: Boolean, lastUpdated: Date },
      operationsPlan: { completed: Boolean, lastUpdated: Date },
      financialProjections: { completed: Boolean, lastUpdated: Date }
    }
  },

  // Funding Journey
  funding: {
    currentStage: {
      type: String,
      enum: ['pre-seed', 'seed', 'series-a', 'series-b', 'later-stage'],
      default: 'pre-seed'
    },
    targetAmount: Number,
    amountRaised: {
      type: Number,
      default: 0
    },
    investors: [{
      name: String,
      type: String, // angel, vc, accelerator
      amount: Number,
      date: Date
    }],
    pitchDeckScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },

  // Weekly Goals and Tasks
  weeklyGoals: [{
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    completedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // AI Interaction History
  aiInteractions: [{
    topic: String,
    question: String,
    response: String,
    insights: [String],
    recommendations: [String],
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],

  // Network and Connections
  network: {
    mentors: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    peers: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    investors: [{
      name: String,
      company: String,
      stage: String,
      contactInfo: String
    }]
  },

  // Activity Timeline
  activities: [{
    type: {
      type: String,
      enum: ['idea_created', 'validation_completed', 'mentor_session', 'business_plan_updated', 'goal_completed', 'funding_milestone']
    },
    title: String,
    description: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]

}, {
  timestamps: true
});

// Calculate business score based on various factors
UserProgressSchema.methods.calculateBusinessScore = function() {
  let score = 0;
  
  // Ideas validation (25 points)
  if (this.stats.ideasValidated > 0) {
    score += Math.min(25, this.stats.ideasValidated * 8);
  }
  
  // Business plan completion (30 points)
  score += this.businessPlan.completionPercentage * 0.3;
  
  // Funding readiness (25 points)
  score += this.stats.fundingReadiness * 0.25;
  
  // Network connections (20 points)
  score += Math.min(20, this.stats.networkConnections * 2);
  
  this.stats.businessScore = Math.round(score);
  return this.stats.businessScore;
};

// Calculate funding readiness score
UserProgressSchema.methods.calculateFundingReadiness = function() {
  let score = 0;
  
  // Business plan completion (40%)
  score += this.businessPlan.completionPercentage * 0.4;
  
  // Validated ideas (30%)
  if (this.stats.ideasValidated > 0) {
    score += Math.min(30, this.stats.ideasValidated * 10);
  }
  
  // Pitch deck score (20%)
  score += this.funding.pitchDeckScore * 0.2;
  
  // Market validation score (10%)
  const avgValidationScore = this.ideas.length > 0 
    ? this.ideas.reduce((sum, idea) => sum + idea.validationScore, 0) / this.ideas.length 
    : 0;
  score += avgValidationScore * 0.1;
  
  this.stats.fundingReadiness = Math.round(score);
  return this.stats.fundingReadiness;
};

// Add activity to timeline
UserProgressSchema.methods.addActivity = function(type, title, description) {
  this.activities.unshift({
    type,
    title,
    description,
    timestamp: new Date()
  });
  
  // Keep only last 50 activities
  if (this.activities.length > 50) {
    this.activities = this.activities.slice(0, 50);
  }
};

module.exports = mongoose.model('UserProgress', UserProgressSchema);
