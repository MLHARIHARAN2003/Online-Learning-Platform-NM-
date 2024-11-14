# Online Learning Platform Full Stack Development with MERN

## Introduction:

**Project Title: ONLINE LEARNING PLATFORM** 

**Team Members:**

M.L.Hariharan, 

G.Kaviya,

N.Guru Prasath,

A.Allen royan,

A.Franklin

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Folder Structure](#folder-structure)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Authentication](#authentication)
8. [User Interface](#user-interface)
9. [Testing](#testing)
10. [Screenshots or Demo](#screenshots-or-demo)
11. [Known Issues](#known-issues)
12. [Future Enhancements](#future-enhancements)

---

## 1. Project Overview
**Purpose**  
The Online Learning Platform enables educators to create and share courses with students, facilitating remote education with interactive video content, quizzes, and resources. The platform aims to make quality education accessible and organized for both educators and learners.

**Features**
- **User Authentication**: Secure login and registration for students and educators.
- **Course Management**: Educators can add, edit, and delete courses, along with sections and content.
- **Video Content**: Each course module supports videos, quizzes, and assignments.
- **Certificate Generation**: Completion certificates are generated for students upon course completion.
- **Search and Filter**: Users can search and filter courses by category or educator.

---

## 2. Architecture
### Frontend
The frontend is built with **React**, following a component-based architecture that ensures modularity and reusability. Key features include:
- **React Router**: For single-page application (SPA) routing.
- **State Management**: Using React Context API for user session management.
- **Responsive Design**: Optimized for mobile and desktop views using Tailwind CSS or CSS Modules.

### Backend
The backend is built with **Node.js** and **Express.js** to handle RESTful APIs and business logic. Key features include:
- **Express Middleware**: For handling authentication, validation, and error handling.
- **JWT Authentication**: JSON Web Tokens are used for user session management.
- **Data Validation**: Using express-validator to sanitize and validate input.

### Database
**MongoDB** is used as the primary database for storing users, courses, and enrollment details. Key collections include:
- **Users**: Stores user information, roles (student or educator), and authentication details.
- **Courses**: Stores course information, including sections, descriptions, and media content.
- **Enrollments**: Tracks which users are enrolled in which courses and their progress.

---

## 3. Setup Instructions
### Prerequisites
Ensure the following software is installed on your machine:
- **Node.js** 
- **MongoDB** 
- **Git** (for cloning the repository)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/online-learning-platform.git
   cd online-learning-platform
   ```
2. **Install Dependencies**:
    ```bash
     cd backend
     npm i
     npm start
    # Install frontend dependencies
    cd frontend
    npm i
    npm run dev 
    ```

---

## 4. Folder Structure
```
**frontend**
frontend/
├── public/
├── src/
|   ├──assets/
│   ├── components/         # UI components
│   ├── pages/              # Main pages (Home, Courses, etc.)
│   ├── app.jsx           
│   ├── index.js           
│   └── main.jsx
└── package.json

**backend**
backend/
├── config/                 # Configuration files
├── controllers/            # Controllers for handling business logic
├── schemas/                 # Mongoose models
├── routes/                 # Express routes
├── middleware/             # Middleware for authentication, validation
└── index.js               # Entry point of the backend server

---
```
---
## 5. Running the Application
```
Frontend:

bash
Copy code
cd client
npm run dev
Backend:

bash
Copy code
cd server
npm start
```
---
## 6. API Documentation
Endpoints
GET /
Description: Retrieves a list of resources.
Request: No parameters required.
Response: A JSON array of resources.
Example Response:
json
CopyInsert
```
[
  {
    "id": 1,
    "name": "Resource 1"
  },
  {
    "id": 2,
    "name": "Resource 2"
  }
]
```
Errors:
404 Not Found: No resources found.
POST /
Description: Creates a new resource.
Request: A JSON object with the resource data.
Request Body:
json
CopyInsert
```
{
  "name": "New Resource"
}
```
Response: A JSON object with the created resource data.
Example Response:
json
CopyInsert
```
{
  "id": 3,
  "name": "New Resource"
}
```
Errors:
400 Bad Request: Invalid request body.
409 Conflict: Resource already exists.
GET /:id
Description: Retrieves a resource by ID.
Request: The ID of the resource as a path parameter.
Response: A JSON object with the resource data.
Example Response:
json
CopyInsert
```
{
  "id": 1,
  "name": "Resource 1"
}
```
Errors:
404 Not Found: Resource not found.
PUT /:id
Description: Updates a resource by ID.
Request: The ID of the resource as a path parameter and a JSON object with the updated resource data.
Request Body:
json
CopyInsert
```
{
  "name": "Updated Resource"
}
```
Response: A JSON object with the updated resource data.
Example Response:
json
CopyInsert
```
{
  "id": 1,
  "name": "Updated Resource"
}
```
Errors:
404 Not Found: Resource not found.
400 Bad Request: Invalid request body.
DELETE /:id
Description: Deletes a resource by ID.
Request: The ID of the resource as a path parameter.
Response: No content.
Errors:
404 Not Found: Resource not found.

---
## 7. Authentication

Authentication is managed using JWT (JSON Web Tokens). The token is stored in the client’s local storage and included in API requests for protected routes. Access levels are set by user roles:

Students: Access only to enrolled courses.
Educators: Can create and manage their own courses.
Admin: Access all of the resources 

---
## 8. User Interface:

The platform provides a user-friendly and intuitive interface with features such as:

Course Listing: Grid view of available courses with search and filtering.
Course Content: Detailed view of each course’s content, including videos, quizzes, and assignments.
Progress Tracking: Users can view their progress on enrolled courses

---
## 9. Testing
**Testing Strategy:**

Unit Tests: Focus on individual components and API endpoints.
Integration Tests: Ensure components work together as expected.
End-to-End Tests: Simulate user flows on the frontend using tools like Cypress or Jest

---
##10. Screenshots or Demo:

**admin dashboard**

![image](https://github.com/user-attachments/assets/8820e852-14fa-4686-b5e5-29eb175cb159)

**admin all course**

![image](https://github.com/user-attachments/assets/51779057-29b3-4c5b-9566-c3f8ac01f419)

**home page**

![image](https://github.com/user-attachments/assets/3aa91a9d-7fa9-4d9b-b7e7-d8ded2728c26)

**login**

![image](https://github.com/user-attachments/assets/a594e663-ed8c-4479-a0fc-566a9e833098)

**register**

![image](https://github.com/user-attachments/assets/23cb7742-16a6-44a7-a1c5-bb3a04b4492f)

**student dashboard**

![image](https://github.com/user-attachments/assets/61de03e7-a4c0-4e70-9f5c-d9a781b599fe)

**teacher dashboard**

![image](https://github.com/user-attachments/assets/71e99ea2-cfde-4713-a10b-5b38b7603695)

---

## 11. Known Issues

Video player may not load in certain browsers due to CORS issues.
Course search functionality may have performance lag with large datasets.

---

## 12. Future Enhancements

Mobile App: Create a native mobile app version for iOS and Android.
Real-Time Chat: Add a chat feature for students to interact with educators.
Gamification: Introduce badges and leaderboards to boost engagement.
Payment Integration: Add a payment gateway for purchasing premium courses.

---


