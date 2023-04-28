const mongoose=require('mongoose');
const mongoURI="mongodb+srv://abhi:ywRVyYbhQlQpHiQJ@cluster0.km2g7pv.mongodb.net/project?retryWrites=true&w=majority"

const connectTomongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  };

module.exports=connectTomongo