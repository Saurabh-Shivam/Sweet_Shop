# 🚀 Getting Started with Sweet Shop Management System

Welcome! This guide will help you get up and running with the Sweet Shop Management System in minutes.

## Quick Start (5 Minutes)

### 1️⃣ Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 2️⃣ Configure Environment

**Backend:** Copy the example environment file

```bash
cd backend
cp env.example .env
```

Edit `.env` and ensure MongoDB URI is correct:

```env
MONGODB_URI=mongodb://localhost:27017/sweet-shop
```

**Frontend:** Create `.env` file

```bash
cd frontend
```

Create a file named `.env` with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running on your system.

**macOS:**

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

### 4️⃣ Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Wait for: `✓ MongoDB connected successfully`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Browser opens: http://localhost:3000

### 5️⃣ Create an Account

1. Click "Register"
2. Enter username, email, password
3. Choose "User" or "Admin" role
4. Click "Register"
5. You're in! 🎉

## What's Included?

### Backend API

- ✅ User authentication with JWT
- ✅ Role-based access (Admin/User)
- ✅ Sweet CRUD operations
- ✅ Search and filtering
- ✅ Inventory management
- ✅ Comprehensive tests

### Frontend UI

- ✅ Beautiful responsive design
- ✅ Login/Register forms
- ✅ Sweet catalog
- ✅ Search and filter
- ✅ Purchase functionality
- ✅ Admin dashboard

## Next Steps

### Run Tests

```bash
cd backend
npm test
```

### Explore Features

**As a User:**

- Browse all sweets
- Search by name
- Filter by category
- Filter by price
- Purchase items

**As an Admin:**

- All user features, plus:
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory

## Documentation

Need more help? Check out:

- 📖 **README.md** - Full documentation
- 🔧 **SETUP.md** - Detailed setup guide
- ⚡ **QUICK_REFERENCE.md** - Common commands
- ✅ **PROJECT_CHECKLIST.md** - Feature checklist
- 🤖 **README.md (AI Usage section)** - AI documentation

## Troubleshooting

### "MongoDB connection error"

```bash
# Check if MongoDB is running
brew services list  # macOS
```

### "Port 5000 already in use"

Edit `backend/.env` and change PORT to 5001
Update `frontend/.env` to use port 5001

### "Cannot find module"

```bash
# Delete and reinstall
rm -rf node_modules
npm install
```

### CORS errors

- Ensure backend is running
- Check .env files are configured correctly

## API Testing

Test the API with curl or Postman:

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## Architecture

```
React App (3000) → Express API (5000) → MongoDB (27017)
     ↓                    ↓                    ↓
  Frontend UI      Backend Logic        Database
```

## Tech Stack Quick Reference

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Jest
**Frontend:** React 18, React Router, Axios, Context API, CSS3

## Support

- 📚 Read the full README.md
- 🔍 Check SETUP.md for installation issues
- ⚡ Use QUICK_REFERENCE.md for commands
- 📝 Review documentation files

## Ready to Go! 🎉

Your Sweet Shop Management System is ready. Happy coding!

---

**Built with ❤️ using MERN Stack**
