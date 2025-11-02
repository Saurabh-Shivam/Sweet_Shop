# Quick Reference Guide

Essential commands and shortcuts for working with the Sweet Shop Management System.

## 🚀 Startup Commands

### Backend

```bash
cd backend
npm install         # First time only
npm run dev         # Development mode with auto-reload
npm start           # Production mode
```

### Frontend

```bash
cd frontend
npm install         # First time only
npm start           # Development mode
```

### Testing

```bash
cd backend
npm test            # Run all tests
npm run test:watch  # Watch mode
npm test -- --coverage  # With coverage report
```

## 🔧 Environment Setup

### Backend .env

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

### Frontend .env

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🗄 MongoDB Commands

```bash
# macOS (Homebrew)
brew services start mongodb-community
brew services stop mongodb-community
brew services list

# Windows
net start MongoDB
net stop MongoDB

# Linux
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl status mongod
```

## 🧪 Common Testing Scenarios

### Create a User

```bash
POST http://localhost:5000/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get All Sweets

```bash
GET http://localhost:5000/api/sweets
Headers: Authorization: Bearer <token>
```

### Add a Sweet (Admin)

```bash
POST http://localhost:5000/api/sweets
Headers: Authorization: Bearer <admin-token>
{
  "name": "Chocolate Bar",
  "category": "chocolate",
  "price": 10.50,
  "quantity": 100
}
```

### Purchase a Sweet

```bash
POST http://localhost:5000/api/sweets/{id}/purchase
Headers: Authorization: Bearer <token>
{
  "quantity": 1
}
```

## 🐛 Troubleshooting

| Problem                  | Solution                                          |
| ------------------------ | ------------------------------------------------- |
| MongoDB connection error | Check if MongoDB is running: `brew services list` |
| Port 5000 in use         | Change PORT in backend/.env                       |
| CORS errors              | Ensure backend .env has correct settings          |
| Tests failing            | Check MONGODB_URI for test database               |
| Module not found         | Run `npm install` in backend/frontend             |
| Token expired            | Login again to get new token                      |

## 📊 Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/

## 📁 Key Files

### Backend

- `src/server.js` - Main server file
- `src/models/` - Database models
- `src/routes/` - API endpoints
- `src/middleware/auth.js` - JWT middleware
- `tests/` - Test files

### Frontend

- `src/App.js` - Main app component
- `src/components/` - React components
- `src/services/api.js` - API service
- `src/context/AuthContext.js` - Auth state

## 🎯 Development Workflow

1. **Start MongoDB**

   ```bash
   brew services start mongodb-community
   ```

2. **Start Backend** (Terminal 1)

   ```bash
   cd backend && npm run dev
   ```

3. **Start Frontend** (Terminal 2)

   ```bash
   cd frontend && npm start
   ```

4. **Run Tests** (Terminal 3, optional)
   ```bash
   cd backend && npm test
   ```

## 🔍 Useful Search Commands

```bash
# Find all API routes
grep -r "router\." backend/src/routes/

# Find all models
find backend/src/models -name "*.js"

# Find all components
find frontend/src/components -name "*.js"

# Find environment variables
grep -r "process.env" backend/src frontend/src
```

## 📦 Build Commands

### Frontend Build

```bash
cd frontend
npm run build      # Creates optimized production build
```

### Backend Production

```bash
cd backend
NODE_ENV=production npm start
```

## 🔐 Default Test Users

Create these users for testing:

**Admin User:**

- Username: admin
- Email: admin@example.com
- Password: admin123
- Role: admin

**Regular User:**

- Username: testuser
- Email: test@example.com
- Password: test123
- Role: user

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: Your feature description"

# Push to remote
git push origin feature/your-feature

# Create pull request
```

## 🎨 Styling Guidelines

- Use CSS modules or styled-components
- Follow mobile-first responsive design
- Use consistent color scheme
- Maintain accessibility standards

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Installation guide
- `COMMITS.md` - Commit examples
- `PROJECT_SUMMARY.md` - Project overview
- `QUICK_REFERENCE.md` - This file

---

**Quick Tip**: Keep this file handy while developing!
