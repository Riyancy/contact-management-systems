# ContactVault — Contact Management System

A full-stack web application for managing personal and professional contacts efficiently. Built with Node.js, Express.js, MongoDB, and React.js.

---

## Problem Description

In both personal and professional settings, managing contact information is a daily necessity. People often struggle with scattered contact data across different platforms, no central place to store and retrieve contact details quickly, difficulty updating or removing outdated contact information, and no visibility into active vs inactive contacts.

---

## Proposed Solution

ContactVault is a centralized Contact Management System that allows users to create, view, update, and delete contact records through a clean web interface. It provides a RESTful API backend powered by Node.js and Express.js, with MongoDB as the database, and a modern React.js frontend for a seamless user experience.

---

## Features

- Add new contacts with ID, name, email, phone, and address
- View all contacts in a responsive card-based layout
- Edit existing contact information
- Delete contacts with confirmation dialog
- Filter contacts by Active / Inactive status
- Search contacts by name, email, phone, or ID
- Live stats showing Total, Active, and Inactive contact counts
- Form validation with error messages
- Toast notifications for all actions (create, update, delete)
- Fully responsive dark-themed UI

---

## Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB + Mongoose |
| Frontend | React.js + Vite |
| HTTP Client | Axios |
| API Testing | Postman |
| Version Control | GitHub |
| Notifications | react-hot-toast |
| Icons | lucide-react |

---

## Project Structure

```
Contact Management Systems/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js   # CRUD logic
│   ├── models/
│   │   └── Contact.js             # Mongoose schema
│   ├── routes/
│   │   └── contactRoutes.js       # API routes
│   ├── .env                       # Environment variables
│   └── index.js                   # Entry point
│
└── contact-frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx                # Main application
        ├── index.css              # Global styles
        ├── main.jsx               # React entry point
        ├── services/
        │   └── api.js             # Axios API service
        └── components/
            ├── ContactCard.jsx        # Contact card UI
            ├── ContactModal.jsx       # Create/Edit modal
            ├── DeleteConfirmModal.jsx # Delete confirmation
            └── StatsBar.jsx           # Stats dashboard
```

---

## API Endpoints

Base URL: `http://localhost:5000`

### Create a Contact
```
POST /contacts/create
```
**Request Body:**
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
**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "664abc123...",
    "contactId": "C-001",
    "name": "Riyancy Ithayathas",
    "email": "riyancy@example.com",
    "phone": "0767950225",
    "address": "Mannar, Sri Lanka",
    "status": "active",
    "createdAt": "2026-05-10T10:00:00.000Z"
  }
}
```

---

### Get All Contacts
```
GET /contacts/getAllContacts
```
**Response:**
```json
{
  "success": true,
  "message": "Contacts fetched successfully",
  "data": [
    {
      "_id": "664abc123...",
      "contactId": "C-001",
      "name": "Riyancy Ithayathas",
      "email": "riyancy@example.com",
      "phone": "0767950225",
      "address": "Mannar, Sri Lanka",
      "status": "active"
    }
  ]
}
```

---

### Update a Contact
```
PUT /contacts/:id
```
**Example:** `PUT /contacts/664abc123...`

**Request Body:**
```json
{
  "name": "Riyancy I.",
  "phone": "0771234567",
  "status": "inactive"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "664abc123...",
    "contactId": "C-001",
    "name": "Riyancy I.",
    "phone": "0771234567",
    "status": "inactive"
  }
}
```

---

### Delete a Contact
```
DELETE /contacts/:id
```
**Example:** `DELETE /contacts/664abc123...`

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local) or a MongoDB Atlas account
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/Riyancy/contact-management-system.git
cd contact-management-system
```

---

## How to Run the Project

### 1. Run the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/contact
```

Start the backend server:
```bash
node index.js
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

---

### 2. Run the Frontend

Open a **new terminal**:

```bash
cd contact-frontend
npm install
npm run dev
```

Open your browser and go to:
```
http://localhost:3000
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the backend runs on | `5000` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/contact` |

---

## API Testing

All endpoints were tested using **Postman**. The exported Postman collection is included in the repository as `ContactVault.postman_collection.json`.

---

## Author

**Riyancy Ithayathas**  
2nd Year IT Student  
Module: Web Services and Technology (IT2234)
