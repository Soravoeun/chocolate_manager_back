import { mongoose, Schema } from "mongoose";

const chocolateSchema = new Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  grams: { type: Number, default: 0 },
  description: { type: String },
  originCountry: { type: String, required: true },
});

const Chocolate = mongoose.model("Chocolate", chocolateSchema);

module.exports = Chocolate;
