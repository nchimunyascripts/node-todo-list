# To-Do List Application with Node.js, Express, MongoDB, and Redis

This project is a To-Do List application built using Node.js, Express, MongoDB, Redis, and JWT authentication. It allows users to register, log in, create, update, delete, and retrieve to-do items. The application also includes pagination for efficient data handling and Redis for caching and session management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Successes and Challenges](#successes-and-challenges)
- [Next Steps](#next-steps)
- [License](#license)

## Project Overview

This is a full-stack To-Do List application where users can manage their tasks by performing CRUD operations. The app supports:
- User authentication via JWT.
- Secure password hashing with `bcryptjs`.
- Session management and caching with Redis.
- Pagination for managing a large number of tasks.
- RESTful API structure.

## Features

- **User Registration and Authentication**: Users can register, log in, and manage their own tasks.
- **Task Management**: Users can create, update, delete, and retrieve to-do items.
- **Pagination**: Large task lists are paginated for optimized performance.
- **Session Management with Redis**: User sessions are stored and managed using Redis for improved performance and scalability.
- **JWT-based Authentication**: Secure user authentication via JWT tokens.

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing users and tasks.
- **Mongoose**: ODM for MongoDB.
- **Redis**: In-memory data structure store used for session management and caching.
- **JWT (jsonwebtoken)**: Authentication using JSON Web Tokens.
- **bcryptjs**: For hashing user passwords.
- **dotenv**: For managing environment variables.
- **mongoose-paginate-v2**: Pagination support for MongoDB queries.
- **express-session**: Session management middleware.

## Project Structure

```
├── config
│   └── db.js          # MongoDB and Redis configuration
├── controllers
│   ├── authController.js
│   └── todoController.js
├── middlewares
│   └── auth.js        # Middleware for authentication
├── models
│   ├── User.js
│   └── Todo.js
├── routes
│   ├── authRoutes.js
│   └── todoRoutes.js
├── .env               # Environment variables
├── server.js          # Entry point of the application
└── package.json       # Project dependencies
```

## Getting Started

### Prerequisites

Ensure you have the following software installed:
- Node.js (version 14+)
- MongoDB (local or Atlas)
- Redis (local or remote instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your/repository.git
   cd node-todo-list
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todolist
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=supersecretkey
   ```

### Running the Application

Start the application:

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### User Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and return a JWT token.

### To-Do Operations
- `GET /api/todos`: Get all to-dos for a logged-in user (supports pagination).
- `POST /api/todos`: Create a new to-do.
- `PUT /api/todos/:id`: Update an existing to-do by its ID.
- `DELETE /api/todos/:id`: Delete a to-do by its ID.

## Successes and Challenges

### Successes
- **Redis integration**: Efficient session management using Redis for storing user sessions.
- **Pagination**: Successful implementation of pagination to handle large datasets in MongoDB.
- **Authentication**: Secure authentication using JWT and password hashing with bcryptjs.

### Challenges
- **Redis v4+ Compatibility**: Faced challenges with configuring `connect-redis` with Redis v4+.
- **Error Handling**: Handling different error cases, especially during authentication and CRUD operations, was complex and required extra attention.

## Next Steps

- **Add Role-based Access Control**: Implement roles like admin and user.
- **Deploy to Production**: Deploy the app to cloud services such as AWS or Heroku.
- **Real-time Features**: Introduce real-time task updates using WebSockets or Socket.io.
- **Testing**: Add unit and integration tests to cover all API endpoints.

## License

This project is licensed under the MIT License.
