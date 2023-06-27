const addEmployeePrompt = [
    {
        type: 'input',
        name: 'addEmployeeFName',
        message: "What is the employee's first name?",
        when(answers) {
            return answers.toDo == 'Add Employee'
        }
    },
    {
        type: 'input',
        name: 'addEmployeeLName',
        message: "What is the employee's last name?",
        when(answers) {
            return answers.addEmployeeFName
        }
    },
    {
        type: 'list',
        name: 'addEmployeeRole',
        message: "What is the employee's role?",
        // choices: extract from database 
        when(answers) {
            return answers.addEmployeeLName
        }
    },
    {
        type: 'list',
        name: 'addEmployeeManager',
        message: "Who is the employee's manager?",
        // choices: extract from database 
        when(answers) {
            return answers.addEmployeeRole
        }
    },



]
module.exports = addEmployeePrompt;