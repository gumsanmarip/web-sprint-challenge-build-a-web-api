const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const morgan = require('morgan');
const cors = require('cors');

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');

server.use(express.json());
server.use(morgan('dev'))
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
  });

server.use((err, req, res, next) => {
    res.status(500).json({
        message: `error: ${err.message}`,
        stack: err.stack,
    });
}); 

module.exports = server;
