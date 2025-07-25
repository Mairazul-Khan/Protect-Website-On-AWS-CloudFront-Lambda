'use strict';

exports.handler = (event, context, callback) => {

    // Get request and request headers
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // Define your username and password here
    const USERNAME = 'mkdevops';
    const PASSWORD = 'passmum';
    const encodedCredentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

    // Check for Basic Authentication header
    if (typeof headers.authorization !== 'undefined') {
        const providedCredentials = headers.authorization[0].value.split(' ')[1];
        if (providedCredentials === encodedCredentials) {
            // Continue request processing if credentials match
            return callback(null, request);
        }
    }

    // Return a 401 Unauthorized response if credentials are missing or don't match
    const response = {
        status: '401',
        statusDescription: 'Unauthorized',
        body: 'Unauthorized',
        headers: {
            'www-authenticate': [{ key: 'WWW-Authenticate', value:'Basic' }]
        },
    };
    callback(null, response);
};
