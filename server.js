const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
const index = require("./db/index"); 

// prompt main questions for user to choose what to do.
const promptQuestion = () => {
  console.log("Welcome to employee tracker App!!"); 

    return prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Delete Employee",
          "Exit"
        ],
      },
    ]).then(inquirerData => {
      switch (inquirerData.choice) {
        case "View Departments":
          viewDept();
          break;
        case "View Roles":
           viewRoles(); 
          break;
        case "View Employees":
          viewEmp();
          break;
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "Delete Employee":
          deleteEmp();
          break;
        case "Exit":
          console.log("EXIT");
          //connection.end();
          process.exit(0); 
          return;
      }
    });
  };

promptQuestion();

// View all departments
function viewDept() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n departments");
      console.table(departments);
    })
    .then(() => promptQuestion());
}

// View all roles
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n roles");
      console.table(roles);
    })
    .then(() => promptQuestion());
}

// View all employees
function viewEmp() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n employees");
      console.table(employees);
    })
    .then(() => promptQuestion());
}

// Add a new department
function addDept() {
  prompt([
    {
      name: "name",
      message: "New Department Name is:"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => promptQuestion())
    })
}

// Add a new role
function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: "title",
          message: "New role name is:"
        },
        {
          name: "salary",
          message: "The salary of the new role is:"
        },
        {
          type: "list",
          name: "department_id",
          message: "The new role belong to the department of ",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => promptQuestion())
        })
    })
}

// Add a new employee
function addEmp() {
  prompt([
    {
      name: "first_name",
      message: "The employee's first name is:"
    },
    {
      name: "last_name",
      message: "The employee's last name is:"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "The new employee's role is:",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managerChoices.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "The new employee's manager is:",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => promptQuestion())
                })
            })
        })
    })
}

// Update an employee's role
function updateEmpRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Please choose the employee you want to update",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "The role do you want to assign to the selected employee:",
                  choices: roleChoices
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("Updated employee's role"))
                .then(() => promptQuestion())
            });
        });
    })
}

// Delete an employee
function deleteEmp() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "The employee you want to remove is:",
          choices: employeeChoices
        }
      ])
        .then(res => db.deleteEmployee(res.employeeId))
        .then(() => console.log("Removed employee from the database"))
        .then(() => promptQuestion())
    })
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
