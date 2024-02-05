// ask for using express
// add  "dev" : "node app.js"
// for using npm run dev in terminal for debugging.if there has not this line, in terminal, must write node app.js
// import Chocolate from "./models/chocoModel";
// const modele = require("../models/chocolate")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 1) le model pour la base de données.
const chocolateSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  grams: { type: Number, default: 0 },
  description: { type: String },
  originCountry: { type: String, required: true },
});
const Chocolate = mongoose.model("Chocolate", chocolateSchema);

// 2) connection avec mongodb.
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chocolatemanager");
  console.log(`⚡️🤡 database connected successfully`);
} // ou simplement "mongoose.connect("mongodb://127.0.0.1:27017/chocolatemanager"); à la place de 22 à 26"

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//connexion à la base de données 
mongoose.connect(process.env.MONGO_URL)

// 4) depuis  le back faire une requete de ma base de données et afficher dans la console.
app.get("/", async (req, res) => {
  try {
    const choco = await Chocolate.find();
    console.log(choco);
    // 5) renvoyer le resultat vers le front
    res.json(choco);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const chocolate = await Chocolate.findOne({ id: req.params.id });
    res.send(chocolate);
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  try {
    let newChocolate = new Chocolate(req.body);
    newChocolate.save();
    res.json(newChocolate);
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit", async (req, res) => {
  res.send("edit chocolate");
});

app.delete("/delete", (req, res) => {
  res.send("delete chocolate");
});

// app.use("/chocolate", modele)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
