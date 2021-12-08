const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

// prompt main questions for user to choose what to do.
const promptQuestion = () => {
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
          return;
        case "View Roles":
          viewRoles();
          return;
        case "View Employees":
          viewEmp();
          return;
        case "Add Department":
          addDept();
          return;
        case "Add Role":
          addRole();
          return;
        case "Add Employee":
          addEmp();
          return;
        case "Update Employee Role":
          updateEmpRole();
          return;
        case "Delete Employee":
          deleteEmp();
          return;
        case "Exit":
          console.log(EXIT);
          connection.end();
          return;
      }
    });
  };

