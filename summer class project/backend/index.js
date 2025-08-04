//Initialization
import app from './app.js';
import mongoose from 'mongoose';

const port = 5000;

//Routes
app.get('/',(_req, res) =>{
    res.send("This is the Homepage.");
});

//Starting the server in a port 
app.listen(port,() =>{
    console.log(`Server Started at PORT: ${port}`);
});


 
const uri = "mongodb+srv://sudeshna:test123@professionals.7yflkiy.mongodb.net/?retryWrites=true&w=majority&appName=Professionals";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db
    .admin().command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Pinged your deployment. You successfully connected to MongoDB.");
  }
}
run().catch(console.dir);
