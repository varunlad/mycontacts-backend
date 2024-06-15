const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors")
// const mongoURI = "mongodb://localhost:27017/"

const port = process.env.PORT || 5001;

////Nodemon is a tool that helps developers in the Node.js ecosystem by monitoring changes in their code 
////and automatically restarting the application.

////app.use is a method to mount middleware functions
//// Middleware to parse JSON payloads (req).
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow requests from your frontend

const uri = 'mongodb://127.0.0.1:27017/contact';  // Use 127.0.0.1 instead of localhost to avoid DNS issues
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB: ', err));

// const mongoURI = 'mongodb://127.0.0.1:27017/contact2';
// const connectMongoDB = async () => {
//     try {
//       await mongoose.connect(mongoURI);
//       const connection = mongoose.connection;
//       console.log("Connected to MongoDB");
//     } catch (error) {
//       console.log("Error connecting to MongoDB: ", error);
//     }
//   };
//connectMongoDB();

////used to mount middleware for handling requests to a specific route.
app.use("/api/contacts", require('./routes/contactRoutes'));
app.use(errorHandler);

 


app.listen(port,()=>{console.log(`server running at port ${port}`)})