# Sweet Shop Frontend

A modern React application for managing a sweet shop, built with React Router and Context API.

## Features

- User authentication and registration
- Beautiful, responsive UI design
- Sweet catalog with search and filter
- Purchase functionality
- Admin dashboard for managing sweets
- Real-time inventory management

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Notifications**: React Toastify
- **Styling**: CSS with modern gradients and animations

## Prerequisites

- Node.js (v14 or higher)
- Backend API running on port 5000

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Make sure the backend is running (see backend README)

## Running the Application

### Development Mode

```bash
npm start
```

The application will open at http://localhost:3000

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/          # Login and Register components
│   │   ├── Dashboard/     # Main dashboard
│   │   ├── Layout/        # Navbar
│   │   └── Sweets/        # Sweet cards and forms
│   ├── context/           # Auth context
│   ├── services/          # API service
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Features Breakdown

### Authentication

- User registration with validation
- Login with JWT tokens
- Protected routes
- Role-based access control

### Dashboard

- Grid layout for sweets display
- Search by name
- Filter by category
- Filter by price range
- Real-time inventory updates

### Admin Features

- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory

### User Features

- View all sweets
- Search and filter
- Purchase sweets (decreases quantity)
- View stock availability

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```
