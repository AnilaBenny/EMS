"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const employeeRoute = express_1.default.Router();
employeeRoute.post('/create', employeeController_1.createEmployee);
employeeRoute.get('/all', employeeController_1.getAllEmployees);
employeeRoute.put('/edit', employeeController_1.editEmployee);
employeeRoute.delete('/delete/:employeeId', employeeController_1.deleteEmployee);
exports.default = employeeRoute;
