import request from 'supertest';
import app from '../server';
import { Employee } from '../models/Employee';
import { connectToDatabase, closeDatabase } from '../config/database';

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

beforeEach(async () => {
  await Employee.deleteMany({});
});

describe('Employee API Endpoints', () => {
  let employeeId :string;

  test('POST /create - should create a new employee', async () => {
    const response = await request(app)
      .post('/create')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        designation: 'Developer',
        department: 'Engineering',
        salary: 60000,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Employee successfully created');
    expect(response.body.data.employee).toHaveProperty('_id');
    employeeId = response.body.data.employee._id;
  });

  test('POST /create - should fail with invalid data', async () => {
    const response = await request(app)
      .post('/create')
      .send({
        name: '', 
        email: 'invalid-email', 
      });

    expect(response.status).toBe(400);
  });

  test('GET /all - should retrieve all employees', async () => {
    const response = await request(app).get('/all');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.employees)).toBe(true);
  });

  test('PUT /edit - should update an employee', async () => {
    const response = await request(app)
      .put(`/edit`)
      .send({
        id: employeeId,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '9876543210',
        designation: 'Senior Developer',
        department: 'Engineering',
        salary: 70000,
      });

    expect(response.status).toBe(200);
    expect(response.body.employee.name).toBe('John Smith');
    expect(response.body.employee.salary).toBe(70000);
  });

  test('PUT /edit - should fail with non-existent ID', async () => {
    const response = await request(app)
      .put(`/edit`)
      .send({
        id: '507f1f77bcf86cd799439011', 
        name: 'John Smith',
      });

    expect(response.status).toBe(404);
  });

  test('DELETE /delete/:employeeId - should delete an employee', async () => {
    const response = await request(app).delete(`/delete/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Employee deleted successfully');
  });

  test('DELETE /delete/:employeeId - should fail with non-existent ID', async () => {
    const response = await request(app).delete('/delete/507f1f77bcf86cd799439011');

    expect(response.status).toBe(404);
  });
});