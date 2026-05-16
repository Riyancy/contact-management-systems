# 📋 ContactHub — Contact Management System

A full-stack web application for managing personal and professional contacts efficiently. Built with Node.js, Express.js, MongoDB, and React.js.

---

## 📌 Problem Description

In both personal and professional settings, managing contact information is a daily necessity. People often struggle with:

- Scattered contact data across different platforms
- No central place to store and retrieve contact details quickly
- Difficulty updating or removing outdated contact information
- No visibility into active vs inactive contacts
- No security or authentication to protect contact data

---

## 💡 Proposed Solution

ContactHub is a secure, centralized Contact Management System that allows users to register, login with JWT authentication, and manage contact records through a clean web interface. It provides a RESTful API backend powered by Node.js and Express.js, with MongoDB as the database, and a modern React.js frontend for a seamless user experience.

---

## ✨ Features

- 🔐 JWT-based user authentication (Login / Register)
- ➕ Add new contacts with ID, name, email, phone, and address
- 📋 View all contacts in Table view or Grid view
- ✏️ Edit existing contact information
- 🗑️ Delete contacts with confirmation dialog
- 🔍 Search contacts by name, email, phone, or ID
- 📊 Filter contacts by Active / Inactive status
- 📈 Live stats showing Total, Active, and Inactive counts
- ✅ Phone number validation — exactly 10 digits only
- 🔔 Toast notifications for all actions
- 🛡️ Protected routes using JWT middleware
- ⚠️ Proper error handling and validation responses

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Hashing | bcryptjs |
| Environment Config | dotenv |
| Frontend | React.js + Vite |
| HTTP Client | Axios |
| API Testing | Postman |
| Version Control | GitHub |

---

## 📁 Project Structure

```
Contact Management Systems/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Login & Register logic
│   └── contactController.js   # CRUD logic for contacts
├── middleware/
│   └── auth.js                # JWT token verification
├── models/
│   ├── User.js                # User schema
│   └── Contact.js             # Contact schema
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── contactRoutes.js       # Contact endpoints
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── index.js                   # Main server entry point
├── package.json
└── README.md

contact-manager-frontend/
├── src/
│   ├── api/
│   │   └── api.js             # Axios API calls
│   ├── context/
│   │   └── AuthContext.jsx    # JWT token state
│   ├── components/
│   │   ├── ContactModal.jsx       # Create/Edit modal
│   │   ├── ConfirmModal.jsx       # Delete confirmation
│   │   ├── ProtectedRoute.jsx     # Route protection
│   │   └── Toast.jsx              # Notifications
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   └── Contacts.jsx       # Main dashboard
│   ├── App.jsx                # Routes
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔗 API Endpoints

Base URL: `http://localhost:5000`

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT token | No |

### Contact Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/contacts/create` | Create a new contact | Yes |
| GET | `/contacts/getAllContacts` | Get all contacts | Yes |
| PUT | `/contacts/:id` | Update contact by ID | Yes |
| DELETE | `/contacts/:id` | Delete contact by ID | Yes |

---

## 📨 API Request & Response Examples

### Register
```
POST http://localhost:5000/auth/register
Content-Type: application/json
```
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
Response:
```json
{
  "message": "User created"
}
```

---

### Login
```
POST http://localhost:5000/auth/login
Content-Type: application/json
```
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Create Contact
```
POST http://localhost:5000/contacts/create
Authorization: <your_token>
Content-Type: application/json
```
```json
{
  "contactId": "C-001",
  "name": "Riyancy Ithayathas",
  "email": "riyancy@example.com",
  "phone": "0767950225",
  "address": "Mannar, Sri Lanka",
  "status": "active"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "_id": "664abc123...",
    "contactId": "C-001",
    "name": "Riyancy Ithayathas",
    "email": "riyancy@example.com",
    "phone": "0767950225",
    "address": "Mannar, Sri Lanka",
    "status": "active",
    "createdAt": "2026-05-16T10:00:00.000Z"
  }
}
```

---

### Get All Contacts
```
GET http://localhost:5000/contacts/getAllContacts
Authorization: <your_token>
```
Response:
```json
{
  "success": true,
  "message": "Contacts fetched successfully",
  "data": [...]
}
```

---

### Update Contact
```
PUT http://localhost:5000/contacts/<id>
Authorization: <your_token>
Content-Type: application/json
```
```json
{
  "name": "Riyancy I.",
  "phone": "0771234567",
  "status": "inactive"
}
```
Response:
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {...}
}
```

---

### Delete Contact
```
DELETE http://localhost:5000/contacts/<id>
Authorization: <your_token>
```
Response:
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Edition)
- [Postman](https://www.postman.com/downloads/) (for API testing)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/Riyancy/contact-management-system.git
cd contact-management-system
```

---

## 🚀 How to Run the Project

### 1. Run the Backend

```bash
npm install express mongoose jsonwebtoken bcryptjs dotenv body-parser cors
```

Create a `.env` file in the root folder:
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/contact
JWT_SECRET=secretkey
```

Start the backend:
```bash
node index.js
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### 2. Create First User

Using Postman:
```
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### 3. Run the Frontend

Open a new terminal:
```bash
cd contact-manager-frontend
npm install
npm run dev
```

Open browser and go to:
```
http://localhost:3000
```

Login with:
```
Email:    admin@example.com
Password: admin123
```

---

## 📝 Data Models

### User
```json
{
  "email": "string (unique, required)",
  "password": "string (hashed with bcrypt)"
}
```

### Contact
```json
{
  "contactId": "string (required)",
  "name":      "string (required)",
  "email":     "string (required, unique)",
  "phone":     "string (required, exactly 10 digits)",
  "address":   "string (required)",
  "status":    "string (active / inactive)",
  "createdAt": "date (auto)"
}
```

---

## 🌐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend port | `5000` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/contact` |
| `JWT_SECRET` | Secret key for JWT | `secretkey` |

---

## 👤 Author

**Riyancy Ithayathas**
2nd Year IT Student
Module: Web Services and Technology (IT2234)
ICA-03 Project Assignment
