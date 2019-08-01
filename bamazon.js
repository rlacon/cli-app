var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var colors = require('colors');

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

// Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected as id " + connection.threadId);
    console.log("=================================================================");
    afterConnection();
});

// Display all the available products and relevant info
function afterConnection() {
    var table = new Table({
        head: ['Product ID'.blue, 'Product'.blue, 'Department'.blue, 'Price'.blue, 'Quantity'.blue]
        , colWidths: [15, 30]
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        start(res);
    });
}

// function which prompts the user for what action they should take
function start(res) {
    inquirer
        .prompt([
            {
                name: "productID",
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
            
            // Checking to make sure the inputted productID ID is valid 
            if ((answer.productID > res.length) || (answer.productID < 1)) {
                console.log("==================================================================".red);
                console.log("You entered an invalid productID ID. Please make another selection".red);
                console.log("==================================================================".red);
                afterConnection();
            } else {

                // Make a database call to retrieve products
                connection.query("SELECT * FROM products WHERE id = " + answer.productID, function (err, res) {
                    if (err) throw err;
                    var quantityPurchased = parseInt(answer.quantity);
                    var productID = answer.productID;
                    var originalQuantity = res[0].stock_quantity;
                    var originalPrice = res[0].price;

                    // Display productID and check if quantity is sufficient
                    if (res.length >= 0 && originalQuantity >= quantityPurchased) {
                        var newQuantity = originalQuantity - quantityPurchased;
                        console.log("===========================================");
                        console.log("You have added " + quantityPurchased + " of this item to your cart");
                        console.log("===========================================");
                        updateQuantity(productID, newQuantity);

                        // Display the total price value
                        // let totalPrice = totalPrice();
                        console.log("Your total is: " + "$".green + totalPrice(originalPrice, quantityPurchased));
                        console.log("===========================================");

                    // If quantity isn't sufficient
                    } else {
                        console.log("==================================================".red);
                        console.log("Insufficient quantity! Please enter a valid amount".red);
                        console.log("==================================================".red);
                        start();
                    }
                    connection.end();
                });
            }
        });
}

// Adding the total price
function totalPrice(originalPrice, quantityPurchased) {
    var totalPrice = originalPrice * quantityPurchased
    return totalPrice.toFixed(2).green;
}

// Display the updated quantity
function updateQuantity(productID, newQuantity) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, productID], function (err, res) {
        if (err) throw err;
        console.log("Updated quantity: " + newQuantity);
        console.log("===========================================");
    });
};

// function displayProduct(productID) {
//     console.log(" ");
//     console.log(" ");
//     console.log("productID name: " + productID.product_name);
//     console.log("Department name: " + productID.department_name);
//     console.log("Price: " + productID.price);
//     console.log("Quantity: " + productID.stock_quantity);
//     connection.end();
// }