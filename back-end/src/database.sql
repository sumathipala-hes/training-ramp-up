CREATE DATABASE gridtable;

CREATE TABLE userdetails(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INTEGER,
    dateOfBirth DATE,
    gender VARCHAR(100),
    mobileNumber INTEGER,
    address VARCHAR(255)
);

CREATE TABLE userdetails(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    age INTEGER,
    dateOfBirth DATE,
    gender VARCHAR(100),
    mobileNumber INTEGER,
    address VARCHAR(255)
);
