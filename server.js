const http = require("http");
const mongoose = require("mongoose");
const {
  getCharacters,
  addCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} = require("./controllers/charactersController");

mongoose
  .connect(
    "mongodb+srv://devkyle4:###@###.fv9xhpc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database successfully connected!!");
  })
  .catch((err) => console.log(err));

const server = http.createServer((req, res) => {
  if (req.url === "/dc/characters" && req.method === "GET") {
    getCharacters(req, res);
  } else if (req.url.startsWith("/dc/characters/") && req.method === "GET") {
    const character_name = req.url.split("/")[3];
    getCharacter(req, res, character_name);
  } else if (req.url === "/dc/characters" && req.method === "POST") {
    addCharacter(req, res);
  } else if (req.url.startsWith("/dc/characters") && req.method === "PUT") {
    id = req.url.split("/")[3];
    updateCharacter(req, res, id);
  } else if (req.url.startsWith("/dc/characters/") && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteCharacter(req, res, id);
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
