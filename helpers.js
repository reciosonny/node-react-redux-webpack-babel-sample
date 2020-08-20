
module.exports = {

  controllerMiddleware: (controller) => {
    var extendedFunctions = {};
  
    for (const key in controller) {
  
      // we extend the functions of controller actions and add middleware for functionality
      extendedFunctions[key] = async (req, res) => {
  
        // We use try-catch to also catch unhandled promise rejections...
        try {
          // console.log("Controller middleware...");
          await controller[key](req, res);
        } catch (ex) {
          console.log("error: ", ex)
          if (ex.name == 'ValidationError') {
            const { errors } = ex;
            const errorLists = this.formatErrorValidations(errors);
  
            res.status(400).send({ status: 'error', message: ex.message, errors: errorLists });
          } else if (ex.code == 11000) {
            res.status(500).send({ status: 'error', message: ex.errmsg, errors: {} });
          } else {
            res.status(500).send({ status: 'error', message: ex.stack, errors: {} });
          }
        }
      }
    }
  
    return extendedFunctions;
  }
};