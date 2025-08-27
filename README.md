# School Management System

A complete backend solution for managing users, students, classes, and authentication. This system allows administrators and teachers to manage student data, enroll students into classes, and handle secure authentication with role-based access.

🔗 **Live Backend**: _((https://school-server-rosy.vercel.app/))_

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **TypeScript** – Typed superset of JavaScript
- **Prisma ORM** – Type-safe database interaction
- **PostgreSQL** – Database (can be replaced with other relational DBs)
- **Zod** – Request validation
- **HTTP-Status** – Status code management
- **JWT** – Authentication and authorization
- **Cookie-Parser, CORS** – Middleware

---

## ⚙️ Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file:

   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

---

## ✨ Key Features

- **User Management**

  - Create users with roles (Admin, Teacher)
  - Role-based access control for endpoints

- **Student Management**

  - Add, update, delete, and fetch students
  - Admin and Teacher can view all students

- **Class Management**

  - Create classes, enroll students
  - Fetch all students in a specific class

- **Authentication**

  - Login with JWT
  - Token refresh functionality
  - Middleware for role-based authorization

- **Validation & Error Handling**

  - Zod for request validation
  - Global error handling for Prisma, JWT, Zod, and custom errors

- **Structured API Response**

  - Standardized responses for success and error

---

## 📁 Folder Structure

```bash
src
├── middleware
│   ├── globalErrorHandler.ts
│   └── validatedRequest.ts
├── modules
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   ├── classes
│   │   ├── class.controller.ts
│   │   ├── class.route.ts
│   │   ├── class.service.ts
│   │   └── class.validation.ts
│   ├── student
│   │   ├── student.constant.ts
│   │   ├── student.controller.ts
│   │   ├── student.route.ts
│   │   └── student.service.ts
│   └── user
│       ├── user.controller.ts
│       ├── user.route.ts
│       ├── user.service.ts
│       └── user.validation.ts
├── routes
│   └── index.ts
├── shared
│   ├── catchasync.ts
│   ├── pick.ts
│   └── prisma.ts
├── types
├── utils
│   ├── AppError.ts
│   ├── generateToken.ts
│   └── sendResponse.ts
├── app.ts
└── server.ts
```

---

## 🔮 Future Improvements

- Add pagination and search endpoints
- Unit and integration testing
- Swagger/OpenAPI documentation
- Frontend integration (React/Next.js app)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

Crafted with ❤️ by [MD Rashid Sarkar](https://github.com/rashidsarkar)
