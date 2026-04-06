const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Ongoing', 'Completed'],
        default: 'Ongoing'
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
