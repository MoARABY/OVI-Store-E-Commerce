# Business Requirements Document (BRD)
## OVI Store - E-Commerce Platform

**Document Version:** 1.0  
**Date:** February 14, 2026  
**Project Name:** OVI Store  
**Project Type:** Web-based E-Commerce Platform  

---

## 1. Executive Summary

OVI Store is a comprehensive, scalable e-commerce platform built on a modern tech stack (Node.js, Express, MongoDB) designed to provide a seamless online shopping experience. The platform enables customers to browse, search, and purchase products while offering administrators robust tools for inventory management, order processing, and business analytics.

### Key Objectives:
- Provide a user-friendly shopping experience with secure payment processing
- Enable efficient product and inventory management for administrators
- Support multiple user roles with role-based access control
- Deliver reliable notifications and customer communication channels
- Ensure high security standards and compliance with e-commerce best practices

---

## 2. Business Problem Statement

### Current Challenge:
The need for a modern, organized e-commerce solution that:
- Streamlines the online retail process for merchants
- Provides customers with a convenient, secure shopping platform
- Manages complex product hierarchies (categories, subcategories, brands)
- Handles order fulfillment and payment processing efficiently
- Maintains scalability as the business grows

---

## 3. Project Scope

### In Scope:
- User authentication and authorization system
- Product catalog management with hierarchical organization
- Shopping cart and checkout functionality
- Order management and tracking
- Payment integration (Stripe)
- Coupon and discount management
- User reviews and ratings
- Wishlist functionality
- Multiple address management
- Product image management (Cloudinary)
- SMS and Email notifications
- Security and rate limiting

### Out of Scope:
- Physical warehouse management and automation
- Advanced analytics and business intelligence dashboards
- Mobile application (web-based only)
- Third-party marketplace integrations (future phase)
- Subscription/recurring billing

---

## 4. Stakeholders

### Primary Stakeholders:
1. **End Customers** - Browse, purchase, and review products
2. **Shop Administrators** - Manage products, orders, users, and reports
3. **Shop Managers** - Manage day-to-day operations and inventory
4. **Business Owner** - Revenue generation and growth metrics

### Secondary Stakeholders:
- Payment processor (Stripe)
- Notification providers (Twilio, Email service)
- Cloud storage provider (Cloudinary)
- Database administrator

---

## 5. User Personas & Roles

### 5.1 User Roles

#### Role 1: Guest/Unauthenticated User
- **Permissions:**
  - Browse products, categories, and brands
  - View product details and reviews
  - Search and filter products
- **Restrictions:**
  - Cannot add to cart, create orders, or manage wishlist

#### Role 2: Registered Customer
- **Permissions:**
  - Complete guest functions
  - Create and manage user account
  - Add/remove items to/from cart
  - Create and track orders
  - Manage multiple addresses
  - Save wishlist items
  - Submit product reviews and ratings
  - Apply discount coupons
  - Change password
- **Restrictions:**
  - Cannot manage products or users
  - Cannot view other users' orders

#### Role 3: Store Manager
- **Permissions:**
  - All customer permissions
  - Create and update products
  - Manage product inventory
  - View all customer orders
  - Manage categories and subcategories
  - Manage brands
  - Apply and manage coupons
- **Restrictions:**
  - Cannot delete users
  - Cannot access financial reports

#### Role 4: Administrator
- **Permissions:**
  - All platform functions
  - Full user management (create, read, update, delete)
  - Product management (full CRUD)
  - Coupon management
  - View and manage all orders
  - System configuration
  - Access to all reports and analytics
- **Restrictions:**
  - Accountable for system integrity

---

## 6. Core Features & Functionality

### 6.1 Authentication & User Management

#### Registration & Login
- User registration with email verification
- Secure JWT-based authentication
- Bcrypt password hashing
- Session management via cookies
- Login with email and password

#### Password Management
- Forgot password functionality
- Reset code generation and email verification
- Password change for authenticated users

#### Profile Management
- View user profile information
- Update profile (name, email, phone, address)
- Deactivate/reactivate account
- Change password

#### User Account Types
- Regular customers
- Managers with elevated privileges
- Administrators with full system access

---

### 6.2 Product Catalog Management

#### Product Organization
- **Categories** - Primary product classifications (e.g., Electronics, Clothing)
  - Create, read, update, delete categories
  - Attach images to categories
  - Filter products by category

- **Subcategories** - Secondary classifications linked to categories
  - Organize products within categories
  - Enable hierarchical browsing

- **Brands** - Product manufacturer/brand information
  - Maintain brand listings
  - Filter products by brand
  - Brand image management

