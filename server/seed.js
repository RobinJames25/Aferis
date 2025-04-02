import 'dotenv/config';
import { db } from "./libs/dbConnect.js";

const users = [
    {
        username: 'nathan121',
        email: 'nathan@mail.com',
        password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
        avatar:
          'https://g.codewithnathan.com/default-user.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        username: 'jane78',
        email: 'jane@mail.com',
        password: '$2b$10$vD5yRWdxLp1j6riuSi/Ozu71x145viXeGC7AHT5R0WcycGalmYTae',
        avatar:
        'https://g.codewithnathan.com/default-user.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const products = [
    {
        name: 'Nike Air Max 270',
        description: 'A stylish and comfortable running shoe with Air cushioning.',
        price: 150,
        category: 'Running Shoes',
        brand: 'Nike',
        stock: 20,
        image: 'https://example.com/nike-air-max-270.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        name: 'Adidas Ultraboost 21',
        description: 'Premium running shoes featuring Boost technology for extra comfort.',
        price: 180,
        category: 'Running Shoes',
        brand: 'Adidas',
        stock: 15,
        image: 'https://example.com/adidas-ultraboost-21.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        name: 'Puma RS-X',
        description: 'Retro-inspired sneakers with modern comfort and style.',
        price: 130,
        category: 'Casual Sneakers',
        brand: 'Puma',
        stock: 25,
        image: 'https://example.com/puma-rs-x.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        name: 'Converse Chuck Taylor All Star',
        description: 'Classic canvas sneakers with timeless appeal.',
        price: 60,
        category: 'Casual Sneakers',
        brand: 'Converse',
        stock: 30,
        image: 'https://example.com/converse-chuck-taylor.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];


try {
    let collection = await db.collection('users');
    console.log('[seed', 'Seeding Users...');
    const result = await collection.insertMany(users);
    console.log(result.insertedIds);
    console.log('[seed]', 'Seeding Users Done');

    collection = db.collection('products');
    console.log('[seed]', 'Seeding Products...');
    await collection.insertMany(products);
    console.log('[seed]', 'Seeding Products Done');

    console.log('[seed]', 'All Done');
} catch (error) {
    console.log('[seed]', 'Error: ', error)
}