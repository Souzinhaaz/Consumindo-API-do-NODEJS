// Importações de modulos
const express = require("express")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

// Configurações e Middlewares
// Meio que define para o express que nós iremos usar os arquivos em json.
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/auth/users", authRoutes)
  app.use("/users", userRoutes)


// Conectando ao banco de dados 
connectDB();





app.get("/", (req, res) => {
  res.status(200).json({msg: "Seja bem vindo a minha API"})
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`)
});