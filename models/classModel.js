const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  studentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
