# 🚀 TaskFlow API – Full Stack Task Management System

## 📌 Overview

TaskFlow is a full-stack task management application built to demonstrate secure authentication, hybrid database architecture, and RESTful API design.

The system uses:

* **PostgreSQL (Neon)** for user management
* **MongoDB** for task storage
* **JWT Authentication** for secure access

This project follows production-level backend practices and is designed with scalability and clean architecture in mind.

---

## 🧠 Key Features

### 🔐 User Management

* User registration with hashed passwords (bcrypt)
* Secure login with JWT authentication
* Protected routes using middleware
* User-specific data isolation

### 📋 Task Management

* Create tasks
* View all tasks (user-specific)
* Update tasks (partial updates supported)
* Delete tasks
* Each task is securely linked to its owner

### 🗄️ Hybrid Database Architecture

* PostgreSQL → Structured user data
* MongoDB → Flexible task data

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router DOM

---

## ⚙️ Project Structure

```
taskflow/
├── taskflow-api/        # Backend (Node + Express)
├── taskflow-ui/         # Frontend (React)
```

---

## 🔑 API Endpoints

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

### Task Routes

```
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT
2. Token stored in frontend
3. Token sent in headers:

```
Authorization: Bearer <token>
```

4. Middleware verifies user access

---

## 🚀 Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd taskflow
```

---

### 2. Backend Setup

```
cd taskflow-api
npm install
```

Create `.env`:

```
PORT=5000
JWT_SECRET=your_secret

PG_URI=your_neon_postgres_uri
MONGO_URI=your_mongodb_uri
```

Run backend:

```
node src/server.js
```

---

### 3. Frontend Setup

```
cd taskflow-ui
npm install
npm run dev
```

---

## 🧪 Testing the Application

* Register a new user
* Login and receive JWT
* Create tasks
* View tasks
* Delete tasks
* Try accessing another user's task (should fail)

---

## ⚠️ Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Environment variables for sensitive data

---

## 💡 Design Decisions

* **Hybrid DB approach**: SQL for structured data, NoSQL for flexibility
* **JWT authentication**: Stateless and scalable
* **Modular architecture**: Controllers, routes, middleware separation

---

## 📌 Future Improvements

* Task status toggle (pending/completed)
* Due date & reminders
* Role-based access
* Docker deployment
* CI/CD integration