#### Product Management
- Create products with:
  - Title, description, price
  - Category and subcategory assignment
  - Brand assignment
  - Quantity/inventory tracking
  - Multi-image support (via Cloudinary)
  - Product specifications
  - SKU management

- Product Operations:
  - Search and filter by multiple criteria (price, brand, category, ratings)
  - View product details and availability
  - Update product information
  - Manage inventory levels
  - Soft delete support

---

### 6.3 Shopping Cart

#### Cart Operations
- Add products to cart with quantity selection
- View cart contents with item details
- Update item quantities
- Remove items from cart
- Clear entire cart

#### Cart Features
- Real-time price calculation
- Apply discount coupons to cart
- Cart total with tax calculations
- Persistent cart storage

---

### 6.4 Order Management

#### Order Creation & Processing
- Convert cart to order
- Automatic order ID generation
- Track delivery addresses
- Record payment method

#### Order Status Tracking
- Order statuses: Pending, Processing, Shipped, Delivered, Cancelled
- Order history for customers
- Admin order processing and fulfillment

#### Order Operations
- Create orders from cart items
- View order details and history
- Cancel orders (if applicable)
- Modify order status (admin)
- Retrieve order information

---

### 6.5 Payment Processing

#### Stripe Integration
- Secure payment gateway integration
- Credit/debit card payment support
- Payment verification via webhooks
- Automatic order confirmation after payment
- Payment failure handling

#### Payment Features
- Multiple payment method support
- Transaction logging
- Webhook-based payment confirmation
- Automated receipt generation

---

### 6.6 Coupons & Discounts

#### Coupon Management
- Create discount coupons with:
  - Discount percentage or fixed amount
  - Expiration dates
  - Maximum usage limits
  - Minimum purchase requirements
  - Category or product restrictions

#### Coupon Features
- Apply coupons to shopping cart
- Validate coupon eligibility
- Track coupon usage
- Prevent duplicate coupon applications

---

### 6.7 Reviews & Ratings

#### Review System
- Users can rate products (1-5 stars)
- Written reviews with title and content
- Verified purchase badge (only verified buyers can review)
- Average rating calculation
- Rating distribution display

#### Review Management
- Create, read, update, delete reviews
- Admin moderation capabilities
- Filter reviews by rating
- Helpful/unhelpful marking (future)

---

### 6.8 Wishlist

#### Wishlist Features
- Save favorite products for later
- Add/remove items from wishlist
- View complete wishlist
- Move wishlist items to cart
- Wishlist sharing (future)

---

### 6.9 Address Management

#### Address Management
- Store multiple shipping addresses
- Set default address
- Edit address information
- Delete saved addresses
- Address validation

#### Supported Address Data
- Full name, address line 1 & 2
- City, state, postal code, country
- Phone number

---

### 6.10 Notifications

#### Email Notifications
- Account verification emails
- Password reset emails
- Order confirmation emails
- Order status update emails
- Promotional emails

#### SMS Notifications (Twilio)
- Phone verification via OTP (One-Time Password)
- SMS verification code delivery
- Order status notifications (future)
- Delivery alerts (future)

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) + Bcrypt |
| **File Storage** | Cloudinary |
| **Payments** | Stripe API |
| **Notifications** | Nodemailer (Email), Twilio (SMS) |
| **Image Processing** | Multer + Cloudinary |
| **Security** | Helmet, CORS, Express-validator, HPP, Mongo-sanitize, XSS-clean |
| **Rate Limiting** | Express-rate-limit |
| **API Documentation** | Swagger/OpenAPI |
| **Monitoring** | Morgan (HTTP logging) |

### 7.2 Architecture Components

#### Presentation Layer
- RESTful API endpoints
- Swagger API documentation
- JSON request/response format

#### Business Logic Layer
- Controllers for each module
- Validators for input sanitization
- Guards and middleware for authorization

#### Data Access Layer
- Mongoose models for MongoDB
- Database connection management

#### Cross-Cutting Concerns
- Error handling middleware
- Rate limiting
- CORS management
- Data compression
- HTTP parameter pollution protection
- NoSQL injection protection

---

## 8. Data Models

### 8.1 Core Entities

#### User Model
```
- _id (ObjectId)
- email (unique)
- password (bcypted)
- firstName
- lastName
- phone
- addresses (array of address references)
- role (customer/manager/admin)
- isActive
- profileImage
- phoneVerifyCode
- phoneVerifyCodeExpires
- emailVerifyCode (if applicable)
- resetPasswordCode
- resetPasswordCodeExpires
- createdAt
- updatedAt
```

