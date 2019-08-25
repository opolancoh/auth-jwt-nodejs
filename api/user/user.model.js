const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getRoles } = require('../../helpers/auth.helper');

//simple schema
const ModelSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  roles: [String]
});
const model = mongoose.model('User', ModelSchema);

ModelSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env['AUTHAPP_JWTPK']
  );
  return token;
};

const objectSchema = {
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email(),
  password: Joi.string()
    .min(3)
    .max(255)
    .required(),
  roles: Joi.array()
    .items(Joi.string().valid(getRoles()))
    .required()
};

//function to validate user
function validate(user) {
  return Joi.validate(user, objectSchema);
}

module.exports = { User: model, schema: objectSchema, validate };
