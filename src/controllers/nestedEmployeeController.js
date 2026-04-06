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

/**
 * @desc    Delete a project
 * @route   DELETE /api/employees/:id/projects/:projectId
 */
exports.deleteEmployeeProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.projectId, employeeId: req.params.id });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting project' });
    }
};

/**
 * @desc    Delete attendance record
 * @route   DELETE /api/employees/:id/attendance/:attendanceId
 */
exports.deleteEmployeeAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndDelete({ _id: req.params.attendanceId, employeeId: req.params.id });
        if (!attendance) return res.status(404).json({ success: false, message: 'Attendance record not found' });
        res.status(200).json({ success: true, message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting attendance' });
    }
};

/**
 * @desc    Delete salary history record
 * @route   DELETE /api/employees/:id/salary-history/:salaryId
 */
exports.deleteEmployeeSalaryHistory = async (req, res) => {
    try {
        const salary = await SalaryHistory.findOneAndDelete({ _id: req.params.salaryId, employeeId: req.params.id });
        if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
        res.status(200).json({ success: true, message: 'Salary record deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting salary record' });
    }
};

/**
 * @desc    Update a project record
 * @route   PUT /api/employees/:id/projects/:projectId
 */
exports.updateEmployeeProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.projectId, employeeId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating project', error: error.message });
    }
};
