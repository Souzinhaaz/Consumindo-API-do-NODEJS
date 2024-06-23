const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DB_URI)
    console.log("Conexão com o banco de dados realizada com sucesso")
  } catch(err) {
    console.log("Houve um erro ao conectar com o banco de dados: " + err)
  }
} 

module.exports = connectDB;