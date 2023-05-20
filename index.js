const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//This is very very important to connect database for secure pass and user
require("dotenv").config();
// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gojv5gq.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
   
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      
 const babyDollCollection = client.db("dollCollection").collection("babydolls");
 const babyDollCategories = client.db("dollCollection").collection("alltoys");

// Get all sub-categories data data
    app.get("/home", async (req, res) => {
      const query = {};
      const cursor = babyDollCollection.find(query);
      const babydolls = await cursor.toArray();
      res.send(babydolls);
    });
// Get all toys data
    app.get("/alltoys", async (req, res) => {
      const query = {};
      const cursor = babyDollCategories.find(query).limit(20);
      const category = await cursor.toArray();
      res.send(category);
    });

    // Post the data 
      app.post('/alltoys', async (req, res) => {
      const addtoys = req.body;
      const results = await babyDollCategories.insertOne(addtoys);
      res.send(results);
} )








   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







// Set running data or not
app.get('/', (req, res) => {
    res.send('api running in port 5000')
})





// this is the main port for run data
app.listen(port, () => {
    
console.log('The port is runing on:',port);

})