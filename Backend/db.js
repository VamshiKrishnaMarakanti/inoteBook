const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); // your MongoDB URI
    console.log('MongoDB connected successfully');
    
    // Start your app/server here
    // app.listen(PORT, ...)
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports=connectToMongo;
