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
          console.log("EXIT");
          //connection.end();
          process.exit(0); 
          return;
      }
    });
  };

promptQuestion();

async function viewRoles(){
  //executing the SQL command in the DB , returns data from DB
  const dataRows = await index.viewRoles();
  console.log("Data from db", dataRows); 
  //display in table format
  console.log(dataRows); 
  //ask the question again 
  promptQuestion(); 
}