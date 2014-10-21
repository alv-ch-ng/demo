#!/bin/env node

var serverConfig = require('./serverConfig').config;
var routeConfig = require('./routeConfig');

exports = module.exports;
exports.createServer = function(enableMongodb){

    // Scope
    var server = this;

    server.app = (function() {
        var express = require('express');
        var app = express();

        // use body-parser to fetch the body content
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        // override with POST having ?_method=DELETE
        var methodOverride = require('method-override');
        app.use(methodOverride('_method'))

        // define the url mappings
        routeConfig.apply(app);

        return app;
    }());

    //starting the nodejs server with express
    server.startInternal = function(){
        server.app.listen(serverConfig.serverPort, serverConfig.serverHost, function(){
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), serverConfig.serverHost, serverConfig.serverPort);
        });
    }

    // Destructors
    server.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
            process.exit(1);
        };
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    process.on('exit', function() { server.terminator(); });

    server.terminatorSetup = function(element, index, array) {
        process.on(element, function() { server.terminator(element); });
    };

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(server.terminatorSetup);

    if (enableMongodb === 'true') {
        server.start = function() {
            require('./mongodbAdapter').connectDb(server.startInternal);
        }
    } else {
        server.start = function() {
            server.startInternal();
        }
    }
    return server;
};