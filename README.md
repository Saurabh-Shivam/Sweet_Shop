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

## 🤖 My AI Usage

This section documents how AI tools were leveraged during the development of this project, in accordance with the requirements.

### AI Tools Used

#### **Cursor AI (Auto - Agent Router)**

- **Primary Tool**: Used extensively throughout the entire development process
- **Usage Context**: Development environment and code generation

### How AI Was Used

#### 1. Project Setup and Structure

- **AI Assistance**: Generated initial project structure and boilerplate code
- **Specific Use**: Created package.json files, directory structures, and initial configuration files for both backend and frontend

#### 2. Backend Development

- **AI Assistance**:

  - Generated Express server setup with MongoDB connection
  - Created Mongoose models (User, Sweet) with proper schemas and validation
  - Implemented JWT authentication middleware and route protection
  - Built REST API routes for authentication and sweets management
  - Generated comprehensive test suites following TDD principles

- **Specific Examples**:
  - Asked AI to generate middleware for JWT authentication and role-based authorization
  - Used AI to create test cases covering all endpoints and edge cases
  - Leveraged AI for input validation and error handling patterns

#### 3. Frontend Development

- **AI Assistance**:

  - Generated React component structure and routing setup
  - Created authentication forms and protected route components
  - Built API service layer with axios interceptors
  - Developed Context API for state management
  - Designed modern UI components with CSS styling

- **Specific Examples**:
  - Requested AI to generate React components following best practices
  - Used AI to implement authentication flow and token management
  - Leveraged AI for responsive design and CSS styling

#### 4. Testing and Quality Assurance

- **AI Assistance**:

  - Generated comprehensive test suites for all backend endpoints
  - Created test cases covering success scenarios, error handling, and edge cases
  - Implemented test setup and configuration for Jest and Supertest

- **Specific Examples**:
  - Asked AI to write tests for authentication flows including token generation
  - Used AI to create tests for CRUD operations and inventory management
  - Leveraged AI to generate tests for role-based access control

#### 5. Documentation

- **AI Assistance**:
  - Generated comprehensive README documentation
  - Created API documentation with examples
  - Wrote installation and usage instructions

### Reflection on AI Usage

#### Positive Impacts

1. **Productivity**: AI significantly accelerated development by generating boilerplate code and standard patterns, allowing focus on business logic and architecture decisions.

2. **Best Practices**: AI-generated code followed modern practices and conventions, helping maintain consistency across the codebase.

3. **Learning**: Interacting with AI provided educational insights into different approaches and patterns.

4. **Quality**: AI-assisted with test case generation and error handling, improving overall code reliability.

#### Challenges and Learnings

1. **Review Required**: All AI-generated code required careful review to ensure it met project requirements and security standards.

2. **Context Understanding**: AI sometimes needed clarification or refinement to match specific project needs.

3. **Over-Reliance Risk**: Had to balance AI assistance with manual implementation to maintain deep understanding of the codebase.

#### Responsible Usage

- **Code Review**: All AI-generated code was thoroughly reviewed and tested before committing
- **Security**: Manually implemented security-critical sections like authentication and authorization
- **Testing**: Verified all AI-generated tests actually worked and added additional tests as needed
- **Understanding**: Ensured deep comprehension of every piece of code in the project

### AI Co-authorship

As per requirements, commits that heavily utilized AI tools include co-author attribution in commit messages:

```
Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

## 📸 Screenshots

### Login Page

![Login Page](screenshots/login.png)

### Dashboard - Admin View

![Dashboard](screenshots/dashboard.png)

### Add Sweet Modal

![Add Sweet](screenshots/add-sweet.png)

### Sweet Catalog

![Catalog](screenshots/catalog.png)

_(Note: Replace with actual screenshots when available)_

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create sweet-shop-api
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
cd frontend
vercel
```

Update `REACT_APP_API_URL` to point to your deployed backend.

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

Your Name - [Your Email](mailto:your.email@example.com)

## 🙏 Acknowledgments

- MongoDB for the excellent database platform
- Express.js team for the great backend framework
- React team for the amazing frontend library
- All open-source contributors who made the dependencies possible

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

**Built with ❤️ using MERN Stack**
