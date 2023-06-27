// add Role option 
const mysql = require('mysql2');
const { name } = require('./addDept');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GayauGayau',
        database: 'humanResource_db'
    },
    console.log('connected to the humanResource_db database ')
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

