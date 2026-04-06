const express = require('express');
const router = express.Router();
const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
const {
    getEmployeeDashboard,
    getEmployeeProjects,
    addEmployeeProject,
    getEmployeeAttendance,
    addEmployeeAttendance,
    getEmployeeSalaryHistory,
    addEmployeeSalaryHistory,
    deleteEmployeeProject,
    deleteEmployeeAttendance,
    deleteEmployeeSalaryHistory,
    updateEmployeeProject
} = require('../controllers/nestedEmployeeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required: [name, currentProject, salary, email]
 *       properties:
 *         name: { type: string }
 *         currentProject: { type: string }
 *         salary: { type: number }
 *         status: { type: string, enum: [IN, OUT] }
 *         email: { type: string }
 *     Project:
 *       type: object
 *       required: [name, description]
 *       properties:
 *         name: { type: string }
 *         description: { type: string }
 *         status: { type: string, enum: [Pending, Ongoing, Completed] }
 *     Attendance:
 *       type: object
 *       required: [date, status]
 *       properties:
 *         date: { type: string, format: date-time }
 *         status: { type: string, enum: [Present, Absent] }
 *     SalaryHistory:
 *       type: object
 *       required: [amount, date]
 *       properties:
 *         amount: { type: number }
 *         date: { type: string, format: date-time }
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 */
router.route('/')
    .get(getEmployees)
    .post(createEmployee);

// --- Nested Routes (Specific) ---

/**
 * @swagger
 * /api/employees/{id}/dashboard:
 *   get:
 *     summary: Get complete employee dashboard
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get('/:id/dashboard', getEmployeeDashboard);

/**
 * @swagger
 * /api/employees/{id}/projects:
 *   get:
 *     summary: Get all projects for an employee
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   post:
 *     summary: Add a new project
 *     tags: [Employee Nested]
 * /api/employees/{id}/projects/{projectId}:
 *   put:
 *     summary: Update a project
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: projectId
 *         required: true
 *   delete:
 *     summary: Delete a project
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: projectId
 *         required: true
 */
router.route('/:id/projects')
    .get(getEmployeeProjects)
    .post(addEmployeeProject);

router.route('/:id/projects/:projectId')
    .put(updateEmployeeProject)
    .delete(deleteEmployeeProject);

/**
 * @swagger
 * /api/employees/{id}/attendance:
 *   get:
 *     summary: Get attendance for an employee
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   post:
 *     summary: Log attendance
 *     tags: [Employee Nested]
 * /api/employees/{id}/attendance/{attendanceId}:
 *   delete:
 *     summary: Delete attendance record
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: attendanceId
 *         required: true
 */
router.route('/:id/attendance')
    .get(getEmployeeAttendance)
    .post(addEmployeeAttendance);

router.route('/:id/attendance/:attendanceId')
    .delete(deleteEmployeeAttendance);

/**
 * @swagger
 * /api/employees/{id}/salary-history:
 *   get:
 *     summary: Get salary history
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   post:
 *     summary: Add salary record
 *     tags: [Employee Nested]
 * /api/employees/{id}/salary-history/{salaryId}:
 *   delete:
 *     summary: Delete salary record
 *     tags: [Employee Nested]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: salaryId
 *         required: true
 */
router.route('/:id/salary-history')
    .get(getEmployeeSalaryHistory)
    .post(addEmployeeSalaryHistory);

router.route('/:id/salary-history/:salaryId')
    .delete(deleteEmployeeSalaryHistory);

// --- General ID Routes (Less Specific) ---
// Must be defined AFTER nested routes so it doesn't capture routes like /:id/dashboard
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.route('/:id')
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;
