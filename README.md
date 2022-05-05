# Authentication application
I made this application as a school project and learning project, to learn interaction with the backend.

# About the application

## Requirements
- git
- nodeJs, npm


## Prerequisites
  1. Clone the project
  
    git clone https://github.com/GalMarkelj/authentication-app.git
    cd ./authentication-app
    
  2. Install the dependencies

    npm install
    
  3. Store your secret in an .env file

    echo "SESSION_SECRET=<your-secret>  >  ./.env"
    
  4. Start the server
  
    npm run devstart
    
  5. Visit localhost:8050

## About the application
Meaning of the application is to learn and preform CRUD operations with the database.
I'm using SQLite for my database

As you open the application you can register, login and then you can insert your 'personal info' and later also update it.

### Note 
You can login as admin and you will be able too see all the users and also delete them with their ID.

Username: admin

Password: admin
