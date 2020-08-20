const mongoose = require('mongoose');
const { Schema } = mongoose;


const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  position: {
    type: String
  },
  salary: {
    type: Number
  }
});

mongoose.model('Employee', employeeSchema, 'employees');