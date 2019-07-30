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

// Display all the available products and relevant info
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].id + ". " + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity);
        }
        start();
    });
}

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt([
            {
                name: "goShopping",
                type: "input",
                message: "Type a product ID",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
            }
        ])
        .then(function (answer) {

            // Make a database call to retrieve products
            connection.query("SELECT * FROM products WHERE id = " + answer.goShopping, function (err, res) {
                if (err) throw err;

                // Display Product
                if (res.length > 0) {
                    console.log("You have added " + answer.quantity + " items to your cart");

                    // Quantity available
                    console.log("Amount in stock: " + res[0].stock_quantity);

                } else {
                    console.log("Sorry but something went wrong.")
                }
                connection.end();
            });
        });
}

function displayProduct(product) {
    console.log(" ");
    console.log(" ");
    console.log("Product name: " + product.product_name);
    console.log("Department name: " + product.department_name);
    console.log("Price: " + product.price);
    console.log("Quantity: " + product.stock_quantity);
    connection.end();
}