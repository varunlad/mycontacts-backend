const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
        status: statusCode,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
        status: statusCode,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
        status: statusCode,
      });
    case constants.UNAUTORIZED:
      res.json({
        title: "UNAUTORIZED",
        message: err.message,
        stackTrace: err.stack,
        status: statusCode,
      });
      break;
    default:
      console.log("No error all good!")
      break;
  }
};
module.exports = { errorHandler };
