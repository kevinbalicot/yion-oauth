# YION OAUTH PLUGIN

A OAuth plugin for framework [Yion](https://www.npmjs.com/package/yion)

You need a OAuth authorize token server

## Install

```
$ npm install --save yion-oauth
```

## Usage

```javascript
const { createServer, createApp } = require('yion');
const security = require('yion-oauth')(urlToValidateToken, methodOfUrl);

const app = createApp();
const server = createServer(app, [security]);

app.get('/', (req, res) => {
    req.isAuthenticated().then().catch(); 
});
```

## API reference

Response render method :

* `isAuthenticated(token=null)`: call OAuth authorize server to validate token (from headers['Authorization'] or from token parameter) 

