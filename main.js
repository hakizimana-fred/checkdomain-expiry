const moment = require('moment');
const whois = require('whois');

const tlds = require('./tlds');

module.exports = {
  lookupExpiryForDomain,
};

function lookupExpiryForDomain(domain) {
  console.log(domain);
  return new Promise((resolve, reject) => {
    let tld = domain.substring(domain.indexOf('.')),
      pttn = tlds.patterns[tld];
    console.log(pttn);

    if (!pttn) {
      return reject(`TLD "${tld}" does not have parser patterns set`);
    }

    whois.lookup(domain, (err, data) => {
      if (err) {
        return reject(err);
      }

      let expiry;
      data.split('\n').forEach((ln) => {
        if (pttn[0].test(ln)) {
          expiry = ln.match(pttn[1])[1];
        }
      });

      if (expiry) {
        const date = moment(expiry, pttn[2]);
        resolve(
          date.format('YYYY-MM-DD') +
            ' (' +
            date.diff(moment(), 'days') +
            ' days)',
        );
      } else {
        reject('No expiry found');
      }
    });
  });
}
