// Importações de modulos
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/public/auth")
const userRoutes = require("./routes/private/users")
const app = express();

// Conectando ao banco de dados 
const connectDB = require("./config/db");
connectDB();

// Configurações e Middlewares
// Meio que define para o express que nós iremos usar os arquivos em json.
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas de autenticação 
app.use("/auth", authRoutes)
// Rotas privadas
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({msg: "Seja bem vindo a minha API"})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`)
});