DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Shampoo', 'Health & Beauty', 10.95, 40); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Soap', 'Health & Beauty', 15.95, 30); 
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Mascara', 'Health & Beauty', 20.95, 20); 