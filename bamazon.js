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
                message: "Enter the ID of an item you'd like to buy",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
            }
        ])
        .then(function (answer) {
            // We need to do math to get the new value, we need to parseInt to make sure it's a number and not another format.
            var quantityPurchased = parseInt(answer.quantity);
            var product = answer.goShopping;

            // Make a database call to retrieve products
            connection.query("SELECT * FROM products WHERE id = " + answer.goShopping, function (err, res) {
                if (err) throw err;

                // Display Product and check if quantity is sufficient
                if (res.length > 0 && res[0].stock_quantity >= quantityPurchased) {
                    var newTotal = res[0].stock_quantity - quantityPurchased
                    console.log("You have added " + answer.quantityPurchased + " of this item to your cart");
                    updateQuantity(product, newTotal);

                    // Quantity available
                    console.log("Amount in stock: " + res[0].stock_quantity);

                } else {
                    console.log("Insufficient quantity!")
                    start();
                }
                connection.end();
            });
        });
}


function updateQuantity(product, quantityPurchased) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantityPurchased, product], function(err, res) { 
        console.log("Quantity updated: " + quantityPurchased)
    });
};


// function displayProduct(product) {
//     console.log(" ");
//     console.log(" ");
//     console.log("Product name: " + product.product_name);
//     console.log("Department name: " + product.department_name);
//     console.log("Price: " + product.price);
//     console.log("Quantity: " + product.stock_quantity);
//     connection.end();
// }