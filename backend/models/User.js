const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId && !this.linkedinId;
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['entrepreneur', 'mentor', 'admin'],
    default: 'entrepreneur'
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    skills: [{
      type: String,
      trim: true
    }],
    interests: [{
      type: String,
      trim: true
    }],
    location: {
      type: String,
      trim: true
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  // OAuth fields
  googleId: {
    type: String,
    sparse: true
  },
  linkedinId: {
    type: String,
    sparse: true
  },
  // Account status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  // Ideas and progress tracking
  ideas: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Idea'
  }],
  mentorships: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Mentorship'
  }]
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a random avatar URL
UserSchema.methods.generateAvatar = function() {
  if (!this.profile.avatar) {
    const initials = this.name.split(' ').map(n => n[0]).join('').toUpperCase();
    this.profile.avatar = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200`;
  }
  return this.profile.avatar;
};

module.exports = mongoose.model('User', UserSchema);
