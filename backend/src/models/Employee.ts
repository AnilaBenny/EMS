import mongoose, { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); 
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v: number) {
        return /^[0-9]{10}$/.test(v.toString()); 
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary must be positive'],
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null, 
  },
});

employeeSchema.pre('save', function (next) {
  this.updatedAt = new Date(); 
  next();
});

const Employee = model('Employee', employeeSchema);

export { Employee };
