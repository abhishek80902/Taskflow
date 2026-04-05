#  TaskFlow – Event-Driven Task Management System

## 📌 Overview

TaskFlow is a full-stack task management system designed to demonstrate **secure authentication, event-driven architecture, hybrid database design, and external service integration**.

The system is built with a production-oriented mindset, focusing on scalability, modularity, and reliability.

It uses:

* **PostgreSQL (Neon)** → User management (structured data)
* **MongoDB** → Task storage (flexible schema)
* **JWT Authentication** → Secure access control

---

## 🧠 Key Features

### 🔐 User Management

* Secure user registration with **bcrypt password hashing**
* Login system with **JWT-based authentication**
* Protected routes with middleware
* Strict **user-level data isolation**

---

### 📋 Task Management

* Create, update, delete, and view tasks
* Partial updates supported
* Tasks linked to authenticated users
* Status management (pending / completed)

---

### 🔔 Event-Driven Reminder System

* Tasks with a **due date automatically schedule reminders**
* Reminder triggers **1 hour before deadline**
* Implemented using an **in-memory scheduler**
* Supports:

  * Rescheduling on update
  * Cancellation on completion

---

### 🏷️ Categories & Tags

* Tasks support **dynamic categorization**
* Multiple **tags (array-based)** per task
* Flexible querying using:

  * category filters
  * tag filters

---

### 🔍 Task Filtering

* Filter tasks using query parameters:

```
GET /api/tasks?category=Work
GET /api/tasks?tags=urgent
```

---

### 🌐 Webhook Integration (External Service Simulation)

* When a task is marked as **completed**, a webhook is triggered
* Sends POST request to external endpoint (e.g., webhook.site)
* Payload includes:

  * task ID
  * title
  * user ID
  * completion timestamp

---

### 🔁 Retry Logic (Reliability)

* Webhook failures are retried automatically
* Uses **exponential backoff strategy**
* Ensures delivery reliability

---

### 🧾 Activity Logging (Bonus Feature)

* Tracks task lifecycle events:

  * creation
  * updates
  * deletion
* Helps in debugging and audit tracking

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js
* Axios (webhook integration)
* express-validator

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

---

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

4. Middleware verifies user identity

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
WEBHOOK_URL=your_webhook_url
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
* Create tasks with due date, category, and tags
* View and filter tasks
* Update and delete tasks
* Mark task as completed → triggers webhook
* Observe reminder logs in console
* Attempt unauthorized access (should fail)

---

## ⚠️ Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Input validation using express-validator
* Environment variable protection

---

## 💡 Design Decisions

* **Hybrid Database Design**
  PostgreSQL for structured data, MongoDB for flexible task schema

* **Event-Driven Architecture**
  Task lifecycle events trigger reminders and webhook processes

* **In-Memory Scheduler**
  Lightweight and efficient for reminder handling

* **Retry Logic for Webhooks**
  Ensures reliability in external communication

* **Modular Architecture**
  Separation of controllers, services, routes, and middleware

---

## 📌 Future Improvements

* Redis-based queue (BullMQ) for scalable job processing
* Real-time notifications (WebSockets)
* Role-based access control
* Dockerized deployment
* CI/CD pipeline integration
