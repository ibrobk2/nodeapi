const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel.js')


const app = express();
const port = 3000;

app.use(express.json())

// MongoDB username and password
const username = 'admin';
const password = 'Admin123456';

app.get('/', (req, res)=>{
  res.send("Node API testing...");
  // console.log(req.body)
})

app.get('/api/product/:id', async(req, res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.get('/api/product', async(req, res)=>{
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.post('/api/product', async(req, res)=>{
  try{
    const product = await Product.create(req.body);
    res.status(200).json(req.body);
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
 
})


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${username}:${password}@nodeapi.zux0v1n.mongodb.net/?retryWrites=true&w=majority&appName=nodeapi`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// Define routes or other application logic here


mongoose.connect('mongodb+srv://admin:Admin123456@nodeapi.zux0v1n.mongodb.net/Node-API?retryWrites=true&w=majority&appName=nodeapi').then(() => {
  console.log("Connected to MongoDB successfully...");
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.log(error);
})
