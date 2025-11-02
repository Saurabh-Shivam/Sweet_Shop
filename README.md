# 🍬 Sweet Shop Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing a sweet shop with user authentication, inventory management, and a beautiful modern UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [My AI Usage](#my-ai-usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Backend

- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ JWT-based authentication and authorization
- ✅ User roles (Admin/User)
- ✅ CRUD operations for sweets management
- ✅ Search and filter functionality
- ✅ Inventory management (purchase/restock)
- ✅ Comprehensive test suite with Jest
- ✅ Clean architecture with middleware
- ✅ Input validation

### Frontend

- ✅ Modern React 18 SPA
- ✅ Beautiful responsive UI design
- ✅ User authentication & registration
- ✅ Protected routes
- ✅ Sweet catalog with search & filters
- ✅ Real-time inventory updates
- ✅ Admin dashboard for management
- ✅ Toast notifications
- ✅ Context API for state management

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Testing**: Jest, Supertest
- **Development**: Nodemon

### Frontend

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3 (with modern gradients)
- **Notifications**: React Toastify
- **Build Tool**: Create React App

## 🏗 Architecture

This application follows a clean, modular architecture:

```
┌─────────────────┐
│   React Client  │
│   (Port 3000)   │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express Server │
│   (Port 5000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │
│  (Port 27017)   │
└─────────────────┘
```

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd incubyte
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### Step 6: Start the Application

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## ⚙️ Configuration

### MongoDB

You can use either:

1. **Local MongoDB**: Install MongoDB Community Edition
2. **MongoDB Atlas**: Create a free cluster and update `MONGODB_URI` in `.env`

### Authentication

JWT tokens expire after 7 days by default. You can modify this in `backend/.env`:

```env
JWT_EXPIRE=7d  # Can be changed to '1h', '24h', etc.
```

## 🎮 Usage

### Initial Setup

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Choose a role: "User" or "Admin"
4. Login with your credentials

### User Flow

**Regular Users:**

1. Browse all sweets in the catalog
2. Use search and filters to find specific items
3. Purchase sweets (decreases stock)
4. View current inventory

**Admin Users:**

- All regular user capabilities, plus:

1. Add new sweets via "+ Add Sweet" button
2. Edit existing sweets
3. Delete sweets
4. Restock inventory
5. View full dashboard

### API Testing

You can test the API using Postman or curl:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🧪 Testing

### Backend Tests

Run the test suite:

```bash
cd backend
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm test -- --coverage
```

### Test Coverage

The backend includes comprehensive tests covering:

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Sweet CRUD operations
- ✅ Search and filter functionality
- ✅ Purchase and restock operations
- ✅ Role-based authorization
- ✅ Input validation
- ✅ Error handling

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`

Register a new user.

**Request:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "admin"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": { ... }
  }
}
```

#### POST `/api/auth/login`

Login user.

