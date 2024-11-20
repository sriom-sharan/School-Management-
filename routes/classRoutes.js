const express = require('express');
const { createClass, getClasses, getClassById, updateClass, deleteClass } = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createClass);
router.get('/', protect, getClasses);
router.get('/:id', protect, getClassById);
router.put('/:id', protect, updateClass);
router.delete('/:id', protect, deleteClass);

module.exports = router;
