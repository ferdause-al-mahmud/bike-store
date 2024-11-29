# 🚴 Bike Store API

The **Bike Store API** is a robust backend service designed to manage bike products, process customer orders, and handle inventory seamlessly. This API supports features like product creation, order placement, real-time stock management, and revenue calculation. It’s built with scalability and flexibility in mind, making it suitable for small bike shops or larger e-commerce platforms.

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

---

## 🎯 About the Project

The Bike Store API provides a backend service for managing bike-related products and customer orders. It allows users to:

- **Manage a collection of bikes** with properties like name, brand, price, category, description, and stock availability.
- **Handle orders** from customers, automatically reducing stock quantities when orders are placed.
- **Calculate total revenue** from all completed orders.
- **Provide real-time inventory management**, ensuring no orders are placed if the stock is insufficient.

---

## 🚀 Features

### 🔹 Product Management

- Add, update, retrieve, and delete bikes.
- Search bikes by `name`, `brand`, or `category` with query parameters.

### 🔹 Order Management

- Place orders with customer details, bike selection, and quantity.
- Automatically adjust inventory levels after each order.
- Prevent orders from being placed if stock is insufficient.

### 🔹 Revenue Calculation

- Calculate total revenue based on the total price of completed orders.

### 🔹 Inventory Management

- Automatically set a product’s `inStock` field to `false` when stock reaches zero.
- Prevent the placement of orders if stock is unavailable.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ORM:** Mongoose
- **API Testing:** Postman / Thunder Client
- **Deployment:** Vercel, or any Node.js hosting service.

---

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ferdause-al-mahmud/bike-store.git
cd bike-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

PORT=The port number for running the API server
DATABASE_URL=The MongoDB connection URL

### 3. 📦 Running the Project

```bash
npm run dev
```
