const rateLimit = require('express-rate-limit') 



const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,  // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})


module.exports = Limiter