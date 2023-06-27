
// add employee option 
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GayauGayau',
        database: 'humanResource_db'
    },
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
                const data1 = await db.promise().query(`SELECT first_name FROM employee;`);
                const data2 = await db.promise().query(`SELECT last_name FROM employee;`);
                let dataFname = data1[0].map((employee) => employee.first_name);
                let dataLname = data2[0].map((employee) => employee.last_name);
                let names = ['none'];
                for (let i = 0; i < dataFname.length; i++) {
                    const fname = dataFname[i];
                    const lname = dataLname[i];
                    names.push(fname + ' ' + lname)
                }
                return names
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