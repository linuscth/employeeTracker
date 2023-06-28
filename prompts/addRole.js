// add Role option 
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



const addRolePrompt = [
    {
        type: 'input',
        name: 'addRoleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'number',
        name: 'addRoleSalary',
        message: 'What is the salary of the role?',
        when(answers) {
            return answers.addRoleName
        }
    },
    {
        type: 'list',
        name: 'addRoleBelongsTo',
        message: 'which department does the role belong to?',
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT * FROM department`);
                const deptArray = data[0].map(((dept) => dept.name));
                return deptArray;
            } catch (err) {
                console.log(err);
                return [];
            }
        },
        when(answers) {
            return answers.addRoleSalary
        }
    }];

module.exports = addRolePrompt;

