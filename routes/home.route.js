const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    let message = '<h1>Authentication & Authorization App with NodeJS and JWT</h1>\n';
    message += '<h2>Request received</h2>\n';
    message += '<h3>Headers</h3>\n';
    message += JSON.stringify(req.headers);
    message += '<h3>Body</h3>\n';
    message += JSON.stringify(req.body);
    message += '<h3>Query</h3>\n';
    message += JSON.stringify(req.query);
    res.send(message);
});

module.exports = router;
