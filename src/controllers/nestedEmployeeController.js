const Employee = require('../models/Employee');
const Project = require('../models/Project');
const Attendance = require('../models/Attendance');
const SalaryHistory = require('../models/SalaryHistory');

/**
 * @desc    Get complete employee dashboard (combined response)
 * @route   GET /api/employees/:id/dashboard
 */
exports.getEmployeeDashboard = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const projects = await Project.find({ employeeId: id });
        const attendance = await Attendance.find({ employeeId: id });
        const salaryHistory = await SalaryHistory.find({ employeeId: id });

        res.status(200).json({
            success: true,
            data: {
                employee,
                projects,
                attendance,
                salaryHistory
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching dashboard', error: error.message });
    }
};

/**
 * @desc    Get all projects for an employee
 * @route   GET /api/employees/:id/projects
 */
exports.getEmployeeProjects = async (req, res) => {
    try {
        const projects = await Project.find({ employeeId: req.params.id });
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching projects' });
    }
};

/**
 * @desc    Add a project for an employee
 * @route   POST /api/employees/:id/projects
 */
exports.addEmployeeProject = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

        const project = await Project.create({
            ...req.body,
            employeeId: id
        });
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error adding project', error: error.message });
    }
};

/**
 * @desc    Get all attendance for an employee
 * @route   GET /api/employees/:id/attendance
 */
exports.getEmployeeAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.params.id });
        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching attendance' });
    }
};

/**
 * @desc    Add attendance for an employee
 * @route   POST /api/employees/:id/attendance
 */
exports.addEmployeeAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

        const attendance = await Attendance.create({
            ...req.body,
            employeeId: id
        });
        res.status(201).json({ success: true, data: attendance });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error adding attendance', error: error.message });
    }
};

/**
 * @desc    Get salary history for an employee
 * @route   GET /api/employees/:id/salary-history
 */
exports.getEmployeeSalaryHistory = async (req, res) => {
    try {
        const salaryHistory = await SalaryHistory.find({ employeeId: req.params.id });
        res.status(200).json({ success: true, data: salaryHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching salary history' });
    }
};

/**
 * @desc    Add salary history for an employee
 * @route   POST /api/employees/:id/salary-history
 */
exports.addEmployeeSalaryHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

        const salaryHistory = await SalaryHistory.create({
            ...req.body,
            employeeId: id
        });
        res.status(201).json({ success: true, data: salaryHistory });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error adding salary record', error: error.message });
    }
};
