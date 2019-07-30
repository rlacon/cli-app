var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "marsball",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].id + ". " + res[i].product_name);
        }
        start();
    });
}

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "goShopping",
            type: "input",
            message: "Type a product ID",
        })
        .then(function (answer) {
            // based on their answer, show the available products
            if (answer.goShopping === res[i].id) {
                console.log("You selected: " + goShopping.response[i]);
            } else {
                console.log("else is ran: ")
                connection.end();
            }
        });
}