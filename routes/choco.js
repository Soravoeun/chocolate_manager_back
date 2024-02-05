const Chocolate = require("../models/chocoModel");
const chocoRouter = require("express").Router();

chocoRouter.get("/", async (req, res) => {
  try {
    const chocolate = await Chocolate.find({});
    res.send(chocolate);
  } catch (error) {
    console.log(error);
  }
});

chocoRouter.get("/:id", async (req, res) => {
  try {
    const chocolate = await Chocolate.findOne({ id: req.params.id });
    res.send(chocolate);
  } catch (error) {
    console.log(error);
  }
});

chocoRouter.post("/new", async (req, res) => {
  try {
    let newChocolate = new Chocolate(req.body);
    res.send(newChocolate);
  } catch (error) {
    console.log(error);
  }
});

chocoRouter.put("/edit", async (req, res) => {
  res.send("edit chocolate");
});

chocoRouter.delete("/delete", (req, res) => {
  res.send("delete chocolate");
});

module.exports = chocoRouter;
