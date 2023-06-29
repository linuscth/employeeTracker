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

const viewEmployeeByDepartment = [
    {
        type: 'list',
        name: 'viewEmployeeBydepartment',
        message: "Please select a department?",
        choices: async () => {
            try {
                const data = await db.promise().query(`SELECT name FROM department;`);
                const deptNameArr = data[0].map((res) => res.name);
                return deptNameArr
            } catch (error) {
                console.log(error);
            }
        }
    }
]

module.exports = viewEmployeeByDepartment;