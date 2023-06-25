const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GayauGayau',
        database: 'humanResource_db'
    },
    console.log('connected to the humanResource_db database ')
)
