const {Schema, model} = require("mongoose");

const usernameSchema=new Schema({
  email: {type:String ,required:true, unique:true},
  password: String,
  username:{type:String}
})

// Model
const Username=model('Username',usernameSchema)

module.exports = Username