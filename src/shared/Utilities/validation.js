const messages = {
  required: 'Is required',
  minLength: 'Must be more than [x] characters',
  maxLength: 'Cannot be more than [x] characters',
  isEmail: 'Must have a valid email format',
  isNumeric: 'Must be a valid number',
  isYotubeLink: 'Must be a valid youtube link',
  isSteamLink: 'Must be a valid steam link',
  withoutComma: "Can not contain comma ','",
  isConfirmed: 'Does not match the password',
};

export const checkValidity = (value, rules, config = {}) => {
  let isValid = true;
  let message = null;

  if (!rules) {
    return { isValid: true, message };
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    message = !message && !isValid ? messages.required : message;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    message = !message && !isValid ? messages.minLength : message;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    message = !message && !isValid ? messages.maxLength : message;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    message = !message && !isValid ? messages.isEmail : message;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
    message = !message && !isValid ? messages.isNumeric : message;
  }

  if (rules.isYotubeLink) {
    const pattern = /^https:\/\/www.youtube.com\/watch\?v=?(\S+)?$/;

    isValid = pattern.test(value) && !/&/.test(value) && isValid;
    message = !message && !isValid ? messages.isYotubeLink : message;
  }

  if (rules.isSteamLink) {
    const pattern = /^https:\/\/store.steampowered.com\/app\/?(\S+)?$/;
    isValid = pattern.test(value) && isValid;
    message = !message && !isValid ? messages.isSteamLink : message;
  }

  if (rules.withoutComma) {
    const pattern = /,/;
    isValid = !pattern.test(value) && isValid;
    message = !message && !isValid ? messages.withoutComma : message;
  }

  if (rules.isConfirmed) {
    isValid = config.confirmedValue ? value === config.confirmedValue : false;
    message = !message && !isValid ? messages.isConfirmed : message;
  }

  return { isValid, message };
};
