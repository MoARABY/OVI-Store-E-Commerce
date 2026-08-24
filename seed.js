const productsModel = require('./DB/models/productModel')
const usersModel = require('./DB/models/userModel')
const reviewsModel = require('./DB/models/reviewModel')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const products = require('./data/products');
const users = require('./data/users');
const reviews = [
    {
        title: "Great product",
        ratings: 5,
        userId: "6a8bed6e83648b4b19e77f8b",
        productId: "6a8c40974109eff49d112c76"
    },
    {
        title: "Good quality",
        ratings: 4,
        userId: "6a8c4d052604730f94451777",
        productId: "6a8c40974109eff49d112c77"
    },
    {
        title: "Excellent choice",
        ratings: 5,
        userId: "6a8c4d052604730f9445177a",
        productId: "6a8c40974109eff49d112c75"
    },
    {
        title: "Worth the price",
        ratings: 4,
        userId: "6a8c4d052604730f9445177d",
        productId: "6a8c40974109eff49d112c72"
    },
    {
        title: "Average product",
        ratings: 3,
        userId: "6a8c4d052604730f94451780",
        productId: "6a8c40974109eff49d112c73"
    },
    {
        title: "Very satisfied",
        ratings: 5,
        userId: "6a8c4d052604730f94451783",
        productId: "6a8c40974109eff49d112c6f"
    },
    {
        title: "Good product",
        ratings: 4,
        userId: "6a8c4d052604730f94451786",
        productId: "6a8c40974109eff49d112c70"
    },
    {
        title: "Could be better",
        ratings: 3,
        userId: "6a8c4d052604730f94451789",
        productId: "6a8c40974109eff49d112c74"
    },
    {
        title: "Amazing quality",
        ratings: 5,
        userId: "6a8c4d052604730f9445178c",
        productId: "6a8c40974109eff49d112c71"
    },
    {
        title: "Not bad",
        ratings: 3,
        userId: "6a8c4d052604730f9445178f",
        productId: "6a8c40974109eff49d112c6e"
    },
    {
        title: "Highly recommended",
        ratings: 5,
        userId: "6a8c4d052604730f94451792",
        productId: "6a8c40974109eff49d112c69"
    },
    {
        title: "Good experience",
        ratings: 4,
        userId: "6a8c4d052604730f9445179b",
        productId: "6a8c40974109eff49d112c66"
    },
    {
        title: "Excellent",
        ratings: 5,
        userId: "6a8c4d052604730f9445179e",
        productId: "6a8c40974109eff49d112c63"
    },
    {
        title: "Nice product",
        ratings: 4,
        userId: "6a8c4d052604730f944517a1",
        productId: "6a8c40974109eff49d112c68"
    },

    // Product 1 - More reviews
    {
        title: "Really good",
        ratings: 5,
        userId: "6a8c4d052604730f94451777",
        productId: "6a8c40974109eff49d112c76"
    },
    {
        title: "Good overall",
        ratings: 4,
        userId: "6a8c4d052604730f9445177a",
        productId: "6a8c40974109eff49d112c76"
    },
    {
        title: "Perfect",
        ratings: 5,
        userId: "6a8c4d052604730f94451780",
        productId: "6a8c40974109eff49d112c76"
    },

    // Product 2
    {
        title: "Very useful",
        ratings: 5,
        userId: "6a8c4d052604730f94451783",
        productId: "6a8c40974109eff49d112c77"
    },
    {
        title: "Satisfied",
        ratings: 4,
        userId: "6a8c4d052604730f94451786",
        productId: "6a8c40974109eff49d112c77"
    },
    {
        title: "Decent quality",
        ratings: 3,
        userId: "6a8c4d052604730f94451789",
        productId: "6a8c40974109eff49d112c77"
    },

    // Product 3
    {
        title: "Excellent quality",
        ratings: 5,
        userId: "6a8c4d052604730f9445178c",
        productId: "6a8c40974109eff49d112c75"
    },
    {
        title: "Good value",
        ratings: 4,
        userId: "6a8c4d052604730f9445178f",
        productId: "6a8c40974109eff49d112c75"
    },
    {
        title: "Average",
        ratings: 3,
        userId: "6a8c4d052604730f94451792",
        productId: "6a8c40974109eff49d112c75"
    },

    // Product 4
    {
        title: "Amazing product",
        ratings: 5,
        userId: "6a8c4d052604730f9445179b",
        productId: "6a8c40974109eff49d112c72"
    },
    {
        title: "Pretty good",
        ratings: 4,
        userId: "6a8c4d052604730f9445179e",
        productId: "6a8c40974109eff49d112c72"
    },
    {
        title: "Could improve",
        ratings: 2,
        userId: "6a8c4d052604730f944517a1",
        productId: "6a8c40974109eff49d112c72"
    }
];


const DB = process.env.CONNECTION_STRING

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connected successfully');

    await reviewsModel.insertMany(reviews);
    console.log('Reviews inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();