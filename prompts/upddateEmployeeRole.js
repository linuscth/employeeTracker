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



const updateEmployeeRole = [
    // update employee role option 
    {
        type: 'list',
        name: 'addDepartmentName',
        message: "Which employee's role do you want to update?",
        choices: async () => {
            try {
                const dataFname = await db.promise().query(`SELECT CONCAT(first_name,' ', last_name)As FullName FROM employee;`);
                const employeeFnameArr = dataFname[0].map((data) => data.FullName);
                return employeeFnameArr;
            } catch (error) {
                console.log(error);
                return []
            }
        }
    },
    {
        type: 'list',
        name: 'updateEmployeeRole',
        message: "Which role do you want to assign the selected employee?",
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT title FROM role;`);
                const roleArr = data[0].map((option) => option.title);
                return roleArr;
            } catch (error) { console.log(error); return [] }
        },
        when(answers) {
            return answers.addDepartmentName
        }
    },

]

module.exports = updateEmployeeRole;