const patterns = {
  '.com': [/Registrar Registration Expiration Date/, /: (.+)T/],
  '.org': [/Registrar Registration Expiration Date/, /: (.+)T/],
};

module.exports = {
  patterns,
};
