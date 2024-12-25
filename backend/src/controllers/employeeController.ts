import { Request, Response } from 'express';
import { Employee } from '../models/Employee';

export const createEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);

    const { name, email, phone, designation, department, salary } = req.body;

    if (!name || !email || !phone || !designation || !department || !salary) {
      return res.status(400).json({ message: "All required fields must be provided" });
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

    res.status(200).json({
      message: 'Employee successfully created',
      employee: savedEmployee,
    });
  } catch (error: any) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getAllEmployees = async (req: Request, res: Response): Promise<any> => {
  try {
    const employees = await Employee.find();

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    res.status(200).json({ message: 'Employees retrieved successfully', employees });
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const editEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, phone, designation, department, salary, employeeId } = req.body;

    const existingEmployee = await Employee.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update fields if provided, otherwise keep existing values
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
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};


export const deleteEmployee = async (req: Request, res: Response): Promise<any> => {
  const { employeeId } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
