const Student = require('../models/studentModel');
const cloudinary = require('../config/cloudinaryConfig');

// Add a new student
const addStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;

    // Check if the student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Handle profile image upload if available
    let profileImageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    // Create a new student
    const newStudent = new Student({ name, email, classId, profileImageUrl });
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students with pagination and filtering by class
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, classId } = req.query;
    const filter = classId ? { classId } : {}; // Filter by class if provided

    const students = await Student.find({ ...filter, isDeleted: false })
                                  .skip((page - 1) * limit)
                                  .limit(parseInt(limit));

    const totalStudents = await Student.countDocuments({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalStudents / limit);

    res.json({ students, totalPages, totalStudents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || student.isDeleted) {
      return res.status(404).json({ message: 'Student not found or deleted' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a student's details (e.g., name, class, profile image)
const updateStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student || student.isDeleted) {
      return res.status(404).json({ message: 'Student not found or deleted' });
    }

    // Handle profile image upload if available
    let profileImageUrl = student.profileImageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.classId = classId || student.classId;
    student.profileImageUrl = profileImageUrl;

    await student.save();

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Soft delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.isDeleted = true; // Soft delete
    await student.save();

    res.json({ message: 'Student deleted successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addStudent, getStudents, getStudentById, updateStudent, deleteStudent };
