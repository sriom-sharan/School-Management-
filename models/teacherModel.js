const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  profileImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
