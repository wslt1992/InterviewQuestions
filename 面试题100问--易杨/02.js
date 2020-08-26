/*
['1', '2', '3'].map(parseInt) what & why */

console.log(['1', '2', '3'].map(parseInt))

const unary = fn=>val=>fn(val)
const parseIntOne = unary(parseInt)

console.log(['1', '2', '3'].map(parseIntOne))