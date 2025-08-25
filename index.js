const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors({
  origin: "*"   // 👉 সব origin allow করবে (production এ চাইলে নির্দিষ্ট domain দিন)
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const URI = process.env.URI;

app.get('/', (req, res) => {
  res.send('ok server is running');
});

// MongoDB connection
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const testdb = client.db("testdb");
    const testCLR = testdb.collection("usersclr");



    app.post('/users',async (req,res)=>{
        const newUser=req.body

          const result = await testCLR.insertOne(newUser);
          
          if(result){
            res.status(200).json({
                message:'add success fully',
                result:result
            })
          }
    })

    app.get('/users',async (req,res)=>{

          const result = await testCLR.find().toArray();
          
          if(result){
            res.status(200).json({
                message:'add success fully',
                result:result
            })
          }
    })

  } catch(err) {
    console.error(err);
  }
}

run();

// app.listen(3000, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports=app;
