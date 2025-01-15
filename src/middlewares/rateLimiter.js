const rateLimiter = require('express-rate-limit');


const Limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = Limiter;
