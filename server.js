#!/bin/env node
var server = require('./server/serverFactory').createServer('<%= addMongodb %>');
// grant static access to content of /public
server.app.use(require('express').static(__dirname + '/public'));
server.start();