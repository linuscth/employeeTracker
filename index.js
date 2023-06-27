const inquirer = require('inquirer');
const mysql = require('mysql2');
const addDeptPrompt = require('./prompts/addDept');
const upddateEmployeeRolePrompt = require('./prompts/upddateEmployeeRole')
const mainPrompt = require('./prompts/prompt');
const addRolePrompt = require('./prompts/addRole');
const addEmployeePrompt = require('./prompts/addEmployee')

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
                            console.log(data);
                            this.askQuestions()
                        })

                        break;

                    case 'Add Role':
                        inquirer.prompt(addRolePrompt).then(async (data) => {
                            const addRoleName = data.addRoleName;
                            const addRoleSalary = data.addRoleSalary;
                            const addRoleBelongsTo = data.addRoleBelongsTo;
                            const getDeptIdsql = `SELECT id FROM department WHERE name = (?)`;
                            const insertroleSeedSql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;

                            db.query(getDeptIdsql, addRoleBelongsTo, (err, departmentData) => {
                                if (err) {
                                    console.log(err);
                                };
                                const deptId = departmentData[0].id;

                                db.query(insertroleSeedSql, [addRoleName, addRoleSalary, deptId], (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    };
                                    this.askQuestions()
                                }
                                )
                            })
                        })
                        break;
                    case 'Add Employee':

                        inquirer.prompt(addEmployeePrompt).then((data) => {
                            const addEmployeeFName = data.addEmployeeFName;
                            const addEmployeeLName = data.addEmployeeLName;
                            const addEmployeeRole = data.addEmployeeRole;
                            const addEmployeeManager = data.addEmployeeManager.split(' ');
                            let managerId = null;
                            let roleID;
                            const addEmployeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ? ,? ,? );`;
                            console.log(addEmployeeFName);
                            console.log(addEmployeeLName);
                            console.log(addEmployeeRole);
                            console.log(addEmployeeManager);

                            db.query(`SELECT id FROM role WHERE title = ? ;`, addEmployeeRole, (err, data) => {
                                if (err) {
                                    console.log(err);
                                }
                                roleID = data[0].id;

                                db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`, addEmployeeManager, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    managerId = data[0].id;
                                    db.query(addEmployeeSql, [addEmployeeFName, addEmployeeLName, roleID, managerId], (err, data) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        console.log(`successfully added the employee `);
                                        this.askQuestions();
                                    })

                                })




                            }
                            )
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

