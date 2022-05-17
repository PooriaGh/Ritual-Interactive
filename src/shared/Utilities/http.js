export const httpErrorTypes = {
  FETCHING_DATA: 0,
  VALIDATION: 1,
  OTHER: 2,
};

export const httpStatusCodes = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  InternalServerError: 500,
};

export const httpErrorMessages = {
  NoResponse: {
    statusCode: httpStatusCodes.InternalServerError,
    title: 'loading data failed',
    text: 'No response from the server, make sure you have a valid connection and try again',
  },
  BadResponse: {
    statusCode: httpStatusCodes.BadRequest,
    title: 'loading data failed',
    text: 'Our server is having problems, please try again later',
  },
};

const combineErrors = (firstError, secondError) => {
  switch (true) {
    case firstError !== null && secondError === null:
      return firstError;
    case firstError === null && secondError !== null:
      return secondError;
    case firstError !== null && secondError !== null:
      const result =
        firstError === httpErrorMessages.BadResponse.statusCode &&
        secondError === httpErrorMessages.BadResponse.statusCode
          ? httpErrorMessages.BadResponse.statusCode
          : httpErrorMessages.NoResponse.statusCode;
      return result;
    default:
      return null;
  }
};

const generateErrorMessage = (statusCode) => {
  switch (true) {
    case statusCode === httpErrorMessages.BadResponse.statusCode:
      return { ...httpErrorMessages.BadResponse };
    case statusCode >= httpErrorMessages.NoResponse.statusCode:
      return { ...httpErrorMessages.NoResponse };
    default:
      return null;
  }
};

export const generateHttpErrorMessage = (firstError, secondError) => {
  const statusCode = combineErrors(firstError, secondError);
  return generateErrorMessage(statusCode);
};

export const generateOtherHttpErrorMessage = (response) => {
  if (!response || response?.status >= httpStatusCodes.InternalServerError) {
    return 'server is not responding';
  } else {
    return response?.data?.message ?? response?.data;
  }
};
