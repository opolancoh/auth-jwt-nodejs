const jwt = require('jsonwebtoken');

function authorize(roles) {
  return (
    authorize[roles] ||
    (authorize[roles] = function(req, res, next) {
      const token = req.headers['x-auth-token'];
      if (!token)
        return res
          .status(200)
          .send({ code: 401, message: 'Access denied. No token provided.' });

      try {
        // if token is valid, add user to the request
        const decoded = jwt.verify(token, process.env['AUTHAPP_JWTPK']);

        if (Array.isArray(roles) && roles.length > 0) {
          let hasPermission = false;
          for (let rol of roles) {
            if (decoded.roles.indexOf(rol) !== -1) {
              hasPermission = true;
              break;
            }
          }

          if (!hasPermission)
            return res.status(200).send({
              code: 403,
              message: 'User has insufficient permissions.'
            });
        }

        req.user = decoded;
        next();
      } catch (ex) {
        res.status(200).send({ code: 400, message: 'Invalid token.' });
      }
    })
  );
}

module.exports = authorize;
