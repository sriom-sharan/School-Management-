const express = require('express');
const { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // handle file uploads
const router = express.Router();

router.post('/', protect, upload.single('profileImage'), addTeacher);
router.get('/', protect, getTeachers);
router.get('/:id', protect, getTeacherById);
router.put('/:id', protect, upload.single('profileImage'), updateTeacher);
router.delete('/:id', protect, deleteTeacher);

module.exports = router;
