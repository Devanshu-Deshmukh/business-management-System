# Business Management System

A full-stack web application for managing business operations including admin management, user management, product catalog, and order processing. Built with a Spring Boot backend and a React frontend.

## Core Functionality

### Admin Module
- Admin login with email and password authentication
- Admin dashboard with an overview of all admins, users, products, and orders
- Create, update, and delete admin accounts

### User Module
- User login with email and password authentication
- Create, update, and delete user accounts from the admin dashboard
- Users can browse products and place orders after logging in

### Product Module
- View all available products on the public products page
- Add, update, and delete products from the admin dashboard
- Search products by name on the buy product page

### Order Module
- Users can search for a product, select a quantity, and place an order
- Order total is calculated automatically based on price and quantity
- Order history is displayed on the buy product page and in the admin dashboard

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.1.3
- Spring Data JPA (Hibernate)
- MySQL 8.0
- Maven

### Frontend
- React 19
- React Router DOM
- Axios (HTTP client)
- Vite (build tool)

## Project Structure

```
Business Management/
├── Business_Management_Project/     # Spring Boot backend
│   ├── src/main/java/com/business/
│   │   ├── api/                     # REST controllers for the React frontend
│   │   ├── controllers/             # Thymeleaf controllers (original)
│   │   ├── entities/                # JPA entities (Admin, User, Product, Orders)
│   │   ├── repositories/            # Spring Data repositories
│   │   ├── services/                # Business logic layer
│   │   ├── config/                  # CORS configuration
│   │   └── basiclogics/             # Utility classes
│   └── src/main/resources/
│       └── application.properties   # Database and server configuration
│
├── frontend/                        # React frontend
│   ├── src/
│   │   ├── components/              # Reusable components (Navbar)
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API service layer (Axios)
│   │   ├── App.jsx                  # Routes and layout
│   │   └── index.css                # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Setup and Installation

### Prerequisites
- Java 21 (JDK)
- Node.js (v18 or above)
- MySQL 8.0

### Database Setup
1. Start MySQL server
2. Create a database named `businessproject`:
   ```sql
   CREATE DATABASE businessproject;
   ```
3. Update the database credentials in `Business_Management_Project/src/main/resources/application.properties` if your MySQL username or password differs from the defaults.

### Backend
```bash
cd Business_Management_Project
./mvnw spring-boot:run
```
The backend server starts on http://localhost:2330

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server starts on http://localhost:5173

## API Endpoints

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | /api/admin/login      | Admin login             |
| POST   | /api/user/login       | User login              |
| GET    | /api/admin/services   | Admin dashboard data    |
| GET    | /api/products         | List all products       |
| POST   | /api/admin/add        | Add new admin           |
| PUT    | /api/admin/update/:id | Update admin            |
| DELETE | /api/admin/delete/:id | Delete admin            |
| POST   | /api/user/add         | Add new user            |
| PUT    | /api/user/update/:id  | Update user             |
| DELETE | /api/user/delete/:id  | Delete user             |
| POST   | /api/product/add      | Add new product         |
| PUT    | /api/product/update/:id | Update product        |
| DELETE | /api/product/delete/:id | Delete product        |
| POST   | /api/product/search   | Search product by name  |
| POST   | /api/product/order    | Place an order          |
| GET    | /api/user/orders      | Get logged-in user orders |
