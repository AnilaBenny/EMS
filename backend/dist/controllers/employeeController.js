"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.editEmployee = exports.getAllEmployees = exports.createEmployee = void 0;
const Employee_1 = require("../models/Employee");
const errors_1 = require("../utils/errors");
const createEmployee = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, phone, designation, department, salary } = req.body;
        if (!name || !email || !phone || !designation || !department || !salary) {
            throw new errors_1.ValidationError("All required fields must be provided");
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
        res.status(201).json({
            message: 'Employee successfully created',
            employee: savedEmployee,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createEmployee = createEmployee;
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee_1.Employee.find();
        if (employees.length === 0) {
            throw new errors_1.NotFoundError('No employees found');
        }
        res.status(200).json({ message: 'Employees retrieved successfully', employees });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllEmployees = getAllEmployees;
const editEmployee = async (req, res, next) => {
    try {
        const { id, name, email, phone, designation, department, salary } = req.body;
        const existingEmployee = await Employee_1.Employee.findById(id);
        if (!existingEmployee) {
            throw new errors_1.NotFoundError('Employee not found');
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
    catch (error) {
        next(error);
    }
};
exports.editEmployee = editEmployee;
const deleteEmployee = async (req, res, next) => {
    const { employeeId } = req.params;
    try {
        const deletedEmployee = await Employee_1.Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            throw new errors_1.NotFoundError('Employee not found');
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
