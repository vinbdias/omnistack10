module.exports = arrayAsString => arrayAsString
    .split(',')
    .map(arrayElement => arrayElement.trim());