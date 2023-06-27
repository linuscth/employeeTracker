const inquirer = require('inquirer');
const mysql = require('mysql2');
const addDeptPrompt = require('./prompts/addDept');
const upddateEmployeeRolePrompt = require('./prompts/upddateEmployeeRole')
const mainPrompt = require('./prompts/prompt');
const addRolePrompt = require('./prompts/addRole');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GayauGayau',
        database: 'humanResource_db'
    },
    console.log('connected to the humanResource_db database ')
)



class Questions {
    askQuestions() {
        inquirer.prompt(mainPrompt).then(
            (data) => {
                switch (data.toDo) {

                    case 'View All Employees':

                        const viewAllEmploySql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id;`;

                        db.query(viewAllEmploySql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })
                        break;


                        
                    case 'View all Roles':
                        const viewALlRoleSql = `SELECT * FROM role;`

                        db.query(viewALlRoleSql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })

                        break;



                    case 'Add Department':

                        const addDeptSql = `INSERT INTO department (name)
                        VALUES (?);`;

                        inquirer.prompt(addDeptPrompt).then((data) => {
                            db.query(addDeptSql, data.addDepartmentName, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(`Successfully added new department: ${data.addDepartmentName}`);
                                this.askQuestions();
                            })
                        })
                        break;

                    case 'View all Department':
                        const viewALlDeptSql = `SELECT * FROM department;`

                        db.query(viewALlDeptSql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })

                        break;

                    case 'add role':
                        inquirer.prompt(addRolePrompt).then(async (data) => {
                            const addRoleName = data.addRoleName;
                            const addRoleSalary = data.addRoleSalary;
                            const addRoleBelongsTo = data.addRoleBelongsTo;

                            db.query(`SELECT id FROM department WHERE name = (?)`, addRoleBelongsTo, (err, departmentData) => {
                                if (err) {
                                    console.log(err);
                                };
                                const deptId = departmentData[0].id;

                                db.query(`INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?);`, [addRoleName, addRoleSalary, deptId], (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    };
                                    console.log(data);
                                    this.askQuestions()
                                }
                                )



                            })
                        })
                        break;


                    default:
                        this.askQuestions()


                }






            })
    }

}

const testing = new Questions();

testing.askQuestions();

