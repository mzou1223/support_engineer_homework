# Support Engineer Homework Overview
This Smartrr Support Engineer Javacript portion of the project is completed in a CLI format using Node.js and npm. Please check that these are installed on your machine prior to running this application. The CLI prompts and functions were completed in one file, [functions.js](https://github.com/mzou1223/support_engineer_homework/blob/main/functions.js), for the reviewer's ease of access and efficiency.

## How to Run This Application:

**Javascript Portion:**
Assuming that you have cloned this repository, please navigate to the project directory `cd support_engineer_homework` to begin.
1. `npm i` to install all the dependencies.
2. `node functions.js` to run the CLI application. 
3. Follow the prompt and type in the choices you want to make. 
4. Press enter to get the results. 

Note: If you want to exit, type in 'no' to the prompt that asks if you want to run another report.

**SQL Portion:**
Use your SQL schema to test the queries located in [sqlQueries.sql](https://github.com/mzou1223/support_engineer_homework/blob/main/sqlQueries.sql). These are compromised based on the assumption that there is a table named `organization` for the organization_orm and a table named `account` for the account_plan_orm.

## File Walkthrough:

The project was divided into two sections: Javascript and SQL. While the CLI dislayed the results for both sections, you can delve deeper into the code to view the CSV Parsing methods, functions, and queries.
The crux of my project lies in these files: 

**Public Folder:**
- This folder contains two files: [originalacc.csv](https://github.com/mzou1223/support_engineer_homework/blob/main/public/originalacc.csv) and [originalorg.csv](https://github.com/mzou1223/support_engineer_homework/blob/main/public/originalorg.csv). These CSV files were downloaded from the `test dataset` in Google Sheets. 
  - Note: If you want to test other CSV files outside of what was provided for the assignment, I recommend dropping them into this public folder. 

**csvUtils Folder**
- This folder contains two files: [accountCSV.js](https://github.com/mzou1223/support_engineer_homework/blob/main/csvUtils/accountCSV.js) and [organizationCSV.js](https://github.com/mzou1223/support_engineer_homework/blob/main/csvUtils/organizationCSV.js). These files contain the logic to parse files in the CSV format and account for nested JSON objects. 
  - Note: Each file contains a `csvPath` variable. If you want to test CSV files, you can replace the value of `csvPath` with the new file path.

**functions.js**
- The [functions.js](https://github.com/mzou1223/support_engineer_homework/blob/main/functions.js) file has the functions necessary to run the reports for retriving optimization settings, sorting organizations, returning a list of cancelled organizations, and returning organization records in JSON format. 

**sqlQueries.sql**
- This [sqlQueries.sql](https://github.com/mzou1223/support_engineer_homework/blob/main/sqlQueries.sql) file has the sqlQueries for returning organizations without account plans, organizations with more than one account plan, organizations that have exactly one account plan, and organizations with the PASSWORDLESS features set to true. 


## Afterword:

Thank you for the opportunity to learn more about Smartrr and the Support Engineer Role. This project was interesting as there were considerations to be made at each step (e.g. developing a web application vs CLI application, utilizing different parsing methods). 

Had I elected to pursue a web application, my approach would have involved leveraging React.js as the frontend framework and incorporating Material-UI for its dynamic styling capabilities. Furthermore, I would have taken the steps to deploy it and create a Docker image. On the backend, PostgreSQL would have been my preferred database, with a REST API employed for data retrieval from the account and organization tables.

Thank you again for your time and consideration!
