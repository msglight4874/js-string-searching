function isPrefixMatched(str, strStartAt, prefix) {
  for(let idx = 0; idx < prefix.length; idx++) {
    if (prefix.charAt(idx) !== str.charAt(strStartAt + idx)) return false;
  }
  return true
}

function bruteForce(str, pattern) {
  if(str.length < pattern.length) return -1;

  for(let idx = 0; idx < str.length; idx++) {
    if (isPrefixMatched(str, idx, pattern)) return idx;
  }

  return -1;
}

exports.bruteForce = bruteForce;
