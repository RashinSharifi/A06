var employees = [];
var departments = [];

const fs = require("fs");
function initialize() {
  return new Promise(function (resolve, reject) {
    fs.readFile("./data/employees.json", (err, data) => {
      if (err) reject("Failure to read file employees.json!");
      employees = JSON.parse(data);
    });

    fs.readFile("./data/departments.json", (err, data) => {
      if (err) reject("Failure to read file departments.json!");
      departments = JSON.parse(data);
    });
    resolve();
  });
}

function getAllEmployees() {
  return new Promise(function (resolve, reject) {
    if (employees.length == 0) reject("no result returned");
    resolve(employees);
  });
}

function addEmployee(employeeData) {
  return new Promise(function (resolve, reject) {
    console.log(employeeData);
    if (employeeData.isManager === undefined) {
      employeeData.isManager = false;
    } else {
      employeeData.isManager = true;
    }

    employeeData.employeeNum = employees.length + 1;
    employees.push(employeeData);

    resolve();
  });
}

function getEmployeesByStatus(status) {
  return new Promise((resolve, reject) => {
    let filterdEmployees = [];
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].status === status) filterdEmployees.push(employees[i]);
    }

    // let filterdEmployees = employees.filter(employee => employee.status === status);

    if (filterdEmployees.length === 0) reject("no result returned");
    resolve(filterdEmployees);
  });
}

function getEmployeesByDepartment(department) {
  return new Promise((resolve, reject) => {
    // let filterdEmployees = []
    // for (let i=0; i<employees.length; i++) {
    //     if (employees[i].department == department) filterdEmployees.push(employees[i]);
    // }

    let filterdEmployees = employees.filter(
      (employee) => employee.department == department
    );

    if (filterdEmployees.length === 0) reject("no result returned");
    resolve(filterdEmployees);
  });
}

function getEmployeesByManager(manager) {
  return new Promise((resolve, reject) => {
    // let filterdEmployees = []
    // for (let i=0; i<employees.length; i++) {
    //     if (employees[i].employeeManagerNum == manager) filterdEmployees.push(employees[i]);
    // }

    let filterdEmployees = employees.filter(
      (employee) => employee.employeeManagerNum == manager
    );

    if (filterdEmployees.length === 0) reject("no result returned");
    resolve(filterdEmployees);
  });
}

function getEmployeeByNum(num) {
  return new Promise((resolve, reject) => {
    // for (let i=0; i<employees.length; i++) {
    //     if (employees[i].employeeNum == num) {
    //         resolve(employees[i]);
    //     }
    // }

    // If no values satisfy the testing function, undefined is returned.
    let found = employees.find((employee) => employee.employeeNum == num);
    if (found) {
      resolve(found);
    }

    reject("no result returned");
  });
}

function getManagers() {
  return new Promise(function (resolve, reject) {
    var managers = [];
    for (i = 0; i < employees.length; i++) {
      if (employees[i].isManager == true) managers.push(employees[i]);
    }

    if (managers.length == 0) reject("no result returned");
    resolve(managers);
  });
}

function getDepartments() {
  return new Promise(function (resolve, reject) {
    if (departments.length == 0) reject("no result returned");
    resolve(departments);
  });
}

function updateEmployee(employeeData) {
  return new Promise(function (resolve, reject) {
    let found = employees.find(
      (employee) => employee.employeeNum == employeeData.employeeNum
    );
    if (found) {
      (found.employeeNum = employeeData.employeeNum),
        (found.firstName = employeeData.firstName),
        (found.lastName = employeeData.lastName),
        (found.email = employeeData.email),
        (found.SSN = employeeData.SSN),
        (found.addressStreet = employeeData.addressStreet),
        (found.addressCity = employeeData.addressCity),
        (found.addressState = employeeData.addressState),
        (found.addressPostal = employeeData.addressPostal),
        (found.maritalStatus = employeeData.maritalStatus),
        (found.isManager = employeeData.isManager),
        (found.employeeManagerNum = employeeData.employeeManagerNum),
        (found.status = employeeData.status),
        (found.department = employeeData.department),
        (found.hireDate = employeeData.hireDate);
      resolve();
    }

    reject("no result returned");
  });
}

module.exports = {
  initialize,
  getAllEmployees,
  getManagers,
  getDepartments,
  addEmployee,
  getEmployeesByStatus,
  getEmployeesByDepartment,
  getEmployeesByManager,
  getEmployeeByNum,
  updateEmployee,
};
