class Error {
  static handleError(error, statusCode, response) {
    return response.status(statusCode).json({
      success: false,
      message: 'server error',
      error
    });
  }
}

export default Error;