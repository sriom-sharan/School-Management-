
# School Management System API

This is a backend API for managing a School Management System, built with **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary** for managing profiles of students and teachers.

## Features
- **Students**: Add, update, delete (soft delete), and retrieve student information.
- **Teachers**: Add, update, delete (soft delete), and retrieve teacher information.
- **Classes**: Create and manage classes, assign teachers to classes.
- **Authentication**: JWT-based authentication for protected routes (Admin access).
- **File Uploads**: Support for profile images for students and teachers via **Cloudinary**.

## Tech Stack
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database to store students, teachers, and class data.
- **Cloudinary**: Cloud-based image and video storage service for profile pictures.
- **JWT (JSON Web Token)**: Used for secure authentication.

## Prerequisites

Before you begin, ensure that you have met the following requirements:

- **Node.js** (>=v14.0)
- **MongoDB** (Local or Atlas)
- **Cloudinary Account** (for storing profile images)
- **Postman** or any other tool for API testing

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/school-management-system.git
```

### 2. Navigate into the project directory
```bash
cd school-management-system
```

### 3. Install dependencies
Run the following command to install all the required dependencies.

```bash
npm install
```

### 4. Create an `.env` file
Create a `.env` file at the root of the project and add the following variables:

```
MONGODB_URI=mongodb://localhost:27017/school_management_system
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000
```

- **MONGODB_URI**: MongoDB connection string (use your local MongoDB or MongoDB Atlas connection).
- **CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET**: Your Cloudinary credentials.
- **JWT_SECRET**: Secret key for signing JWT tokens.
- **PORT**: The port the server will run on (default is `5000`).

### 5. Run the application
Start the server using the following command:

```bash
npm start
```

This will run the application on `http://localhost:5000`.

## API Documentation

### Authentication Routes
#### **POST** `/api/auth/login`
- **Description**: Log in as an admin user.
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "adminpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Student Routes
#### **POST** `/api/students`
- **Description**: Add a new student.
- **Headers**: 
  - Authorization: `Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "classId": "60c72b2f9b1d8e1a6c6b1e93"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60c72b2f9b1d8e1a6c6b1e94",
    "name": "John Doe",
    "email": "john@example.com",
    "classId": "60c72b2f9b1d8e1a6c6b1e93",
    "profileImageUrl": null
  }
  ```

#### **GET** `/api/students`
- **Description**: Get all students (with pagination and optional class filtering).
- **Query Params**:
  - `page`: The page number (default: 1).
  - `limit`: The number of students per page (default: 10).
  - `classId`: The class ID to filter students by (optional).
- **Response**:
  ```json
  {
    "students": [
      {
        "_id": "60c72b2f9b1d8e1a6c6b1e94",
        "name": "John Doe",
        "email": "john@example.com",
        "classId": "60c72b2f9b1d8e1a6c6b1e93",
        "profileImageUrl": null
      }
    ]
  }
  ```

#### **GET** `/api/students/:id`
- **Description**: Get a student by ID.
- **Response**:
  ```json
  {
    "_id": "60c72b2f9b1d8e1a6c6b1e94",
    "name": "John Doe",
    "email": "john@example.com",
    "classId": "60c72b2f9b1d8e1a6c6b1e93",
    "profileImageUrl": "http://example.com/image.jpg"
  }
  ```

#### **PUT** `/api/students/:id`
- **Description**: Update a student's details.
- **Headers**: 
  - Authorization: `Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "name": "John Doe Updated",
    "classId": "60c72b2f9b1d8e1a6c6b1e94"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60c72b2f9b1d8e1a6c6b1e94",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "classId": "60c72b2f9b1d8e1a6c6b1e93",
    "profileImageUrl": "http://example.com/image.jpg"
  }
  ```

#### **DELETE** `/api/students/:id`
- **Description**: Soft delete a student.
- **Response**:
  ```json
  {
    "message": "Student deleted successfully"
  }
  ```

### Teacher Routes
#### **POST** `/api/teachers`
- **Description**: Add a new teacher.
- **Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Math"
  }
  ```

#### **GET** `/api/teachers`
- **Description**: Get all teachers.
- **Query Params**:
  - `page`: The page number (default: 1).
  - `limit`: The number of teachers per page (default: 10).

#### **GET** `/api/teachers/:id`
- **Description**: Get a teacher by ID.

#### **PUT** `/api/teachers/:id`
- **Description**: Update teacher details.

#### **DELETE** `/api/teachers/:id`
- **Description**: Soft delete a teacher.

### Class Routes
#### **POST** `/api/classes`
- **Description**: Create a new class.
- **Body**:
  ```json
  {
    "name": "Grade 10A",
    "teacherId": "60c72b2f9b1d8e1a6c6b1e94"
  }
  ```

#### **GET** `/api/classes`
- **Description**: Get all classes.
- **Response**:
  ```json
  {
    "classes": [
      {
        "_id": "60c72b2f9b1d8e1a6c6b1e94",
        "name": "Grade 10A",
        "teacherId": "60c72b2f9b1d8e1a6c6b1e94",
        "studentCount": 30
      }
    ]
  }
  ```

#### **PUT** `/api/classes/:id`
- **Description**: Update class details.
  
#### **DELETE** `/api/classes/:id`
- **Description**: Delete a class.

## Error Handling

- **400 Bad Request**: Invalid or missing parameters.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server encountered an error.

## Contributing

Feel free to fork the repository and make improvements. When making contributions, please follow best practices and create meaningful pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Key Sections of the README:

1. **Project Description**: Describes the purpose and key features of the School Management System API.
2. **Tech Stack**: Lists the technologies used in the project (Node.js, Express, MongoDB, Cloudinary, JWT).
3. **Installation Instructions**: Step-by-step guide to set up the project.
4. **API Documentation**: Detailed list of available routes, methods, and expected responses.
5. **Error Handling**: Common errors that

 users may encounter while using the API.
6. **Contributing**: Instructions for how others can contribute to the project.
7. **License**: Information about the project's license.

This README provides enough detail for someone to easily set up and start using the School Management System API. Make sure to customize it with your actual project details.