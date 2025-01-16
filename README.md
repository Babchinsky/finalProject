# Final Project

## Description
This is a Node.js-based API project designed for managing ads, users, and messages. It includes features such as user authentication, ad creation, message sending, and admin control over users and ads. The project uses Express.js for the server, Sequelize ORM for database operations, and MySQL as the database.

## Features
- **User Authentication:** Register and log in as a user or admin.
- **Ad Management:** Create, update, delete, search, and mark ads as sold.
- **Messaging System:** Send and view messages between users about ads.
- **Admin Control:** Delete users and ads as an admin.

## Installation

### Prerequisites
- Node.js (version 14 or later)
- MySQL

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/finalProject.git
   cd finalProject
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=final_project_db

   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD_HASH=$2b$10$NvpmthBGgunV8.dieWgGPenP8P3TZKLPTx7rORwHcMabJgzvcrrDm

   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=1h
   PORT=5000

   DB_FORCE_SYNC=false
   ```
4. Initialize the database:
   ```bash
   node sync.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

### API Endpoints
Refer to the API documentation file located in the root directory: `Listify API Documentation.pdf`.

### Testing with Postman
- Import the provided `postman/Marketplace API.json` collection into Postman.
- Set the base URL in your Postman environment to `http://localhost:5000/api`.

### Testing via Browser
- Open your browser and visit:
  - `http://localhost:5000/api/auth/register` (for registration)
  - `http://localhost:5000/api/auth/login` (for login)
  - Other endpoints can be tested using Postman.

## Project Structure
- **`app.js`**: Main application file where routes are configured.
- **`server.js`**: Server startup logic.
- **`sync.js`**: Synchronizes database models.
- **`routes/`**: Contains all API route definitions.
- **`controllers/`**: Contains the logic for handling API requests.
- **`models/`**: Defines database models using Sequelize.
- **`middlewares/`**: Middleware functions for authentication and authorization.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
Feel free to contribute or raise issues in the repository!
