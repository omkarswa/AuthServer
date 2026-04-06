# Auth & Employee Management Backend

A professional backend application built with Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Signup and Login with JWT and password hashing (bcrypt).
- **Password Validation**: Enforces 8-character minimum.
- **Employee CRUD**: Full management for employee records.
- **Employee Tracking**: Track status (IN/OUT), current projects, and salary.
- **ProtectedRoute**: Employee APIs are secured with JWT.

## Setup Instructions
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Configure environment**: 
    Update the `MONGODB_URI` in the `.env` file to your MongoDB connection string.
3.  **Run Development server**:
    ```bash
    npm run dev
    ```

## API Endpoints

### 1. Authentication (`/api/auth`)
- **Signup**: `POST /api/auth/signup`
  - Body: `{ "username": "admin", "email": "admin@example.com", "password": "password123" }`
- **Login**: `POST /api/auth/login`
  - Body: `{ "username": "admin", "password": "password123" }`

### 2. Employee CRUD (`/api/employees`)
*Note: All these routes require `Authorization: Bearer <TOKEN>` header obtained from Login.*

- **Get All**: `GET /api/employees`
- **Create**: `POST /api/employees`
  - Body: `{ "name": "John Doe", "status": "IN", "currentProject": "Project Alpha", "salary": 5000, "email": "john@example.com" }`
- **Update**: `PUT /api/employees/:id`
  - Body: `{ "status": "OUT", "currentProject": "Project Beta" }`
- **Delete**: `DELETE /api/employees/:id`

## Validation Rules
- **Password**: Minimum 8 characters.
- **Employee Status**: Must be `'IN'` or `'OUT'`.
- **Salary**: Cannot be negative.
