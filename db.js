const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://bjkumar180:Minati123@cluster0.umpax.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI); // Connect to MongoDB
    console.log('Connected to MongoDB');

    const data = await mongoose.connection.db.collection('fooditem').find({}).toArray(); // Fetch all items in 'fooditem'
    const catdata = await mongoose.connection.db.collection('foodcategory').find({}).toArray(); // Fetch all items in 'foodcategory'

    if (data.length === 0) {
      console.log('No data found in the fooditem collection.');
    } else if (catdata.length === 0) {
      console.log('No data found in the foodcategory collection.');
    } else {
      global.food_item = data; 
      global.foodCategory = catdata;
      console.log(global.food_item);
      console.log(global.foodCategory);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if there's an error
  }
};

module.exports = mongoDB;
