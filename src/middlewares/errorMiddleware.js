
const globalError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    if(process.env.NODE_ENV === "development"){
        developmentError(err,res)
    } else {
        productionError(err,res)
    }
}

const developmentError = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        stack:err.stack,
        trace:err.trace
    })
}
const productionError = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

module.exports = globalError