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
        // ------------------------------------------------------------
        // NEED HELP IN THIS PART WITH CONSOLE LOGGING THE USER'S INPUT. SHOULD DISPLAY THE PRODUCT NAME THEY SELECTED
        .then(function (answer) {
            //console.log("Answer: " + JSON.stringify(answer));
            // Make a database call to retrieve products
            connection.query("SELECT * FROM products WHERE id = " + answer.goShopping, function(err, res) {
                if (err) throw err;
                //console.log("We found a product! "+ JSON.stringify(res));
                // Display Product
                if(res.length > 0){
                    displayProduct(res[0]);
                }else {
                    console.log("Sorry but something went wrong.")
                }
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