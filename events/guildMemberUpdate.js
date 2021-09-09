const ddiff = require('return-deep-diff');
module.exports = (oMember, nMember) => {
  console.log(ddiff(oMember, nMember));
};