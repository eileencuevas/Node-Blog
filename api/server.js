// imports
const express = require('express');
const middlewareConfig = require('./config/middleware');
const usersRouter = require('./users/usersRouter');

const server = express();

// middlewares

middlewareConfig(server);


// routes

server.use('/users/', usersRouter);

// exports

module.exports = server;