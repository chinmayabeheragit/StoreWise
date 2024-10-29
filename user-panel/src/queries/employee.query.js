const { Employee } = require('../models/employee.model')

const findByEmail = async (email) => {
  try {
    return await Employee.findOne({ email });
  } catch (error) {
    throw error;
  }
};

const addEmployee = async (empData, session) => {
  try {
    const employee = new Employee(empData)
    await employee.save(session);
    return employee;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (id, employeeData, session) => {
  try {
    return await Employee.findByIdAndUpdate(id, employeeData, { session, new: true });
  } catch (error) {
    throw error;
  }
};

const getEmployeeById = async (id) => {
  try {
    return await Employee.findById(id);;
  } catch (error) {
    throw error;
  }
};

const getAllEmployees = async () => {
  try {
    return await Employee.find();
  } catch (error) {
    throw error;
  }
};
const deleteEmployee = async (id) => {
  try {
    return await Employee.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  findByEmail,
  addEmployee,
  updateEmployee,
  getEmployeeById,
  getAllEmployees,
  deleteEmployee
}