const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const calculateToken = (id) => {
    return jwt.sign({ user_id: id}, process.env.PRIVATE_KEY);
}

module.exports = {
    calculateToken,
}