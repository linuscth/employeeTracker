
const updateEmployeeRole = [
    // update employee role option 
    {
        type: 'list',
        name: 'updateEmployeeRole',
        message: "What employee's role do you want to update?",
        // choices: db.query(`SELECT * FROM role;`, (err, data) => { return data.title })
    },
    {
        type: 'list',
        name: 'addDepartmentName',
        message: "Which role do you want to assign the selected employee?",
        //choices: get data from MYSQL 
        when(answers) {
            return answers.updateEmployeeRole
        }
    },

]