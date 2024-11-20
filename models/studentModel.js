const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  profileImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