**Request:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": { ... }
  }
}
```

### Sweets Endpoints

All sweets endpoints require authentication (JWT token in header).

#### GET `/api/sweets`

Get all sweets.

#### GET `/api/sweets/search?name=&category=&minPrice=&maxPrice=`

Search sweets with filters.

#### POST `/api/sweets`

Create a new sweet. **(Admin only)**

**Request:**

```json
{
  "name": "string",
  "category": "chocolate" | "candy" | "dessert" | "biscuit" | "other",
  "price": "number",
  "quantity": "number",
  "description": "string"
}
```

#### PUT `/api/sweets/:id`

Update a sweet.

#### DELETE `/api/sweets/:id`

Delete a sweet. **(Admin only)**

### Inventory Endpoints

#### POST `/api/sweets/:id/purchase`

Purchase a sweet (decrease quantity).

**Request:**

```json
{
  "quantity": "number"
}
```

#### POST `/api/sweets/:id/restock`

Restock a sweet (increase quantity). **(Admin only)**

**Request:**

```json
{
  "quantity": "number"
}
```

## 📁 Project Structure

```
incubyte/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Sweet.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── sweets.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── sweets.test.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── jest.config.js
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   └── Dashboard.css
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Navbar.css
│   │   │   └── Sweets/
│   │   │       ├── SweetCard.js
│   │   │       └── SweetForm.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
└── README.md
```

---

## 🧠 My AI Usage

### 🛠️ Tools I Used

I used AI tools throughout this project to boost productivity and maintain clean, consistent code. The main ones were:

* **Cursor AI (Auto-Agent Router)** – My primary coding assistant, used for project setup, code generation, and debugging.
* **GPT-5** – Used as a secondary tool for clarifying concepts, exploring different solutions, and improving implementation details.

---

### ⚙️ What AI Did vs What I Did

#### **Backend (≈ 60% AI / 40% Me)**

**AI helped with:**

* Setting up the Express server and connecting it to MongoDB
* Generating Mongoose models, controller structures, and validation logic
* Creating JWT middleware and route protection
* Writing initial test suites using Jest and Supertest

**I handled:**

* Designing the database schema and defining relationships
* Implementing actual business logic and API workflows
* Configuring authentication and authorization securely
* Debugging, refining, and testing every endpoint manually

#### **Frontend (≈ 75% AI / 25% Me)**

**AI helped with:**

* Generating React component structure and routing setup
* Setting up Context API and axios service layer
* Creating form validation and authentication flow
* Building responsive layouts and base CSS styling

**I handled:**

* Designing the UI/UX flow and choosing the color palette
* Optimizing performance and ensuring responsiveness
* Testing and refining user interactions across devices
* Fine-tuning layout consistency and accessibility

---

### 💡 How I Used AI

My usual workflow started with prompting AI to scaffold parts of the project — for example, *“create an authentication service with register and login routes.”* Then I’d go through the generated code, understand how it worked, and modify it according to the project’s exact requirements.

For debugging, I often pasted error logs and asked for insights. Sometimes the AI’s fix worked perfectly; other times, it pointed me in the right direction, and I solved it manually.

---

### 🚀 What I Learned

AI was a huge time-saver for repetitive or boilerplate-heavy tasks like setting up routes, writing schemas, or configuring tests. It easily sped up my workflow by 3–4x in those areas.

That said, I learned that AI isn’t a replacement for understanding. Every piece of AI-generated code needed review — especially for authentication, validation, and business logic. Balancing AI’s efficiency with manual oversight ensured the final code was secure, optimized, and maintainable.

The best results came from collaboration — letting AI handle structure and repetition while I focused on design, logic, and making sure everything worked together seamlessly.

---

## 📸 Screenshots

### Login Page

<img width="1890" height="866" alt="Screenshot 2025-11-02 224152" src="https://github.com/user-attachments/assets/a60fbea9-4ece-4802-b404-6c98e8569506" />

<img width="1909" height="860" alt="Screenshot 2025-11-02 224158" src="https://github.com/user-attachments/assets/21abb036-24c5-4235-9014-6d8c1b29014a" />


### Dashboard - Admin View

![Dashboard](screenshots/dashboard.png)

### Add Sweet Modal

<img width="1871" height="857" alt="Screenshot 2025-11-02 224328" src="https://github.com/user-attachments/assets/c955429f-f16a-46d8-a5c4-d0a870cb6f89" />


### Sweet Catalog

<img width="1763" height="852" alt="Screenshot 2025-11-02 224233" src="https://github.com/user-attachments/assets/74b4cfdc-d780-4ed7-b1a9-57654dd15b7b" />

<img width="1880" height="952" alt="Screenshot 2025-11-02 224345" src="https://github.com/user-attachments/assets/7208060f-fb09-4f38-80a3-4ea8e1a86a15" />

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

Saurabh Shivam - [My Email](mailto:saurabhshivam012@gmail.com)

## 🙏 Acknowledgments

- MongoDB for the excellent database platform
- Express.js team for the great backend framework
- React team for the amazing frontend library
- All open-source contributors who made the dependencies possible

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

**Built with ❤️ using MERN Stack by Saurabh Shivam**
