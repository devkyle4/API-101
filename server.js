const http = require("http");
const {
  getCharacters,
  addCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} = require("./controllers/charactersController");

mongoose
  .connect(
    "mongodb+srv://devkyle4:DC_API@cluster0.fv9xhpc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database successfully connected!!");
  })
  .catch((err) => console.log(err));

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9a-zA-Z]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9a-zA-Z]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9a-zA-Z]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
