const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err }; // CREATE A COPY OF THE ERROR OBJECT
    error.message = err.message; // ASSIGN MESSAGE PROPERTY TO THE ERROR OBJECT
    console.error(err);

    // ?HANDLE MONGOOSE bad ObjectId
    if (error.name === "CastError") {
      const message = `Resource not found.`;
      error = new Error(message);
      error.statusCode = 404;
    }

    // ?HANDLE MONGOOSE duplicate key
    if (error.code === 11000) {
      const message = `Duplicate field value entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    // ?HANDLE VALIDATION ERRORS
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((el) => el.message); // MAPPING OVER THE VALUES SINCE MAY HAVE MULTIPLE ERRORS
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Sever Error",
    });
  } catch (error) {
    next(error); // SEND ERROR TO NEXT STEP TO LET US KNOW ERROR ACTUALLY HAPPENED
  }
};

export default errorMiddleware;
