//const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const service = require('./auth.service');

/*router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});*/

router.post('/login', async (req, res) => {
  const result = await service.login(req.body);
  if (result.code === 200)
    res
      .status(200)
      .header('x-auth-token', result.d.token)
      .send({ code: 200, message: 'Login successful.' });
  else res.status(200).send(result);
});

module.exports = router;
