const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../api/user/user.model');

/*service.signup = async item => {
  return await userService.create(item);
};*/

const login = async credentials => {
  if (!credentials.email || !credentials.password)
    return { code: 400, message: 'Invalid email or password.' };

  // Find a user with by email
  let user = await User.findOne({ email: credentials.email });
  if (!user) return { code: 400, message: 'Invalid email or password.' };

  const validPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (!validPassword)
    return { code: 400, message: 'Invalid email or password.' };

  const token = jwt.sign(
    { id: user._id, userName: user.name, roles: user.roles },
    process.env['AUTHAPP_JWTPK'],
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );
  return { code: 200, d: { token } };
};

module.exports = { login };
