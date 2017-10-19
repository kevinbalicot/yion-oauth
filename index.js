const request = require('request');

module.exports = (uri, method = 'GET') => {

    return {
        type: 'security',
        handle: (req, res, app, next) => {
            req.isAuthenticated = (accessToken = null) => {
                return new Promise((resolve, reject) => {
                    if (!accessToken && !req.headers['authorization']) {
                        return reject({ error: 'not_authenticated', message: 'Not authenticated'});
                    }

                    req.attributes['oauth_access_token'] = accessToken || req.headers['authorization'].replace(/Bearer ?/i, '');

                    request(
                        {
                            method,
                            uri,
                            rejectUnauthorized: false,
                            headers: { Authorization: accessToken || req.headers['authorization'] }
                        },
                        (error, response, body) => {
                            if (!!error) {
                                return reject(error);
                            }

                            const result = JSON.parse(body);

                            req.attributes['oauth_user'] = result

                            if (!!result.error) {
                                return reject(result);
                            }

                            resolve(result);
                        }
                    );
                });
            };

            next();
        }
    };
};
