const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

// @desc    Create an employee
// @route   POST /api/employees
exports.createEmployee = async (req, res) => {
    try {
        const { name, status, currentProject, salary, email } = req.body;
        const employee = await Employee.create({ 
            name, 
            status, 
            currentProject, 
            salary, 
            email 
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: 'Error creating employee', error: error.message });
    }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, currentProject, salary, email } = req.body;

        const employee = await Employee.findByIdAndUpdate(
            id,
            { name, status, currentProject, salary, email },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};
