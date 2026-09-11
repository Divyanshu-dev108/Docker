MANAGING APPLICATION SECRETS - DOCKER COMPOSE PRACTICAL
============================================================

PROJECT STRUCTURE
-----------------
manage-secrets-demo/
  db_password.txt
  docker-compose.yml
  backend/
    Dockerfile
    package.json
    server.js

IMPORTANT
---------
This practical is prepared for Windows PowerShell.
The password is stored separately in db_password.txt and is exposed to
the containers as /run/secrets/db_password.

STEP 1 - CHECK DOCKER
---------------------
Open PowerShell and run:

docker --version

docker compose version

STEP 2 - ENTER THE PROJECT
--------------------------
After extracting this folder, open PowerShell in the project folder.

Example:

cd C:\path\to\manage-secrets-demo

STEP 3 - CHECK FILES
--------------------
dir

dir backend

STEP 4 - START THE PROJECT
--------------------------
docker compose up --build

This builds the backend image and starts both backend and MySQL.

Expected backend messages include:

Server running on port 5000
Connected to database securely using secret

STEP 5 - TEST THE BACKEND
-------------------------
Open another PowerShell window and run:

curl http://localhost:5000

Expected:

Backend is running with secure secret-based configuration

You can also open this in a browser:

http://localhost:5000

STEP 6 - RUN IN BACKGROUND
--------------------------
Stop the foreground process with Ctrl+C, then:

docker compose up -d

Check services:

docker compose ps

STEP 7 - VIEW LOGS
------------------
All logs:

docker compose logs

Backend logs:

docker compose logs backend

Database logs:

docker compose logs database

STEP 8 - STOP AND REMOVE SERVICES
---------------------------------
docker compose down

STEP 9 - REBUILD
----------------
If you change Dockerfile or package configuration:

docker compose up --build

STEP 10 - USEFUL DOCKER COMMANDS
--------------------------------
docker ps
docker ps -a
docker images
docker compose ps
docker compose logs
docker compose down
docker compose up
docker compose up -d
docker compose up --build

WHAT THE IMPORTANT FILES DO
---------------------------
db_password.txt
Contains the database password for this classroom demonstration.

docker-compose.yml
Defines backend and database services and declares the secret.

backend/server.js
Reads the secret from:

/run/secrets/db_password

and uses it as the MySQL password.

backend/Dockerfile
Builds the Node.js backend image.

KEY CONCEPT
-----------
Do not hardcode:

password: "rootpassword"

Instead, read the secret at runtime from:

/run/secrets/db_password

VIVA QUESTIONS
--------------
1. What is a secret?
A secret is sensitive information such as a password, API key, token,
certificate, or private key.

2. Why should passwords not be hardcoded?
Because they can be exposed in source code, configuration files,
Git repositories, logs, or to unauthorized users.

3. Where does our secret come from?
db_password.txt

4. Where is the secret available inside the container?
/run/secrets/db_password

5. How does Node.js read the secret?
Using fs.readFileSync().

6. Why is the database host "database"?
Because database is the Docker Compose service name.

7. What does MYSQL_ROOT_PASSWORD_FILE do?
It tells MySQL to read the root password from the specified file.

8. What does depends_on do?
It specifies that the backend depends on the database service.

9. What does docker compose up --build do?
It builds the required images and starts the Compose services.

10. What does docker compose down do?
It stops and removes the Compose containers and network.

SECURITY NOTE
-------------
For a real production project, do not commit db_password.txt to Git.
Use an appropriate secret-management system and follow your deployment
platform's security practices.

END
