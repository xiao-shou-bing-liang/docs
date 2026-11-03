---
date: 2025-10-05
---

# day-01


## Today's Table of Contents

- [01-Overview of Software Development](#_01-overview-of-software-development)
- [02-Cangqiong Waimai Project Introduction](#_02-cangqiong-waimai-project-introduction)
- [03-Development Environment Setup](#_03-development-environment-setup)
- [04-Importing the API Documentation](#_04-importing-the-api-documentation)
- [05-Swagger](#_05-swagger)

## 01-Overview of Software Development

## 1.Software Development Process

### Requirements Analysis

- Requirements specification
- Product prototype

### Design

- UI design
- Database design
- API design

### Coding

- Project code
- Unit tests

### Testing

- Test cases
- Test reports

### Deployment and Operations

- Software environment installation
- Configuration

## 2.Role Division

### Project Manager

Responsible for the entire project, task assignment, and progress control

### Product Manager

Conducts requirements research and outputs requirements research documents, product prototypes, and so on

### UI Designer

Outputs interface mockups based on the product prototype

### Architect

Overall project architecture design, technology selection, and so on

### Development Engineer

Code implementation

### Test Engineer

Writes test cases and outputs test reports

### Operations Engineer

Software environment setup and project deployment

## 3.Software Environments

### Development Environment (development)

The environment developers use during the development phase; generally external users cannot access it

### Testing Environment (testing)

An environment dedicated to testers, used for testing the project; generally external users cannot access it

### Production Environment (production)

That is, the online environment, the environment that formally provides external services

## 02-Cangqiong Waimai Project Introduction

## 1.Project Introduction

### Positioning

A software product tailored specifically for food and beverage businesses (restaurants, dining establishments)

- Admin side - used by takeout merchants
- User side - used by customers placing orders

### Functional Architecture

1. Admin side
    - Employee management
    - Category management
    - Dish management
    - Set meal management
    - Order management
    - Workbench
    - Data statistics
    - New order alerts
2. User side
    - WeChat login
    - Product browsing
    - Shopping cart
    - Placing orders
    - WeChat Pay
    - Order history
    - Address management
    - Order reminders

## 2.Product Prototypes

### Product Prototypes

Used to demonstrate the project's business functions; generally designed by the product manager

## 3.Technology Selection

1. User layer
    - Node.js
    - Vue.js
    - element plus
    - WeChat Mini Program
    - apache echarts
2. Gateway layer
    - Nginx
3. Application layer
    - Springboot
    - SpringMvc
    - Spring Task
    - httpclient
    - Spring Cache
    - JWT
    - Alibaba Cloud OSS
    - Swagger
    - POI
    - WebSocket
4. Data layer
    - MySQL
    - Redis
    - mybatis
    - pagehelper
    - spring data redis
5. Tools
    - Git
    - maven
    - Junit
    - postman

## 03-Development Environment Setup

## 1.Frontend Environment Setup

Because Cangqiong Waimai is mainly a backend project, the frontend code is simply provided ready-made 

In the provided materials, drag nginx to a location whose path contains no Chinese characters, then just double-click to start it and visit localhost:80

## 2.Backend Environment Setup

### Overall Directory Structure

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-1.webp)

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-2.webp)

### Creating the Git Repository

Nothing much to say here, it is all the usual boilerplate: git init, then git remote add origin `<url>`

and then git push -u origin master to push it up; that is about it

### Setting Up the Database Environment

Here you just use the SQL file he provided, copy and paste it into DataGrip, and execute it with one click

### Frontend-Backend Integration Testing

Still just visit localhost:80 and log in directly. What needs emphasis here is that you have to modify the datasource configuration in the project's application-dev.yml file

And now testing the login feature shows that login already succeeds

## 3.Improving the Login Function

Problem: passwords in the employee table are stored in plaintext, which is too insecure. The approach is as follows:

- Encrypt passwords before storing them to improve security
- Use MD5 hashing to encrypt the plaintext password

After frontend-backend integration testing, we set breakpoints and debugged to find the password comparison part

Then, first of all, we need to change the password of admin in the employee table in the original database to the encrypted version

- Original: 123456
- Encrypted: e10adc3949ba59abbe56e057f20f883e

The encryption code for this part was still CV'd from a Bilibili danmaku

### EmployeeServiceImpl

You just need to reassign password to the MD5-hashed ciphertext above the part that checks whether it equals the one in the database, and then compare it with the ciphertext in the database

```java
password = DigestUtils.md5DigestAsHex(password.getBytes());
if (!password.equals(employee.getPassword())) {
    //密码错误
    throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
}
```

Finally, test frontend-backend integration to check whether login succeeds

## 04-Importing the API Documentation

## Frontend-Backend Separation Development Workflow

![9cc1922e-72c5-4be3-8a44-e25c06f90a03.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/前后端分离开发流程.webp)

## Steps

So now I have to talk about how the API documentation here was imported

The materials provide two JSON API documentation files in YApi format

Then in Apifox create an empty project named Cangqiong Waimai, then create two directories in the root directory, one named Admin-side APIs and the other User-side APIs, and then import the corresponding JSON files under these two folders respectively; the import format is YApi, and then you get the complete API documentation

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-3.webp)

## 05-Swagger

Honestly, Apifox is so awesome that this thing is completely useless; correct, fair, and to the point ✍️✍️✍️✍️

## Introduction

![image.png](/老博客/基础知识/后端开发/苍穹外卖/图片素材库/image-4.webp)

## How to Use

1. Import the knife4j Maven coordinates
2. Add the knife4j-related configuration to the configuration class
3. Set up static resource mapping, otherwise the API documentation page cannot be accessed

In this prepared project code, really you just run it and then directly visit localhost:8080/doc.html
