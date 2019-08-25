const bcrypt = require('bcrypt');

const { User, validate } = require('./user.model');

const find = async function() {
  const users = await User.find();
  return {
    code: 200,
    d: users
  };
};

const findById = async function(id) {
  console.log(id)
  const user = await User.findById(id).select('-password');
  return {
    code: 200,
    d: user
  };
};

const create = async function(user) {
  // input validation
  const { error } = validate(user);
  if (error)
    return {
      code: 400,
      message: 'Invalid request data.',
      errors: error.details
    };

  // check if user already exists
  const userExists = await User.findOne({ email: user.email });
  if (userExists)
    return { code: 409, message: `User '${user.email}' already exists.` };

  let newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
    roles: user.roles
  });
  newUser.password = await bcrypt.hash(user.password, 10);
  await newUser.save();

  delete newUser._doc['password'];

  return { code: 201, message: 'User created.', d: newUser };

  /*const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email
  });*/
};

module.exports = {
  create,
  find,
  findById
};
