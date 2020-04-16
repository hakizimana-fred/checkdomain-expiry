module.exports = {
  delayCall,
  logTwoColumnPadded,
};

function delayCall(fn, t) {
  if (typeof fn !== 'function') {
    throw new Error('delayCall is expecting a function');
  }

  setTimeout(() => {
    fn();
  }, t || 1000);
}

function logTwoColumnPadded(left, right, leftWidth, isError) {
  if (arguments.length < 3) {
    throw new Error('at least 3 arguments is required');
  }

  left = left || '';
  right = right || '';

  const msg = left.padify(leftWidth) + ' | ' + right;

  if (isError) {
    console.error(msg);
  } else {
    console.log(msg);
  }
}

const manySpaces = '                                        ';
String.prototype.padify = function padify(length, rightAlign) {
  if (rightAlign) {
    return manySpaces.substring(0, length - this.length) + this;
  }

  return this + manySpaces.substring(0, length - this.length);
};
