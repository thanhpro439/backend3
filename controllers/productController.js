import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  // Controller logic for adding a new product
  let products = await Product.find({});
  const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    image_public_id: req.body.image_public_id,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    date: req.body.date,
  });

  try {
    await product.save();
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const removeProduct = async (req, res) => {
  // Controller logic for removing a product
  try {
    const result = await Product.findOneAndDelete({ id: req.body.id });

    if (result) {
      res.json({
        success: true,
        name: req.body.name,
      });
    } else {
      res.json({
        success: false,
        error: "Product not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  // Controller logic for getting all products
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

export const getNewCollection = async (req, res) => {
  // Controller logic for getting new collection products
  try {
    const allProducts = await Product.find({});
    const newCollection =
      allProducts.length > 8 ? allProducts.slice(-8).reverse() : allProducts;
    res.send(newCollection);
  } catch (error) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

export const getPopularProducts = async (req, res) => {
  // Controller logic for getting popular women products
  try {
    const popularItems = await Product.find({ category: "women" });
    const popular =
      popularItems.length > 4 ? popularItems.slice(0, 4) : popularItems;
    res.send(popular);
  } catch (error) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
};
