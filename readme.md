### Hi, I'm Paramjeet! 👋

# Node.js with MySQL

This microservice is built with Express.js and uses MySQL as its database. It provides CRUD operations for managing users.

## Usage

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository_url>
cd nodeJs-with-mysql
npm install
```

### API Endpoints Details

- **POST /create**: Create a new user.
- **GET /:userId**: Get a specific user by ID.
- **PUT /update/:userId**: Update a user's information.
- **DELETE /delete/:userId**: Delete a user by ID.

```json
{
    "name": "user's name",
    "email": "user@gmail.com",
    "password": "user@123",
    "userType": "admin"
}
```