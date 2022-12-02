const Sequelize = require("sequelize");

// var sequelize = new Sequelize(
//   "pfpzdkbe",
//   "pfpzdkbe",
//   "v460Vbm5_f3fpviEcvbbXvl0oud20gOL",
//   {
//     host: "heffalump.db.elephantsql.com",
//     dialect: "postgres",
//     port: 5432,
//     dialectOptions: {
//       ssl: true,
//     },
//     query: { raw: true }, // update here, you. Need this
//   }
// );

var sequelize = new Sequelize("web322", "postgres", "12wq", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

sequelize
  .authenticate()
  .then(() => console.log("Connection success."))
  .catch((err) => console.log("Unable to connect to DB.", err));

const Employee = sequelize.define("Employee", {
  employeeNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  SSN: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressState: Sequelize.STRING,
  addressPostal: Sequelize.STRING,
  maritalStatus: Sequelize.STRING,
  isManager: Sequelize.BOOLEAN,
  employeeManagerNum: Sequelize.INTEGER,
  status: Sequelize.STRING,
  department: Sequelize.INTEGER,
  hireDate: Sequelize.STRING,
});

const Department = sequelize.define("Department", {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departmentName: Sequelize.STRING,
});

function initialize() {
  return new Promise(function (resolve, reject) {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("unable to sync the datebase", err);
      });
  });
}

function getAllEmployees() {
  return new Promise(function (resolve, reject) {
    Employee.findAll()
      .then((employees) => {
        if (employees.length === 0) reject("no result returned");
        resolve(employees);
      })
      .catch(() => reject("no results returned"));
  });
}

function addEmployee(employeeData) {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

function getEmployeesByStatus(status) {
  return new Promise((resolve, reject) => {
    // Employee.findAll()
    //   .then((employees) => {
    //     let filterdEmployees = employees.filter(
    //       (employee) => employee.status === status
    //     );
    //     if (filterdEmployees.length === 0) reject("no result returned");
    //     resolve(filterdEmployees);
    //   })
    //   .catch(() => reject("no results returned"));

    Employee.findAll({
      where: {
        status: status,
      },
    })
      .then((employees) => {
        if (employees.length === 0) reject("no result returned");
        resolve(employees);
      })
      .catch(() => reject("no results returned"));
  });
}

function getEmployeesByDepartment(department) {
  return new Promise((resolve, reject) => {
    reject();
  });
}

function getEmployeesByManager(manager) {
  return new Promise((resolve, reject) => {
    reject();
  });
}

function getEmployeeByNum(num) {
  return new Promise((resolve, reject) => {
    reject();
  });
}

function getManagers() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

function getDepartments() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

function updateEmployee(employeeData) {
  return new Promise(function (resolve, reject) {
    reject();
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
