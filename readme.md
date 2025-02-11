# OVI Store - E-commerce Platform

## 📌 Overview

OVI Store is a powerful and scalable e-commerce platform built using Node.js, Express, and MongoDB. It provides a seamless shopping experience with advanced features such as user authentication, product management, cart functionality, order processing, payment integration, and notifications.

## 🚀 Features

### - User Roles: Admin, Manager and Logged User

### - Authentication: Secure login, registration, and JWT-based authentication

### - Product Management: Categories, Subcategories, Brands

### - Shopping Cart: Add, remove, update, and manage cart items

### - Coupons & Discounts: Apply and manage discount codes

### - Wishlist: Add/remove favorite products

### - Reviews & Ratings: Users can review and rate products

### - Addresses: Manage multiple shipping addresses

### - Order Management: Create, track, and cancel orders

### - Payment Gateway Integration: Stripe for secure payments

### - Image Uploads: Cloudinary for storing product images

### - Notifications: Twilio (SMS) & Nodemailer (Emails)

### - Security Features: JWT, bcrypt, helmet, CORS, express-rate-limit, hpp, mongo-sanatize

## 🛠️ Tech Stack

### - Backend: Node.js, Express, MongoDB, Mongoose

### - Authentication: JWT, bcrypt, crypto

### - File Storage: Cloudinary

### - Payments: Stripe

### - Notifications: Twilio, Nodemailer

## 📂 API Endpoints

### 🔑 Authentication (/auth)

#### - POST /auth/register - Register a new user

#### - POST /auth/login - User login

#### - POST /auth/logout - Logout user

#### - POST /auth/forgot-password - Reset password via email

#### - POST /auth/verify-reset-code - Verify reset password send via email

#### - POST /auth/reset-password - Create new password

### 👤 Users (/users) || admin

#### - POST /users - Create new user account

#### - GET /users - show all system users accounts

#### - PUT /users/:id - Show specific user profile

#### - PUT /users/:id - Update specific user profile

#### - DELETE /users/:id - Delete specific user account

### 👤 Users (/users) || Logged

#### - GET /users/profile - show logged user profile

#### - PUT /users/profile - update logged user profile

#### - PUT /users/profile/change-password - update logged user password

#### - DELETE /users/profile - deActive logged user profile

#### - PUT /users/profile/activate - Activate logged user account

### 🔹 Categories & Brands (/categories, /brands)

### - POST /categories - Admin creates a new category

### - GET /categories - List all categories

### - POST /brands - Admin creates a new brand

### - GET /brands - List all brands

### - 🛒 Cart (/cart)

### - POST /cart/add - Add item to cart

### - DELETE /cart/remove/:id - Remove item from cart

### - GET /cart - View user’s cart

### - 🎟️ Coupons (/coupons)

### - POST /coupons - Admin creates a new coupon

### - GET /coupons - List all coupons

### - 💖 Wishlist (/wishlist)

### - POST /wishlist/add - Add item to wishlist

### - DELETE /wishlist/remove/:id - Remove item from wishlist

### - GET /wishlist - View user’s wishlist

### - ⭐ Reviews (/reviews)

### - POST /reviews/:productId - Add a review

### - GET /reviews/:productId - Get all reviews for a product

### - DELETE /reviews/:reviewId - Delete a review

### - 📍 Addresses (/addresses)

### - POST /addresses - Add a new address

### - GET /addresses - Get all saved addresses

### - DELETE /addresses/:id - Delete an address

### - 📦 Orders (/orders)

### - POST /orders - Place an order

### - GET /orders - View order history

### - PUT /orders/:id/cancel - Cancel an order

### - PUT /orders/:id/status - Admin updates order status

### - 💳 Payment (/payments)

### - POST /payments/stripe - Process payment via Stripe

## 📜 License

### This project is licensed under the MIT License.

## 📞 Contact

### For any inquiries, contact arabym702@gmail.com
