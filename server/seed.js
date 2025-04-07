import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import Product from './models/product.model.js';

const users = [
    {
        username: 'thesith254',
        email: 'thesith254@gmail.com',
        password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
        avatar:
          'https://g.codewithnathan.com/default-user.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: 'admin',
    },
    {
        username: 'kali123',
        email: 'kali@gmail.com',
        password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
        avatar:
        'https://g.codewithnathan.com/default-user.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: 'admin'
    }
];

const products = [
    {
        name: "aj1",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj1.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj2",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj2.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj3",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj3.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj4",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj4.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj5",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj5.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj6",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj6.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj7",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj7.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj8",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj8.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj9",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj9.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    },
    {
        name: "aj10",
        brand: "Nike",
        category: "Basketball",
        price: 16295,
        originalPrice: 18295,
        discountPercentage: 10.93,
        description: "Experience lightweight comfort and explosive energy with the Air Jordan XXXVII Low PF.",
        image: "/images/aj10.jpg",
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        reviews: [],
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Black", "Red"]
    }
];


async function seedDatabase() {
    try {
      // Connecting to the database
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DATABASE,
      });
  
      // Seed the Users
      console.log('[seed] Seeding Users...');
      await User.insertMany(users);
      console.log('[seed] Seeding Users Done');
  
      // Seed the Products
      console.log('[seed] Seeding Products...');
      await Product.insertMany(products);
      console.log('[seed] Seeding Products Done');
      
      console.log('[seed] All Done');
    } catch (error) {
      console.error('[seed] Error:', error);
    } finally {
      // Disconnect after seeding
      mongoose.disconnect();
    }
  }
  
  seedDatabase();