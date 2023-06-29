// View employee by Manager 
const mysql = require('mysql2');
const { name } = require('./addDept');
require('dotenv').config()
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

const viewEmployeeByManager = [
    {
        type: 'list',
        name: 'viewEmployeeByManagerName',
        message: "what is the manager's name?",
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT CONCAT(first_name,' ', last_name)As FullName FROM employee;`);
                const managerNameArr = data[0].map((res) => res.FullName);
                return managerNameArr
            } catch (error) {
                console.log(error);
            }
        }
    }
]

module.exports = viewEmployeeByManager;