const mongoose = require('mongoose');

const salaryHistorySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    amount: {
        type: Number,
        required: [true, 'Salary amount is required'],
        min: [0, 'Salary cannot be negative']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('SalaryHistory', salaryHistorySchema);
