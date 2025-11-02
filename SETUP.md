# Quick Start Guide

This guide will help you get the Sweet Shop Management System up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (comes with Node.js)

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables

#### Backend

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp env.example .env
```

Edit `.env` with your MongoDB URI:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

#### Frontend

Create a `.env` file in the `frontend` directory:

```bash
cd ../frontend
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running on your system.

**macOS (Homebrew):**

```bash
brew services start mongodb-community
```

**Windows:**

```bash
net start MongoDB
```

**Linux:**

```bash
sudo systemctl start mongod
```

### 5. Start the Application

You'll need two terminal windows/tabs:

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

You should see:

```
Server is running on port 5000
MongoDB connected successfully
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

## First Steps

1. **Register an Account**

   - Click "Register" on the homepage
   - Fill in username, email, and password
   - Choose a role: "User" or "Admin"
   - Click "Register"

2. **Login**

   - Enter your email and password
   - Click "Login"

3. **Explore**

   - View all sweets in the catalog
   - Use search and filters
   - Purchase sweets (decreases quantity)

4. **Admin Features** (if you chose Admin role)
   - Click "+ Add Sweet" to add new items
   - Edit or delete existing sweets
   - Restock inventory

## Testing the Backend

Run the test suite:

```bash
cd backend
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

View test coverage:

```bash
npm test -- --coverage
```

## Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoDB connection error`

**Solution:**

- Ensure MongoDB is running: `mongod` or `brew services list mongodb-community`
- Check your MongoDB URI in `.env`
- Verify MongoDB is accessible on port 27017

### Port Already in Use

**Problem:** `Port 5000 is already in use`

**Solution:**

- Change the PORT in `backend/.env` to a different port (e.g., 5001)
- Update `REACT_APP_API_URL` in `frontend/.env` to match

### CORS Errors

**Problem:** CORS errors in browser console

**Solution:**

- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache and hard reload

### Tests Failing

**Problem:** Tests not connecting to database

**Solution:**

- Ensure MongoDB is running
- Check `MONGODB_TEST_URI` in test files if needed
- Tests use a separate test database by default

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the [API Documentation](README.md#api-documentation)
- Check out [My AI Usage](README.md#my-ai-usage) section
- Review the [Project Structure](README.md#project-structure)

## Need Help?

- Check the [main README](README.md) for more details
- Review the [backend README](backend/README.md)
- Review the [frontend README](frontend/README.md)
- Open an issue in the repository
