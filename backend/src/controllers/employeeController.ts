import { Request, Response, NextFunction } from 'express';
import { Employee } from '../models/Employee';
import { ValidationError, NotFoundError, InternalServerError } from '../utils/errors';

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    const { name, email, phone, designation, department, salary } = req.body;

    if (!name || !email || !phone || !designation || !department || !salary) {
      throw new ValidationError("All required fields must be provided");
    }

    const newEmployee = new Employee({
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
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await Employee.find();

    if (employees.length === 0) {
      throw new NotFoundError('No employees found');
    }

    res.status(200).json({ message: 'Employees retrieved successfully', employees });
  } catch (error) {
    next(error);
  }
};

export const editEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id,name, email, phone, designation, department, salary } = req.body;

    const existingEmployee = await Employee.findById(id);

    if (!existingEmployee) {
      throw new NotFoundError('Employee not found');
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
  } catch (error) {
    next(error);
  }
};


export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  const { employeeId } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      throw new NotFoundError('Employee not found');
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};