#### Product Model
```
- _id (ObjectId)
- title (unique)
- description
- price
- discountPrice
- category (reference)
- subCategory (reference)
- brand (reference)
- quantity
- sold
- ratingsAverage
- ratingsQuantity
- images (array)
- slug
- createdAt
- updatedAt
```

#### Order Model
```
- _id (ObjectId)
- user (reference)
- cartItems (array of products with quantities)
- totalOrderPrice
- shippingAddress
- shippingPrice
- taxPrice
- totalPrice
- paymentMethodType
- isPaid
- paidAt
- shippingStatus
- status (pending/processing/shipped/delivered/cancelled)
- createdAt
- updatedAt
```

#### Cart Model
```
- _id (ObjectId)
- user (reference)
- items (array)
  - product (reference)
  - quantity
  - price
- totalQuantity
- totalPrice
- appliedCoupon (reference)
- createdAt
- updatedAt
```

#### Category Model
```
- _id (ObjectId)
- name (unique)
- slug
- description
- image
- createdAt
- updatedAt
```

#### Brand Model
```
- _id (ObjectId)
- name (unique)
- slug
- logo
- description
- createdAt
- updatedAt
```

#### Review Model
```
- _id (ObjectId)
- product (reference)
- user (reference)
- rating (1-5)
- title
- content
- isVerifiedBuy
- createdAt
- updatedAt
```

#### Coupon Model
```
- _id (ObjectId)
- code (unique)
- discountPercentage / discountAmount
- expiresAt
- maxRedemptions
- currentRedemptions
- minPurchaseAmount
- applicableCategories (array)
- applicableProducts (array)
- isActive
- createdAt
- updatedAt
```

#### Address Model
```
- _id (ObjectId)
- user (reference)
- fullName
- phone
- addressLine1
- addressLine2
- city
- state
- postalCode
- country
- isDefault
- createdAt
- updatedAt
```

#### Wishlist Model
```
- _id (ObjectId)
- user (reference)
- products (array of product references)
- createdAt
- updatedAt
```

---

## 9. API Endpoints

### 9.1 Authentication Endpoints (/api/v1/auth)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /register | Create new user account | No |
| POST | /login | User login | No |
| POST | /logout | Logout user | Yes |
| POST | /send-otp | Send OTP to phone | No |
| POST | /verify-otp | Verify OTP code | No |
| POST | /forgot-password | Request password reset | No |
| POST | /verify-reset-code | Verify reset code | No |
| POST | /reset-password | Set new password | No |

### 9.2 User Endpoints (/api/v1/users)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create new user | Yes | Admin |
| GET | / | List all users | Yes | Admin |
| GET | /profile | Get logged-in user profile | Yes | User |
| PUT | /profile | Update logged-in user profile | Yes | User |
| PUT | /profile/change-password | Change password | Yes | User |
| DELETE | /profile | Deactivate account | Yes | User |
| PUT | /profile/activate | Reactivate account | Yes | User |
| GET | /:id | Get specific user | Yes | Admin |
| PUT | /:id | Update specific user | Yes | Admin |
| DELETE | /:id | Delete user | Yes | Admin |

### 9.3 Products Endpoints (/api/v1/products)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create product | Yes | Manager/Admin |
| GET | / | List all products | No | - |
| GET | /:id | Get product details | No | - |
| PUT | /:id | Update product | Yes | Manager/Admin |
| DELETE | /:id | Delete product | Yes | Admin |

### 9.4 Categories Endpoints (/api/v1/categories)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create category | Yes | Admin |
| GET | / | List all categories | No | - |
| GET | /:id | Get category details | No | - |
| PUT | /:id | Update category | Yes | Admin |
| DELETE | /:id | Delete category | Yes | Admin |

### 9.5 Brands Endpoints (/api/v1/brands)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create brand | Yes | Admin |
| GET | / | List all brands | No | - |
| GET | /:id | Get brand details | No | - |
| PUT | /:id | Update brand | Yes | Admin |
| DELETE | /:id | Delete brand | Yes | Admin |

### 9.6 Cart Endpoints (/api/v1/cart)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /add | Add item to cart | Yes |
| GET | / | Get cart contents | Yes |
| PUT | /:itemId | Update item quantity | Yes |
| DELETE | /:itemId | Remove item from cart | Yes |
| DELETE | / | Clear cart | Yes |
| POST | /apply-coupon | Apply coupon code | Yes |

### 9.7 Orders Endpoints (/api/v1/orders)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | / | Create order from cart | Yes |
| GET | / | Get all orders (user-specific) | Yes |
| GET | /:id | Get order details | Yes |
| PUT | /:id/status | Update order status | Yes (Admin) |
| DELETE | /:id | Cancel order | Yes |
| POST | /webhook-checkout | Stripe webhook endpoint | - |

