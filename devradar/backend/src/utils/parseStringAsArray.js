module.exports = arrayAsString => arrayAsString
    .split(',')
    .map(e => e.trim());