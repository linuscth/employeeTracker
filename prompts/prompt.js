
// main Prompt
const mainPrompt = [
    {
        type: 'list',
        name: 'toDo',
        message: 'What Would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Department', 'Add Department', 'View Employees By Manager', 'View Employees By Department', 'Quit']
    },
]
module.exports = mainPrompt;