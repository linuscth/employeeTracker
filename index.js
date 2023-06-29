const inquirer = require('inquirer');
const mysql = require('mysql2');
const addDeptPrompt = require('./prompts/addDept');
const upddateEmployeeRolePrompt = require('./prompts/upddateEmployeeRole');
const mainPrompt = require('./prompts/prompt');
const addRolePrompt = require('./prompts/addRole');
const addEmployeePrompt = require('./prompts/addEmployee');
const viewEmployeeByManagerPrompt = require('./prompts/viewEmployeeByManager');
const viewEmployeeByDepartmentPrompt = require('./prompts/viewEmployeeByDepartment');
require('dotenv').config()
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('connected to the humanResource_db database ')
)

//mySQL queries
const viewAllEmploySql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id;`;
const viewALlRoleSql = `SELECT * FROM role;`
const addDeptSql = `INSERT INTO department (name) VALUES (?);`;
const viewALlDeptSql = `SELECT * FROM department;`;
const getDeptIdsql = `SELECT id FROM department WHERE name = ?`;
const insertroleSeedSql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
const getManagerIdSql = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`;
const addEmployeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ? ,? ,? );`;
const getRoleIdSql = `SELECT id FROM role WHERE title = ? ;`;
const updateEmployeeRoleSql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?;`;
const viewEmployeesByManagerIdSql = `SELECT id, first_name, last_name FROM employee WHERE manager_id = ?;`;
const viewEmployeesByDeptIdSql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id WHERE department.name = ?  ;`


class Questions {
    askQuestions() {
        inquirer.prompt(mainPrompt).then(
            (data) => {
                switch (data.toDo) {

                    // case 'View All Employees'
                    case 'View All Employees':

                        db.query(viewAllEmploySql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })
                        break;


                    // case 'View all Roles'
                    case 'View all Roles':

                        db.query(viewALlRoleSql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })
                        break;

                    // case 'View all Department'
                    case 'View all Department':

                        db.query(viewALlDeptSql, (err, data) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.table(data);
                            this.askQuestions()
                        })
                        break;

                    // case 'Add Department'
                    case 'Add Department':

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
                    // case 'Add Role'
                    case 'Add Role':
                        inquirer.prompt(addRolePrompt).then(async (data) => {
                            try {
                                const addRoleName = data.addRoleName;
                                const addRoleSalary = data.addRoleSalary;
                                const addRoleBelongsTo = data.addRoleBelongsTo;
                                const getDeptId = await db.promise().query(getDeptIdsql, addRoleBelongsTo);
                                const deptId = getDeptId[0][0].id;
                                await db.promise().query(insertroleSeedSql, [addRoleName, addRoleSalary, deptId]);
                                console.log('sucessfully added new role');
                                this.askQuestions()
                            } catch (error) {
                                console.log(error);
                            }
                        })
                        break;


                    // case 'Add employee'
                    case 'Add Employee':

                        inquirer.prompt(addEmployeePrompt).then(async (data) => {
                            const addEmployeeFName = data.addEmployeeFName;
                            const addEmployeeLName = data.addEmployeeLName;
                            const addEmployeeRole = data.addEmployeeRole;
                            const addEmployeeManager = data.addEmployeeManager.split(' ');
                            let managerId = null;
                            let roleID;

                            try {
                                const roleIdData = await db.promise().query(getRoleIdSql, addEmployeeRole);
                                roleID = roleIdData[0][0].id;

                                if (addEmployeeManager[0] !== 'none') {
                                    const managerIdData = await db.promise().query(getManagerIdSql, addEmployeeManager);
                                    managerId = managerIdData[0][0].id;
                                }

                                await db.promise().query(addEmployeeSql, [addEmployeeFName, addEmployeeLName, roleID, managerId]);

                                await console.log([addEmployeeFName, addEmployeeLName, roleID, managerId]);

                                this.askQuestions();
                            } catch (error) { console.log(error); }
                        })
                        break;
                    // case upddate employee role
                    case 'Update Employee Role':
                        inquirer.prompt(upddateEmployeeRolePrompt).then(async (data) => {
                            const updateEmployeeRole = data.updateEmployeeRole;
                            const addDepartmentNameArr = data.addDepartmentName.split(' ');
                            try {
                                const roleIdData = await db.promise().query(getRoleIdSql, updateEmployeeRole);
                                const roleID = [roleIdData[0][0].id];
                                const queryArr = roleID.concat(addDepartmentNameArr)
                                await db.promise().query(updateEmployeeRoleSql, queryArr);
                                await console.log('updated Employee Role');
                                this.askQuestions();

                            } catch (error) {
                                console.log(error);
                            }
                        })


                        break;

                    //case view Employees By Manager 
                    case 'View Employees By Manager':

                        inquirer.prompt(viewEmployeeByManagerPrompt).then(async (data) => {
                            const ManagerNameArr = data.viewEmployeeByManagerName.split(' ');
                            const getManagerId = await db.promise().query(getManagerIdSql, ManagerNameArr);
                            const managerId = getManagerId[0][0].id;
                            const viewEmployeesByManagerId = await db.promise().query(viewEmployeesByManagerIdSql, managerId)
                            console.table(viewEmployeesByManagerId[0])
                            this.askQuestions()
                        })


                        break;


                    //case view Employees By Department 

                    case 'View Employees By Department':

                        inquirer.prompt(viewEmployeeByDepartmentPrompt).then(async (data) => {
                            const dept = data.viewEmployeeBydepartment;
                            const viewEmployeesByDeptId = await db.promise().query(viewEmployeesByDeptIdSql, dept)
                            console.table(viewEmployeesByDeptId[0])
                            this.askQuestions()
                        })


                        break;

                    // case quit
                    case 'Quit':

                        console.log('thank you for using Employee tracker')


                        break;





                    default:
                        this.askQuestions()


                }

            })
    }

}

const testing = new Questions();

testing.askQuestions();


