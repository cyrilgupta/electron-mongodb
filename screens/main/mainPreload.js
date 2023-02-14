const { contextBridge, ipcRenderer } = require("electron");
const globals = require("../../globals");
const Employees = require("../../models/Employees");

const employees = new Employees(globals.URI, globals.DB_NAME);
let gotEmployeeCallback;
let gotEmployeeUpdatedCallback;
let gotDeletedResultCallback;

let getEmployees = () => {
  console.log(`mainPreload > getEmployees`);

  employees.getEmployees().then((res) => {
    gotEmployeeCallback(res);
  });
};

let gotEmployees = (callback) => {
  gotEmployeeCallback = callback;
};

let saveEmployee = (employee) => {
  console.log(
    `mainPreload > Salary: ${employee.salary}, Name: ${employee.name}, Position: ${employee.position}`
  );
  return employees.addEmployee(employee);
};

let deleteEmployees = (id) => {
  console.log(`mainPreload > Delete : ${id}`);

  employees.deleteEmployee(id).then((res) => {
    gotDeletedResultCallback(res);
  });
};

let gotDeletedResult = (callback) => {
  gotDeletedResultCallback = callback;
};

let updateEmployee = (id, emp) => {
  console.log(`mainPreload > upDateEmployee : ${id}`);

  const employee = {
    salary: emp.salary,
    name: emp.name,
    position: emp.position,
  };

  employees.updateEmployee(id, employee).then((res) => {
    gotEmployeeUpdatedCallback(res);
  });
};

let gotEmployeeUpdatedResult = (callback) => {
  gotEmployeeUpdatedCallback = callback;
};

contextBridge.exposeInMainWorld("api", {
  getEmployees,
  gotEmployees,
  saveEmployee,
  updateEmployee,
  gotEmployeeUpdatedResult,
  gotDeletedResult,
  deleteEmployees,
});