### 9.8 Reviews Endpoints (/api/v1/reviews)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | / | Create product review | Yes |
| GET | / | List reviews (filterable) | No |
| GET | /:id | Get review details | No |
| PUT | /:id | Update own review | Yes |
| DELETE | /:id | Delete review | Yes |

### 9.9 Wishlist Endpoints (/api/v1/wishlist)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /add | Add product to wishlist | Yes |
| GET | / | Get user's wishlist | Yes |
| DELETE | /:productId | Remove from wishlist | Yes |

### 9.10 Addresses Endpoints (/api/v1/addresses)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | / | Create new address | Yes |
| GET | / | Get user's addresses | Yes |
| PUT | /:id | Update address | Yes |
| DELETE | /:id | Delete address | Yes |
| PUT | /:id/default | Set as default address | Yes |

### 9.11 Coupons Endpoints (/api/v1/coupons)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create coupon | Yes | Admin |
| GET | / | List coupons | Yes | Admin |
| GET | /:id | Get coupon details | No | - |
| PUT | /:id | Update coupon | Yes | Admin |
| DELETE | /:id | Delete coupon | Yes | Admin |

### 9.12 Subcategories Endpoints (/api/v1/subcategories)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|--------------|------|
| POST | / | Create subcategory | Yes | Admin |
| GET | / | List subcategories | No | - |
| GET | /:id | Get subcategory details | No | - |
| PUT | /:id | Update subcategory | Yes | Admin |
| DELETE | /:id | Delete subcategory | Yes | Admin |

---

## 10. Security Requirements

### 10.1 Authentication & Authorization
- JWT-based token authentication
- Secure password hashing using bcrypt
- Role-based access control (RBAC)
- Session management with HTTP-only cookies
- Token expiration and refresh mechanisms

### 10.2 Data Protection
- HTTPS/TLS for all communications
- MongoDB injection prevention (mongo-sanitize)
- XSS attack prevention (xss-clean)
- HTTP Parameter Pollution (HPP) protection
- Input validation and sanitization

### 10.3 API Security
- CORS configuration for trusted origins
- Rate limiting on authentication endpoints
- Rate limiting on general API endpoints
- Helmet.js for secure HTTP headers
- Request size limitations (20KB JSON limit)

### 10.4 Payment Security
- Stripe PCI DSS compliance
- Secure webhook verification
- No storage of sensitive payment data
- Encrypted payment status tracking

### 10.5 Data Privacy
- GDPR compliance considerations
- User data deletion options
- Secure OTP generation and validation
- Password reset security measures
- Email verification for account recovery

---

## 11. Performance & Scalability

### 11.1 Performance Optimization
- Response compression (gzip)
- Database indexing on key fields
- Query optimization
- Pagination for large data sets
- Caching strategies for frequently accessed data

### 11.2 Scalability Planning
- Stateless architecture for horizontal scaling
- Database replication support
- CDN for image delivery via Cloudinary
- Load balancing ready
- Rate limiting to prevent abuse

---

## 12. Deployment & Environment

### 12.1 Deployment Targets
- Vercel (indicated by vercel.json in project)
- Can be deployed on any Node.js hosting
- MongoDB Atlas for cloud database
- Cloudinary for image storage

### 12.2 Environment Configuration
- Development environment with nodemon
- Production environment variables
- Sensitive data management via .env files
- Different logging levels (development vs production)

### 12.3 API Versioning
- API versioning via URL path (/api/v1/...)
- Future versions can be supported alongside

---

## 13. Features by Priority

### MVP (Minimum Viable Product) - Phase 1
- User authentication (registration, login, logout)
- Product catalog with categories and brands
- Shopping cart functionality
- Basic order creation
- User profile management
- Email notifications

### Phase 2 - Enhanced Features
- Stripe payment integration
- Coupon and discount system
- Product reviews and ratings
- Wishlist functionality
- Multiple address management
- SMS notifications via Twilio

### Phase 3 - Advanced Features
- Advanced analytics and reporting
- Personalized product recommendations
- Inventory management optimization
- Order tracking with real-time updates
- Customer support chat
- Mobile app (Native/React Native)

### Phase 4 - Future Enhancements
- Subscription products
- Multi-seller marketplace
- Advanced search with Elasticsearch
- AI-powered recommendations
- Social media integration
- Loyalty programs

---

## 14. Testing Strategy

