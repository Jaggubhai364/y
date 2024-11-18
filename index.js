const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // Use Render's PORT
;
const mongoDB = require('./db');


app.use((req,res,next)=>{
      res.setHeader('Access-Control-Allow-Origin','https://newproject-orcin-eight.vercel.app/');
      res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept'
      );
        next();
    })



mongoDB(); // Initialize MongoDB connection

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use(express.json())
app.use('/api',require('./Routes/Creatuser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
