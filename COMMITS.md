# Commit History Example

This document provides examples of how commits should be structured following TDD principles and AI co-authorship requirements.

## Example Commits

### 1. Initial Project Setup

```
feat: Setup backend project structure with Express and MongoDB

- Create package.json with dependencies
- Setup server.js with basic Express app
- Configure MongoDB connection
- Add environment variable configuration

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 2. Authentication - Red Phase (Tests First)

```
test: Add authentication endpoint tests

- Write tests for user registration
- Write tests for user login
- Write tests for JWT token generation
- Setup test environment with Jest and Supertest

Following TDD Red-Green-Refactor cycle.

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 3. Authentication - Green Phase (Implementation)

```
feat: Implement user registration and login endpoints

- Create User model with Mongoose
- Implement password hashing with bcrypt
- Create auth routes for register and login
- Generate JWT tokens
- Add input validation

All tests passing ✅

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 4. Authorization Middleware

```
feat: Add JWT authentication middleware

- Create protect middleware for route protection
- Implement role-based authorization
- Add admin-only middleware
- Secure all sweets endpoints

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 5. Sweets Management - Tests First

```
test: Add sweets CRUD endpoint tests

- Write tests for GET /api/sweets
- Write tests for POST /api/sweets
- Write tests for PUT /api/sweets/:id
- Write tests for DELETE /api/sweets/:id
- Write tests for search functionality

TDD Red phase: Writing failing tests first.

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 6. Sweets Management - Implementation

```
feat: Implement sweets CRUD endpoints

- Create Sweet model with Mongoose
- Implement GET /api/sweets endpoint
- Implement POST /api/sweets endpoint
- Implement PUT /api/sweets/:id endpoint
- Implement DELETE /api/sweets/:id endpoint
- Add search and filter functionality

All tests passing ✅

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 7. Inventory Management

```
feat: Add inventory management endpoints

- Implement purchase endpoint (decrease quantity)
- Implement restock endpoint (admin only)
- Add stock validation
- Prevent negative stock values

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 8. Frontend Setup

```
feat: Setup React frontend with routing

- Create React app structure
- Setup React Router v6
- Create authentication context
- Add API service layer
- Implement protected routes

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 9. Authentication UI

```
feat: Implement login and registration UI

- Create Login component with form
- Create Register component
- Add authentication flow
- Style authentication forms
- Add error handling and validation

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 10. Dashboard Implementation

```
feat: Create sweets dashboard

- Build main dashboard layout
- Display sweets in grid
- Add search and filter functionality
- Implement purchase flow
- Show stock availability

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 11. Admin Features

```
feat: Add admin dashboard features

- Create add/edit sweet modals
- Implement delete functionality
- Add restock functionality
- Style admin controls

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

### 12. Final Polish

```
docs: Add comprehensive README and documentation

- Write main README with setup instructions
- Document all API endpoints
- Add AI usage section
- Include screenshots
- Write deployment guide

Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

## TDD Workflow

### Red-Green-Refactor Pattern

1. **Red**: Write failing tests first
2. **Green**: Implement minimal code to make tests pass
3. **Refactor**: Improve code while keeping tests green

### Example TDD Cycle

```bash
# Red: Write failing test
git commit -m "test: Add test for user registration"

# Green: Implement feature
git commit -m "feat: Implement user registration endpoint"

# Refactor: Improve code
git commit -m "refactor: Improve error handling in registration"
```

## AI Co-authorship

Every commit that used AI tools must include the co-author trailer at the end of the commit message:

```
Co-authored-by: Auto (Cursor AI) <AI@cursor.sh>
```

This demonstrates transparency about AI usage while maintaining clear commit history.
