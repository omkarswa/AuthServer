# Auth & Employee Management System

A robust, enterprise-grade backend for managing employee authentication, tracking, and nested operational data. Built with Node.js, Express, and MongoDB, this project provides a scalable API architecture for employee lifecycle management.

## ✨ Key Features
- **🔑 Secure Authentication**: Tiered access with JWT authentication and salted bcrypt password hashing.
- **📁 Nested Employee Resources**: Complete management of employee-related sub-data including:
  *   **Projects**: Track ongoing, pending, and completed assignments.
  *   **Attendance**: Daily status tracking (Present/Absent).
  *   **Salary History**: Detailed compensation logging.
- **📊 Interactive Dashboard**: Aggregated endpoint providing a 360-degree view of an employee's data.
- **📜 Swagger Documentation**: Integrated, live API documentation for seamless testing and integration.
- **⚙️ Environment-Driven**: Secure configuration using ENV variables.

## 🚀 Setup & Installation
1.  **Clone & Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Configuration**:
    Create a `.env` file and set your `MONGODB_URI`:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 📖 API Documentation (Swagger)
The project includes a built-in Swagger UI for easy exploration of all available endpoints.

- **URL**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

> [!NOTE]
> All employee-related endpoints require an `Authorization` header with a valid JWT token. Use the Auth endpoints to generate your token.

## 📡 API Endpoints Summary

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate and receive a JWT token |

### 2. Base Employee CRUD (`/api/employees`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Fetch all employees |
| `POST` | `/` | Create a new employee record |
| `PUT` | `/:id` | Update employee information |
| `DELETE` | `/:id` | Soft/Hard delete an employee |

### 3. Nested Employee Operations (`/api/employees/:id/...`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/dashboard` | Fetch aggregated dashboard data |
| `GET/POST` | `/projects` | Manage employee projects |
| `GET/POST` | `/attendance` | Track employee attendance |
| `GET/POST` | `/salary-history` | Manage salary records |

## 🧪 Testing with Postman/Swagger
To maintain data integrity and follow standard development practices, this server **does not use seed data**. 

1.  **Register** a new user.
2.  **Login** to get your token.
3.  Add your token to **Authorize** in Swagger or the **Bearer Token** field in Postman.
4.  Begin creating and managing employees!

---
*Built with ❤️ for a professional backend learning experience.*
