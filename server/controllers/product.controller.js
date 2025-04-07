import { db } from '../libs/dbConnect.js';  
import { ObjectId } from 'mongodb';

const collection = db.collection('products'); 

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await collection.find().toArray();  // Using .find() to get all documents
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await collection.findOne({ _id: new ObjectId(req.params.id) });  // Find a product by its ObjectId
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty request body" });
    }
      const {
        name,
        brand,
        category,
        price,
        originalPrice,
        discountPercentage,
        description,
        image,
        countInStock,
        rating,
        numReviews,
        reviews,
        sizes,
        colors,
      } = req.body;
  
      // Basic validation
      if (!name || !brand || !category || !price) {
        return res.status(400).json({ message: "Missing required product fields" });
      }
  
      // Check if product already exists
      const existingProduct = await collection.findOne({ name, brand });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" });
      }
  
      const newProduct = {
        name,
        brand,
        category,
        price,
        originalPrice: originalPrice || price,
        discountPercentage: discountPercentage || 0,
        description: description || "",
        image: image || "/images/default.jpg",
        countInStock: countInStock || 0,
        rating: rating || 0,
        numReviews: numReviews || 0,
        reviews: reviews || [],
        sizes: sizes || [],
        colors: colors || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const result = await collection.insertOne(newProduct);
  
      if (result.insertedId) {
        newProduct._id = result.insertedId;
        return res.status(201).json(newProduct);
      }
  
      res.status(400).json({ message: "Product creation failed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Product creation failed", error: error.message });
    }
  };
  

// Update an existing product
export const updateProduct = async (req, res) => {
    const { id } = req.params;

    // Validate if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        // First, check if the product exists
        const product = await collection.findOne({ _id: new ObjectId(id) });
        if (!product) {
            console.log("Product not found for update with ID:", id); // Debug log
            return res.status(404).json({ message: "Product not found for update" });
        }

        // Now update the product using updateOne
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },  // Find the product by ID
            { $set: req.body }  // Update with new data
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not updated" });
        }

        // Fetch the updated product to return it
        const updatedProduct = await collection.findOne({ _id: new ObjectId(id) });

        // Return the updated product
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);  // Log the error to the server console for debugging
        res.status(400).json({ message: "Update failed", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });  // Delete the product by ID
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found for deletion" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ message: "Deletion failed", error });
    }
};

