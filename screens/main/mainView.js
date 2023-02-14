window.addEventListener("load", () => {
  //Event handlers
  //Save button
  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", btnSaveClick);

  //Get button
  const btnGet = document.getElementById("btnGet");
  btnGet.addEventListener("click", btnGetClick);

  //Callbacks
  window.api.gotEmployees(gotEmployees);
  window.api.gotEmployeeUpdatedResult(gotEmployeeUpdatedResult);
  window.api.gotDeletedResult(gotDeletedResult);
});

let employeeData = {};

const gotEmployees = (employees) => {
  employeeData = employees;

  console.log("view gotEmployees");

  var empData = employees
    .map((employee) => {
      var res = `<tr>
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.salary}</td>
      <td><input type="button" onclick="Delete('${employee.id}')" value="Delete" /></td>
      <td><input type="button" onclick="Edit('${employee.id}')" value="Edit Employee" /></td>
    </tr>`;

      return res;
    })
    .join("");

  var tbData = document.getElementById("tbEmployees");
  tbData.innerHTML = empData;
};

const btnGetClick = (event) => {
  console.log("Get button clicked");
  event.preventDefault();

  window.api.getEmployees();
};

const btnSaveClick = (event) => {
  console.log("Save button clicked");
  event.preventDefault();

  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;
  const empId = document.getElementById("empId").value;

  console.log(
    `Salary: ${salary}, Name: ${name}, Position: ${position}, empId: ${empId}`
  );

  if (empId == "") {
    window.api.saveEmployee({ name, position, salary }).then(() => {
      alert("Record saved");
    });
  } else {
    window.api.updateEmployee(empId, { name, position, salary });
  }
};

const gotDeletedResult = (result) => {
  if (result) {
    alert("Record deleted");
  }
};

function Delete(empId) {
  console.log(`mainView > Delete : ${empId}`);
  window.api.deleteEmployees(empId);
}

function Edit(empId) {
  const emp = employeeData.find((employee) => employee.id === empId);

  const inputId = document.getElementById("empId");
  const name = document.getElementById("name");
  const position = document.getElementById("position");
  const salary = document.getElementById("salary");

  inputId.value = empId;
  name.value = emp.name;
  position.value = emp.position;
  salary.value = emp.salary;
}

const gotEmployeeUpdatedResult = (result) => {
  if (result) window.api.getEmployees();
};
