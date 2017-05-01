Mitrais Final Project
======================
## Overview
This project uses the following technologies:
1. Database - MySQL
2. Backend - Spring Java Framework
3. Frontend - Angular2

## Setting Up
This project uses the default MySQL configuration from XAMPP, which uses the port 3306 with the following credentials:
* DB Name   : emsdb
* Username  : root
* Password  : 

Please kindly edit the **application.properties** file located in the **backend/src/main/resources** directory to reconfigure the database.

## Running the Project
Before running the project, please make sure you have Maven installed.
1. Run MySQL (using XAMPP is recommended).
2. Import the database using the provided script (**emsdb-script.sql**) located in **backend** directory.
3. Run Spring Boot (use the **mvn spring-boot: run** command in Terminal/Command Prompt/Powershell) from the backend directory.
4. Run Angular CLI (use the **npm run start** command in Terminal/Command Prompt/Powershell).
5. Access localhost:4200 to view the web application.
