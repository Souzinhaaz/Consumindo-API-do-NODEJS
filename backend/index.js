const express = require("express")
const cors = require("cors");
const app = express();
const connectDB = require("./src/config/db");

connectDB();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require("./src/routes/public/auth")
const userRoutes = require("./src/routes/private/users")
app.use("/auth", authRoutes)
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({msg: "Seja bem vindo a minha API"})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`)
});