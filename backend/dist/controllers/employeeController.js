"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.editEmployee = exports.getAllEmployees = exports.createEmployee = void 0;
const Employee_1 = require("../models/Employee");
const createEmployee = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, designation, department, salary } = req.body;
        if (!name || !email || !phone || !designation || !department || !salary) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }
        const newEmployee = new Employee_1.Employee({
            name,
            email,
            phone,
            designation,
            department,
            salary,
        });
        const savedEmployee = await newEmployee.save();
        res.status(200).json({
            message: 'Employee successfully created',
            employee: savedEmployee,
        });
    }
    catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
exports.createEmployee = createEmployee;
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee_1.Employee.find();
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }
        res.status(200).json({ message: 'Employees retrieved successfully', employees });
    }
    catch (error) {
        console.error('Error retrieving employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllEmployees = getAllEmployees;
const editEmployee = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, designation, department, salary, id } = req.body;
        const existingEmployee = await Employee_1.Employee.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        existingEmployee.name = name || existingEmployee.name;
        existingEmployee.email = email || existingEmployee.email;
        existingEmployee.phone = phone || existingEmployee.phone;
        existingEmployee.designation = designation || existingEmployee.designation;
        existingEmployee.department = department || existingEmployee.department;
        existingEmployee.salary = salary || existingEmployee.salary;
        const updatedEmployee = await existingEmployee.save();
        res.status(200).json({
            message: 'Employee successfully updated',
            employee: updatedEmployee,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
exports.editEmployee = editEmployee;
const deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const deletedEmployee = await Employee_1.Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteEmployee = deleteEmployee;
