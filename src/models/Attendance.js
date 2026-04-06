const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
