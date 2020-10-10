# Starlord
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Starlord is a full fledged online examination solution. It holds the functionality to create as well as attempt examinations.

  - App has all the users divided in 2 roles.
      - Teacher
      - Student
  - A teacher can create an examination.
  - To login as a teacher, use the follwing credentials:
      -teacher@gmail.com
      -1234
  - A student can attempt an examination.
  - You can register as a student and then login with the same credentials


    

### Tech

Starlord uses the following technologies:

* [ReactJS] - HTML enhanced for web apps!
* [nodeJS] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [Mysql] - the age old way to store data
* [Sequelize] - Orm for nodeJS

### Installation

Starlord requires [Node.js](https://nodejs.org/) v6+ to run.

#### Backend
Install the dependencies and devDependencies and start the server.

```sh
$ cd starlord/exam/backend
$ npm install -d
$ touch .env
$ echo "JWT_SECRET=random_string">.env
$ node server.js
```

#### Frontend

```sh
$ cd starlord/exam/frontend
$ npm install -d
$ npm start
```



