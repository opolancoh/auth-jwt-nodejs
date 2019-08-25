const roles = {
  admin: 'admin',
  owner: 'owner',
  customer: 'customer'
};

function getRoles() {
  const ret = [];
  for (const role in roles) ret.push(role);
  return ret;
}

module.exports = {
  roles,
  getRoles
};
