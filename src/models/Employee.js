const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        default: 'OUT'
    },
    currentProject: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary cannot be negative']
    },
    email: {
        type: String,
        required: [true, 'Employee email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
