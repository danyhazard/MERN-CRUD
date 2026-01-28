# MERN Internal System

Enterprise-style internal system built with the **MERN Stack**, focused on user management, roles, permissions, and designed to be easily extended with additional modules such as billing.

The project is structured as a **monorepo**, with decoupled deployments for frontend and backend, and Docker support for local development.

---

## 🧱 Architecture

```text
[ React + Vite ]  →  Netlify
        |
        v
[ Node + Express API ] → Render
        |
        v
[ MongoDB Atlas ]
```

* **Frontend**: React + Vite
* **Backend**: Node.js + Express
* **Database**: MongoDB Atlas
* **Authentication**: JWT
* **Authorization**: Role-Based Access Control (RBAC)
* **Local development**: Docker Compose

---

## 📁 Project Structure

```text
mern-internal-system/
├── frontend/          # React + Vite (Netlify)
├── backend/           # Node + Express (Render)
├── docker-compose.yml # Local development
├── README.md
```

---

## 🔐 Authentication & Authorization

* Authentication handled via **JSON Web Tokens (JWT)**
* Each user is assigned a **role**
* Each role defines a list of **permissions**
* Permissions control:

  * API route access
  * Sidebar/menu visibility
  * Allowed actions (create, edit, delete)

### Permission examples

```text
users:view
users:create
roles:edit
```

---

## 👤 Initial Admin User

Due to limitations of the **Render free plan** (no shell access), initial production data is created manually in **MongoDB Atlas**.


## 🧩 Initial Roles

### Administrator

* users:view
* users:create
* users:edit
* users:delete
* roles:view
* roles:edit

### User

* users:view

Roles and permissions can be managed and edited directly from the admin interface.

---

## 🌍 Environment Variables

### Backend (`backend/.env`)

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/merncrud
JWT_SECRET=super_secret_key
CORS_ORIGIN=https://your-app.netlify.app
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://your-backend.onrender.com
```

⚠️ `.env` files are **not committed to Git**.

---

## 📄 .env.example

### backend/.env.example

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/merncrud
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

### frontend/.env.example

```env
VITE_API_URL=http://localhost:5001
```

---

## 🐳 Local Development with Docker

```bash
docker compose up --build
```

This will start:

* Frontend
* Backend
* MongoDB

---

## 🚀 Deployment

### Frontend

* Platform: **Netlify**
* Base directory: `frontend`
* Build command:

```bash
npm run build
```

* Publish directory:

```text
dist
```

### Backend

* Platform: **Render**
* Root directory: `backend`
* Start command:

```bash
npm start
```

---

## 🧪 Initial Data (Seeding)

The project includes seeding scripts for local development:

```bash
node scripts/createRoles.js
node scripts/createAdmin.js
```

Due to Render free plan limitations (no shell access), initial production data
(admin user and roles) was manually inserted via MongoDB Atlas.

---

## 🎯 Project Purpose

This project was developed as:

* An internal enterprise system
* A portfolio project
* A real-world MERN architecture demonstration
* A scalable role and permission management system

---

## 🧠 Author

Project developed with a focus on best practices, scalability, and architectural clarity.

---

## 📌 Future Improvements

* Billing module
* Action auditing
* Multi-role users
* Security logs
* Automated testing

---

### 🔗 Live Demo

The project is fully deployed and publicly accessible:

🌐 Frontend

Netlify
👉 https://crud-jj.netlify.app

🧠 Backend API

Render
👉 https://mern-crud-gvun.onrender.com

⚠️ Note: The backend is hosted on Render (free tier).
The first request may take 30–60 seconds while the service wakes up.


### Demo admin credentials

```text
Email: admin@empresa.com
Password: 123456
```

⚠️ These credentials are for demo purposes only. It is strongly recommended to change the password after the first login.

---