const productModel = require('./DB/models/productModel')
const userModel = require('./DB/models/userModel')
const reviewsModel = require('./DB/models/reviewModel')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const products = require('./data/products');
const users = require('./data/users');
const reviews = require('./data/reviews');


const DB = process.env.CONNECTION_STRING

// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log('Database connected successfully');

//     await reviewsModel.insertMany(reviews);
//     console.log('Reviews inserted successfully');

//     await mongoose.connection.close();
//     console.log('Database connection closed');

//     process.exit(0);
//   } catch (error) {
//     console.error('Error:', error);
//     process.exit(1);
//   }
// };

// connectDB();








const userIds = [
    "6a8bed6e83648b4b19e77f8b",
    "6a8c4d052604730f94451777",
    "6a8c4d052604730f9445177a",
    "6a8c4d052604730f9445177d",
    "6a8c4d052604730f94451780",
    "6a8c4d052604730f94451783",
    "6a8c4d052604730f94451786",
    "6a8c4d052604730f94451789",
    "6a8c4d052604730f9445178c",
    "6a8c4d052604730f9445178f",
    "6a8c4d052604730f94451792",
    "6a8c4d052604730f9445179b",
    "6a8c4d052604730f9445179e",
    "6a8c4d052604730f944517a1"
];

const productIds = [
    "6a8c40974109eff49d112c76",
    "6a8c40974109eff49d112c77",
    "6a8c40974109eff49d112c75",
    "6a8c40974109eff49d112c72",
    "6a8c40974109eff49d112c73",
    "6a8c40974109eff49d112c6f",
    "6a8c40974109eff49d112c70",
    "6a8c40974109eff49d112c74",
    "6a8c40974109eff49d112c71",
    "6a8c40974109eff49d112c6e",
    "6a8c40974109eff49d112c69",
    "6a8c40974109eff49d112c66",
    "6a8c40974109eff49d112c63",
    "6a8c40974109eff49d112c68",
    "6a8c40974109eff49d112c6a",
    "6a8c40974109eff49d112c64",
    "6a8c40974109eff49d112c65",
    "6a8c40974109eff49d112c6b",
    "6a8c40974109eff49d112c67",
    "6a8c40974109eff49d112c6c",
    "6a8c40974109eff49d112c6d",
    "6a8c40974109eff49d112c5c",
    "6a8c40974109eff49d112c5d",
    "6a8c40974109eff49d112c5e",
    "6a8c40974109eff49d112c60",
    "6a8c40974109eff49d112c61",
    "6a8c40974109eff49d112c62",
    "6a8c40974109eff49d112c5f",
    "6a8c40974109eff49d112c5b",
    "6a8c40974109eff49d112c55",
    "6a8c40974109eff49d112c56",
    "6a8c40974109eff49d112c57",
    "6a8c40974109eff49d112c58",
    "6a8c40974109eff49d112c59",
    "6a8c40974109eff49d112c5a",
    "6a8c40974109eff49d112c4d",
    "6a8c40974109eff49d112c4e",
    "6a8c40974109eff49d112c4f",
    "6a8c40974109eff49d112c50",
    "6a8c40974109eff49d112c51",
    "6a8c40974109eff49d112c52",
    "6a8c40974109eff49d112c53",
    "6a8c40974109eff49d112c54",
    "6a8c40974109eff49d112c4b",
    "6a8c40974109eff49d112c4c",
    "6a8c40974109eff49d112c48",
    "6a8c40974109eff49d112c49",
    "6a8c40974109eff49d112c4a",
    "6a8c40974109eff49d112c43",
    "6a8c40974109eff49d112c44"
];





const seedWishlist = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");

        const operations = userIds.map((userId, userIndex) => {
            const startIndex = (userIndex * 4) % productIds.length;

            const wishlist = [
                productIds[startIndex],
                productIds[(startIndex + 1) % productIds.length],
                productIds[(startIndex + 2) % productIds.length],
                productIds[(startIndex + 3) % productIds.length]
            ];

            return {
                updateOne: {
                    filter: { _id: userId },
                    update: {
                        $set: {
                            wishlist
                        }
                    }
                }
            };
        });
        const result = await userModel.bulkWrite(operations);
        console.log("Wishlist seeded successfully");
        console.log(`Users updated: ${result.modifiedCount}`);

        await mongoose.connection.close();
        console.log("Database connection closed");

    } catch (error) {
        console.error("Wishlist seed failed:", error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedWishlist();