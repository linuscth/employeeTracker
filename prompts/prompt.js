


// class Prompts {
//     askquestions() {
//         return inquirer.prompt(
const prompt = [
    {
        type: 'list',
        name: 'toDo',
        message: 'What Would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'add role', 'View all Department', 'Add Department', 'Quit']
    },

    // add department option
    // {
    //     type: 'input',
    //     name: 'addDepartmentName',
    //     message: 'What is the name of the department?',
    //     when(answers) {
    //         return answers.toDo === 'Add Department'
    //     }
    // },



    // add Role option 
    // {
    //     type: 'input',
    //     name: 'addRoleName',
    //     message: 'What is the name of the role?',
    //     when(answers) {
    //         return answers.toDo === 'add role'
    //     }
    // },
    // {
    //     type: 'number',
    //     name: 'addRoleSalary',
    //     message: 'What is the salary of the role?',
    //     when(answers) {
    //         return answers.addRoleName
    //     }
    // },
    // {
    //     type: 'list',
    //     name: 'addRoleBelongsTo',
    //     message: 'which department does the role belong to?',
    //     //choices: have to extract from the db
    //     when(answers) {
    //         return answers.addRoleSalary
    //     }
    // },



    // add Employee option
    // {
    //     type: 'input',
    //     name: 'addEmployeeFName',
    //     message: "What is the employee's first name?",
    //     when(answers) {
    //         return answers.toDo == 'Add Employee'
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addEmployeeLName',
    //     message: "What is the employee's last name?",
    //     when(answers) {
    //         return answers.addEmployeeFName
    //     }
    // },
    // {
    //     type: 'list',
    //     name: 'addEmployeeRole',
    //     message: "What is the employee's role?",
    //     // choices: extract from database 
    //     when(answers) {
    //         return answers.addEmployeeLName
    //     }
    // },
    // {
    //     type: 'list',
    //     name: 'addEmployeeManager',
    //     message: "Who is the employee's manager?",
    //     // choices: extract from database 
    //     when(answers) {
    //         return answers.addEmployeeRole
    //     }
    // },


    // update employee role option 
    // {
    //     type: 'list',
    //     name: 'updateEmployeeRole',
    //     message: "What employee's role do you want to update?",
    //     //choices: get data from MYSQL 
    //     when(answers) {
    //         return answers.toDo === 'Update Employee Role'
    //     }
    // },
    // {
    //     type: 'list',
    //     name: 'addDepartmentName',
    //     message: "Which role do you want to assign the selected employee?",
    //     //choices: get data from MYSQL 
    //     when(answers) {
    //         return answers.updateEmployeeRole
    //     }
    // },




]


//         ).then((answers) => console.log('sucess ' + answers.toDo))
//     }
// }


// const testing = new Prompts();

// testing.askquestions();
module.exports = prompt;