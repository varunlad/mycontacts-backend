const mongoose = require("mongoose")

const createContactSchema = new mongoose.Schema({
      name:{
          type:String,
          required:true,
      },
     
      email:{
        type:String,
        required:true
      },
      phone:{
          type:Number,
          required:true
      },
      companyName:{
        type:String,
        required:true
      },
      
  })
  
  const createContact = mongoose.model("createContact", createContactSchema);
  module.exports = createContact