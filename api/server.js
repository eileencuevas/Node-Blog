// imports
const express = require('express');
const middlewareConfig = require('./config/middleware');
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');

const server = express();

// middlewares

middlewareConfig(server);


// routes

server.use('/api/users/', usersRouter);

server.use('/api/posts/', postsRouter);
// exports

module.exports = server;