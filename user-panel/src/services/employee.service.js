
const employeeQuery = require('../queries/employee.query')
const generateAuthToken = require('../middleware/token')
const bcrypt = require('bcrypt');
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')


const employeelogin = async ({ username, password }) => {
  try {
    const user = await employeeQuery.findByEmail(username);
    if (!user) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Invalid Credentials"
      );
    }

    const isValidCredentials = await bcrypt.compare(password, user.password);
    if (!isValidCredentials) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Invalid Credentials"
      );
    }
    const role = user.role;
    const token = await generateAuthToken.generateAuthToken(username, password, role);
    return [{role:role, token: token}];
  } catch (error) {
    throw error;
  }
};


const addEmployee = async ({ name, email, password, phoneNumber, address, adharNumber, access }, session) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeeData = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      adharNumber,
      access: access 
    };
    const result = await employeeQuery.addEmployee(employeeData, session);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (id, employeeData, session) => {
  try {
    const result = await employeeQuery.updateEmployee(id, employeeData, session);
    if (!result) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Employee with the provided ID does not exist."
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
};
const getEmployeeById = async (id) => {
  try {
    const employee = await employeeQuery.getEmployeeById(id);
    if (!employee) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Employee with the provided ID does not exist."
      );
    }
    return employee;
  } catch (error) {
    throw error;
  }
};

const getAllEmployees = async () => {
  try {
    const employees = await employeeQuery.getAllEmployees();
    return employees;
  } catch (error) {
    throw error;
  }
};
const deleteEmployeeById = async (id) => {
  try {
    const employee = await employeeQuery.deleteEmployee(id);
    if (!employee) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Employee with the provided ID does not exist."
      );
    }
    return employee
  } catch (error) {
    throw error;
  }
};
  module.exports = {
    employeelogin,
    addEmployee,
    updateEmployee,
    getEmployeeById,
    getAllEmployees,
    deleteEmployeeById
  }