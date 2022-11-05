var employees = [];
var departments = [];

const fs = require('fs');
function initialize() {

    return new Promise(function (resolve, reject) {

        fs.readFile('./data/employees.json', (err, data) => {
            if (err) reject("Failure to read file employees.json!");
            employees = JSON.parse(data);
            console.log(employees.length);
        });

        fs.readFile('./data/departments.json', (err, data) => {
            if (err) reject("Failure to read file departments.json!");
            departments = JSON.parse(data);
            console.log(departments.length);
        });
        resolve();
    });
};

function getAllEmployees() {
    return new Promise(function (resolve, reject) {
        if (employees.length == 0)
            reject("no result returned");
        resolve(employees);
    });

};

function addEmployee(employeeData) {
    return new Promise(function (resolve, reject) {
        console.log(employeeData)
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
        for (let i=0; i<employees.length; i++) {
            if (employees[i].status === status) filterdEmployees.push(employees[i]);
        }

        // let filterdEmployees = employees.filter(employee => employee.status === status);

        if (filterdEmployees.length === 0)
            reject("no result returned");
        resolve(filterdEmployees);
    });
}

function getEmployeesByDepartment(department) {
    return new Promise((resolve, reject) => {
        // let filterdEmployees = []
        // for (let i=0; i<employees.length; i++) {
        //     if (employees[i].department == department) filterdEmployees.push(employees[i]);
        // }

        let filterdEmployees = employees.filter(employee => employee.department == department);

        if (filterdEmployees.length === 0)
            reject("no result returned");
        resolve(filterdEmployees);
    });
}

function getEmployeesByManager(manager) {
    return new Promise((resolve, reject) => {
        // let filterdEmployees = []
        // for (let i=0; i<employees.length; i++) {
        //     if (employees[i].employeeManagerNum == manager) filterdEmployees.push(employees[i]);
        // }

        let filterdEmployees = employees.filter(employee => employee.employeeManagerNum == manager);

        if (filterdEmployees.length === 0)
            reject("no result returned");
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
        let found = employees.find(employee => employee.employeeNum == num);
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
            if (employees[i].isManager == true)
                managers.push(employees[i]);
        }

        if (managers.length == 0)
            reject("no result returned");
        resolve(managers);
    });

};

function getDepartments() {
    return new Promise(function (resolve, reject) {
       if (departments.length == 0)
            reject("no result returned");
        resolve(departments);
    });

};


module.exports = { 
    initialize, 
    getAllEmployees, 
    getManagers, 
    getDepartments, 
    addEmployee,
    getEmployeesByStatus,
    getEmployeesByDepartment,
    getEmployeesByManager,
    getEmployeeByNum
};
