const express = require('express');
const { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // middleware for handling file uploads
const router = express.Router();

// Route to add a new student
router.post('/', protect, upload.single('profileImage'), addStudent);

// Get all students with pagination and optional filtering by classId
router.get('/', protect, getStudents);

// Get a single student by ID
router.get('/:id', protect, getStudentById);

// Update a student's details
router.put('/:id', protect, upload.single('profileImage'), updateStudent);

// Soft delete a student
router.delete('/:id', protect, deleteStudent);

module.exports = router;
