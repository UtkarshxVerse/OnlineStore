var jwt = require('jsonwebtoken');

function createUniqueImageName(image){
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}_${randomNum}.jpg`;
}

const generateToken = (token) => jwt.sign(token, process.env.SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);

// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

module.exports = {createUniqueImageName , generateToken , verifyToken};