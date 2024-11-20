const Class = require('../models/classModel');
const Teacher = require('../models/teacherModel');

// Create a class
const createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Create a new class
    const newClass = new Class({ name, teacherId, studentCount: 0 });
    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all classes with pagination
const getClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const classes = await Class.find()
                               .skip((page - 1) * limit)
                               .limit(parseInt(limit))
                               .populate('teacherId');

    const totalClasses = await Class.countDocuments();
    const totalPages = Math.ceil(totalClasses / limit);

    res.json({ classes, totalPages, totalClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single class by ID
const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('teacherId');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update class details (e.g., class name, teacher)
const updateClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if the new teacher exists
    if (teacherId) {
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      classData.teacherId = teacherId;
    }

    classData.name = name || classData.name;

    await classData.save();

    res.json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classData.remove();
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createClass, getClasses, getClassById, updateClass, deleteClass };
