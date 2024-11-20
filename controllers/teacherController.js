const Teacher = require('../models/teacherModel');
const cloudinary = require('../config/cloudinaryConfig');

// Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    // Check if the teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Handle profile image upload if available
    let profileImageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    // Create new teacher
    const newTeacher = new Teacher({ name, email, subject, profileImageUrl });
    await newTeacher.save();
    
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all teachers with pagination
const getTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const teachers = await Teacher.find({ isDeleted: false })
                                  .skip((page - 1) * limit)
                                  .limit(parseInt(limit));

    const totalTeachers = await Teacher.countDocuments({ isDeleted: false });
    const totalPages = Math.ceil(totalTeachers / limit);

    res.json({ teachers, totalPages, totalTeachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: 'Teacher not found or deleted' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a teacher's details
const updateTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: 'Teacher not found or deleted' });
    }

    // Update profile image if available
    let profileImageUrl = teacher.profileImageUrl;
    if (req.file) {
      // If there was a new file, upload to Cloudinary and update the URL
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.subject = subject || teacher.subject;
    teacher.profileImageUrl = profileImageUrl;

    await teacher.save();

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Soft delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.isDeleted = true;
    await teacher.save();

    res.json({ message: 'Teacher deleted successfully', teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher };
