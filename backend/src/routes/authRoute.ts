import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  editEmployee,
  deleteEmployee,
} from '../controllers/employeeController';

const employeeRoute = express.Router();

employeeRoute.post('/create', createEmployee); 
employeeRoute.get('/all', getAllEmployees);   
employeeRoute.put('/edit', editEmployee);    
employeeRoute.delete('/delete/:employeeId', deleteEmployee); 

export default employeeRoute;