### 14.1 Testing Types
- **Unit Testing** - Individual function/controller testing
- **Integration Testing** - API endpoint and database interaction testing
- **Authentication Testing** - JWT and authorization flow testing
- **Payment Testing** - Stripe integration testing (sandbox mode)
- **Load Testing** - Performance under high concurrent users
- **Security Testing** - SQL injection, XSS, JWT token validation

### 14.2 API Documentation
- Swagger/OpenAPI documentation
- Auto-generated from JSDoc comments
- Interactive API testing via Swagger UI
- Complete endpoint reference

---

## 15. Success Metrics & KPIs

### 15.1 Business Metrics
- Number of registered users
- Monthly active users (MAU)
- Conversion rate (cart to purchase)
- Average order value
- Customer retention rate
- Return customer percentage

### 15.2 Technical Metrics
- API response time (target: <200ms)
- System uptime (target: 99.9%)
- Error rate (target: <0.1%)
- Database query performance
- Payment success rate (target: >99% for approved cards)

### 15.3 User Experience Metrics
- Page load time
- Checkout completion rate
- Cart abandonment rate
- Customer satisfaction score (NPS)
- Product review engagement

---

## 16. Assumptions & Dependencies

### 16.1 Assumptions
- Users have modern web browsers (Chrome, Firefox, Safari, Edge)
- Users have stable internet connectivity
- Payment processor (Stripe) is always available
- Email and SMS services are operational
- Cloudinary service is available for image storage

### 16.2 Dependencies
- **Stripe API** - Payment processing and webhooks
- **Twilio API** - SMS notifications
- **Nodemailer** - Email delivery
- **Cloudinary API** - Image storage and management
- **MongoDB** - Database persistence
- **Express.js** - Web framework
- **JSON Web Tokens (JWT)** - Authentication mechanism

---

## 17. Constraints & Limitations

### 17.1 Technical Constraints
- Maximum JSON payload: 20KB
- Image upload size limitations (based on Cloudinary)
- Database query optimization needed for large datasets
- Rate limiting may affect high-frequency API access

### 17.2 Business Constraints
- Payment processing restricted by Stripe's terms of service
- Regional restrictions may apply for SMS (Twilio)
- Email delivery rates depend on ISP policies
- Data storage costs scale with usage

---

## 18. Maintenance & Support

### 18.1 Ongoing Maintenance
- Regular security updates and patches
- Database backups and recovery procedures
- Monitoring and alerting for system health
- Log analysis and error tracking
- Performance optimization continuous improvement

### 18.2 Support & Escalation
- User support documentation
- API documentation updates
- Bug reporting and issue tracking
- Version compatibility management
- Load balancing and scaling adjustments

---

## 19. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Payment Processing Failure | Medium | High | Implement retry logic, webhook verification, transaction logging |
| Database Performance Degradation | Medium | High | Database indexing, query optimization, regular monitoring |
| Security Breach | Low | Critical | Regular security audits, encryption, rate limiting, input validation |
| Third-party Service Outage | Low | Medium | Service monitoring, fallback mechanisms, graceful degradation |
| High Traffic Load | Low | High | Load balancing, caching, CDN, auto-scaling |
| Data Loss | Very Low | Critical | Automated backups, disaster recovery plan, data replication |

---

## 20. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Manager | [Name] | [Date] | [Signature] |
| Technical Lead | [Name] | [Date] | [Signature] |
| Business Owner | [Name] | [Date] | [Signature] |

---

## Appendix A: Glossary

- **JWT** - JSON Web Token for secure authentication
- **RBAC** - Role-Based Access Control
- **OTP** - One-Time Password
- **SKU** - Stock Keeping Unit
- **PCI DSS** - Payment Card Industry Data Security Standard
- **CORS** - Cross-Origin Resource Sharing
- **HPP** - HTTP Parameter Pollution
- **XSS** - Cross-Site Scripting
- **Webhook** - HTTP callback for real-time event notification
- **Bcrypt** - Password hashing algorithm
- **MongoDB** - Document-oriented NoSQL database
- **Mongoose** - MongoDB object modeling library
- **CDN** - Content Delivery Network
- **MAU** - Monthly Active Users
- **NPS** - Net Promoter Score

---

## Appendix B: Reference Links

- **Stripe Documentation**: https://stripe.com/docs
- **Twilio Documentation**: https://www.twilio.com/docs
- **Cloudinary Documentation**: https://cloudinary.com/documentation
- **MongoDB Documentation**: https://docs.mongodb.com
- **Express.js Guide**: https://expressjs.com
- **JWT Best Practices**: https://tools.ietf.org/html/rfc7519

---

**End of Document**
