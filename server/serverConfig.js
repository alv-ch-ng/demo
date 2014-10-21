var defaults = {
    serverHost: 'localhost',
    serverPort: 8088,
    appName: "sysinfos"
}

var serverHost = process.env.OPENSHIFT_NODEJS_IP;
if (!serverHost) {
    serverHost = defaults.serverHost;
    console.warn('No OPENSHIFT_NODEJS_IP environment variable, ' + defaults.serverHost + ' will be used.');
};

var serverPort = parseInt(process.env.OPENSHIFT_NODEJS_PORT);
if (!serverPort) {
    serverPort = defaults.serverPort;
    console.warn('No OPENSHIFT_NODEJS_PORT environment variable, ' + defaults.serverPort + ' will be used.');
};

var appName = process.env.OPENSHIFT_APP_NAME;
if (!appName) {
    appName = defaults.appName;
    console.warn('No OPENSHIFT_APP_NAME environment variable, ' + defaults.appName + ' will be used.');
};

exports = module.exports;

exports.config = {
    serverHost: serverHost,
    serverPort: serverPort,
    appName: appName
};