const mongoose = require("mongoose");
const { Schema, model } = mongoose;



const CharacterSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
  },
  story: {
    type: String,
  },
  photo: {
    type: String,
  },
  facts: {
    "Powers:": [{ type: String }],
    "First Appearance:": [{ type: String }],
    "Base of Operations:": [{ type: String }],
    "Occupation:": [{ type: String }],
  },
});

const CharacterModel = model("Characters", CharacterSchema);

module.exports = CharacterModel;
