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


module.exports = { initialize,getAllEmployees,getManagers,getDepartments };
