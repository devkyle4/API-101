const Products = require("../models/productModel.js");
const { getPostData } = require("../utils.js");

// @desc find all products
//@route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}

// @desc find single products
//@route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc create a product
//@route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc update a product
//@route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const body = await getPostData(req);

    const productData = Products.findById(id);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };

    const updatedProduct = await Products.update(productData);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
