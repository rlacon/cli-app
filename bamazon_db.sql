DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Tea Tree Special Shampoo', 'Health & Beauty', 10.95, 40); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Softsoap Liquid Hand Soap', 'Health & Beauty', 7.95, 30); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Neutrogena Hydrating Gel', 'Health & Beauty', 8.35, 20); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Fire Emblem: Three Houses', 'Video Games', 59.99, 50); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Hollow Knight', 'Video Games', 19.99, 25); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Animal Crossing', 'Video Games', 39.99, 30); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bose QuietComfort Headphones', 'Electronics', 349.99, 15); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Samsung 55-Inch 4K TV', 'Electronics', 497.99, 25); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Catnip Banana Cat Toy', 'Pet Supplies', 45.85, 50); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('GoCat Da Bird Wand', 'Pet Supplies', 8.95, 45); 