const mongoose = require("mongoose");
const CharacterModel = require("../model/charactersModel");
const { getPostData } = require("../utils");

// @desc find all characters
//@route /api/dc_characters
async function getCharacters(req, res) {
  try {
    const characters = await CharacterModel.find();
    res.writeHead("200", { "Content-Type": "application/json" });
    res.end(JSON.stringify(characters));
  } catch (err) {
    console.error(err);
  }
}

// @desc find a character
// @route /dc/characters/:name
async function getCharacter(req, res, character_name) {
  try {
    const character = await CharacterModel.findOne({ name: character_name });
    if (!character) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Character Not Found!" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(character));
    }
  } catch (err) {
    console.error(err);
  }
}

// @desc add a character
// @route /dc/characters POST
async function addCharacter(req, res) {
  try {
    const body = await getPostData(req);

    const { name, story, photo, facts } = JSON.parse(body);
    const character = {
      name,
      story,
      photo,
      facts,
    };

    const exist = await CharacterModel.findOne({ name: character.name });

    if (!exist) {
      const newCharacter = await CharacterModel.create(character);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newCharacter));
      console.log("New Character Added");
    } else {
      console.log("Character already Exists!");
    }
  } catch (err) {
    console.error(err);
  }
}

async function updateCharacter(req, res, id) {
  try {
    const character = await CharacterModel.find({ _id: id });

    if (!character) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Character does not exist!!" }));
    } else {
      const body = await getPostData(req);

      const { name, story, photo, facts } = JSON.parse(body);

      const updateCharacter = {
        name: name || character.name,
        story: story || character.story,
        photo: photo || character.photo,
        facts: facts || character.facts,
      };

      const updatedCharacter = await CharacterModel.findOneAndUpdate(
        updateCharacter
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedCharacter));
      console.log("Character has been updated!!");
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteCharacter(req, res, id) {
  try {
    const character = await CharacterModel.findById({ _id: id });

    if (!character) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Character with this ID does not exist!!" })
      );
    } else {
      await CharacterModel.deleteOne({ _id: id });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Character with ${id} deleted` }));
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getCharacters,
  getCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
};
