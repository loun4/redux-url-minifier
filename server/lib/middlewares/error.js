
const InternalError = 'InternalError';
const NotFoundError = 'NotFoundError';
const NotAuthorizedError = 'NotAuthorizedError';

const StatusPreconditionFailed = 412;
const StatusNotFound = 404;
const StatusInternalError = 500;
const StatusNotAuthorized = 401;


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

  NotFoundError: (errors = []) => ({
    status: StatusNotFound,
    errors,
  }),

  InternalError: (errors = []) => ({
    status: StatusInternalError,
    errors,
  }),

  NotAuthorizedError: (errors = []) => ({
    status: StatusNotAuthorized,
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
  if (status === StatusInternalError) {
    // eslint-disable-next-line
    console.log('CRITICAL', err);
  }

  res.status(status).send(errors);
  next();
};

module.exports = {
  errorHandler,
  InternalError,
  NotFoundError,
  NotAuthorizedError,
};
