
// add employee option 
const mysql = require('mysql2');
require('dotenv').config()
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)



const addEmployeePrompt = [
    {
        type: 'input',
        name: 'addEmployeeFName',
        message: "What is the employee's first name?",
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
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT title FROM role`);
                const roleArray = data[0].map((role) => role.title)
                return roleArray;
            } catch (err) {
                console.log(err);
                return [];
            }
        },
        when(answers) {
            return answers.addEmployeeLName
        }
    },
    {
        type: 'list',
        name: 'addEmployeeManager',
        message: "Who is the employee's manager?",
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS fullName FROM employee;`);
                let fullNameArr = data[0].map((employee) => employee.fullName);
                fullNameArr.push('none')
                return fullNameArr
            } catch (err) {
                console.log(err);
            }
        },
        when(answers) {
            return answers.addEmployeeRole
        }
    },



]
module.exports = addEmployeePrompt;