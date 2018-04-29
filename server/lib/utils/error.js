
const InternalError = 'InternalError';

const StatusPreconditionFailed = 412;
const StatusInternalError = 500;

const handlers = {
  JsonSchemaValidationError: ({ validationErrors: { body } }) => {
    const errors = body.map((error) => {
      const { dataPath, message, params: { missingProperty } } = error;
      const field = dataPath.length > 0 ? dataPath.split('.').pop() : missingProperty;

      return { field, message };
    });

    return {
      status: StatusPreconditionFailed,
      errors,
    };
  },

  InternalError: (errors = []) => ({
    status: StatusInternalError,
    errors,
  }),

  UnHandledError: (errors = []) => ({
    status: StatusInternalError,
    errors,
  }),
};

const errorHandler = (err, req, res, next) => {
  const handler = handlers[err.name] || handlers.UnHandledError;
  const { status, errors } = handler(err);
  res.status(status).send(errors);
  next();
};

module.exports = {
  errorHandler,
  InternalError,
};
