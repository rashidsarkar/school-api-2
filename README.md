# Bike Servicing Management System

A complete backend solution for managing bike servicing records, customers, and service statuses. This system helps you maintain a seamless workflow for registering bikes, tracking service records, updating statuses, and managing customer information.

🔗 **Live Backend**: [https://bike-servicing-management-a8-fwq1.vercel.app/](https://bike-servicing-management-a8-fwq1.vercel.app/)

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **TypeScript** – Typed superset of JavaScript
- **Prisma ORM** – Type-safe database interaction
- **PostgreSQL** – Database (can be replaced with other relational DBs)
- **Zod** – Request validation
- **HTTP-Status** – Status code management
- **JWT** – For future authentication
- **Cookie-Parser, CORS** – Middleware

---

## ⚙️ Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bike-servicing-management-a8.git
   cd bike-servicing-management-a8
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file with your database URL:

   ```env
   DATABASE_URL=your_postgresql_connection_string
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

- **Customer Management**

  - Create, update, delete, and fetch customer info

- **Bike Management**

  - Register bikes, view all bikes, or get specific bike info

- **Service Record Handling**

  - Add service records, fetch all or specific records
  - Update service status (e.g., mark as complete)

- **Overdue Services Checker**

  - Get services with pending or in-progress status beyond 7 days

- **Validation**

  - Uses Zod for input validation

- **Structured Response**
  - All API responses follow a standard structure

---

## 📁 Folder Structure

```bash
src
├── modules
│   ├── bike
│   ├── customer
│   └── service
├── middleware
├── shared
├── utils
└── server.ts
```

---

## 🔮 Future Improvements

- Add user authentication with roles (admin/user)
- Paginate and search endpoints
- Unit and integration testing
- Add Swagger/OpenAPI documentation
- Frontend integration (optional React app)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

Crafted with ❤️ by [MD Rashid Sarkar](https://github.com/rashidsarkar)
