export const buttonStatus = {
  normal: 0,
  failed: 1,
  succeeded: 2,
};

const buttonTextValues = {
  default: 'default has no value',
  sendingRequest: 'sendingRequest has no value',
  requestSucceeded: 'requestSucceeded has no value',
  requestFailed: 'requestFailed has no value',
};

export const generateButtonTextValues = (
  normal,
  sendingRequest,
  requestSucceeded,
  requestFailed,
) => {
  const textValues = [normal, sendingRequest, requestSucceeded, requestFailed];
  const newButtonTextValues = { ...buttonTextValues };

  let index = 0;
  for (const key in newButtonTextValues) {
    newButtonTextValues[key] = textValues[index];
    index++;
  }

  return newButtonTextValues;
};
