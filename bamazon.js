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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].id + ". " + "|| " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity);
            console.log("=================================================================");
        }
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
            console.log("answer: " + JSON.stringify(answer));
            // Checking to make sure the inputted productID ID is valid 
            if ((answer.productID > res.length) || (answer.productID < 1)) {
                console.log("================================================================");
                console.log("You entered an invalid productID ID. Please make another selection");
                console.log("================================================================");
                afterConnection();
            } else {

                // Make a database call to retrieve products
                connection.query("SELECT * FROM products WHERE id = " + answer.productID, function (err, res) {
                    var quantityPurchased = parseInt(answer.quantity);
                    var productID = answer.productID;
                    if (err) throw err;

                    // Display productID and check if quantity is sufficient
                    if (res.length >= 0 && res[0].stock_quantity >= quantityPurchased) {
                        var newQuantity = res[0].stock_quantity - quantityPurchased;
                        console.log("===========================================");
                        console.log("You have added " + quantityPurchased + " of this item to your cart");
                        console.log("===========================================");
                        updateQuantity(productID, newQuantity, res[0].stock_quantity);

                        // Display current quantity
                        console.log("Amount in stock: " + res[0].stock_quantity);
                        console.log("===========================================");

                    // If quantity isn't sufficient
                    } else {
                        console.log("==================================================");
                        console.log("Insufficient quantity! Please enter a valid amount");
                        console.log("==================================================");
                        start();
                    }
                    connection.end();
                });
            }
        });
}

// Display the updated quantity
function updateQuantity(productID, newQuantity, originalQuantity) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, productID], function (err, res) {
        if(err) throw err;
        console.log("res: " + JSON.stringify(res));
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