const handleError = (err, res) => {  

  if(!err.statusCode)       
    err = {
        statusCode: 500,
        message: 'Internal server error'
    };    

  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  handleError,
  ErrorHandler
};