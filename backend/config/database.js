const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(' Database connection error:', error.message);
    
    // For development, we'll continue without DB for now
    if (process.env.NODE_ENV === 'development') {
      console.log(' Continuing without database connection (development mode)');
      return;
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
