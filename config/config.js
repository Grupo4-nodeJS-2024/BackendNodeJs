require('dotenv').config();

module.exports = {
    secretKey: process.env.SECRET_PHR,
    tokenExpiresIn: '1h'
};