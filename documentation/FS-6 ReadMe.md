## Installation
Using npm you may install additional frameworks using:
1. $ npm i 
    OR
1. $ npm install

## Necessary tools
For the work with this part of task you need:
1. nest.js

How to install: 
$ npm i -g @nestjs

2. typeorm

How to install: 
$ npm i --save typeorm

3. bcrypt

How to install: 
$ npm i bcrypt

4. passport

How to install: 
$ npm i --save @nestjs/passport
$ npm i --save-dev @types/passport

5. jwt (json web token)

How to install: 
$ npm install @nestjs/jwt

## About
In this part of task there is an endpoint /login. There is also one function in User Service, 
which can let you find user using entered data and one function in Auth Service which can let you login using json web token and passport authentication system and of course using entered data. This function is used in App Controller, in Post decorator. Using command "http://localhost:3000/login" you may try it out.