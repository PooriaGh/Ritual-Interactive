import { checkValidity } from './validation';
import { generateButtonTextValues } from './button';

export const elementTypes = {
  input: 'input',
  textArea: 'textarea',
};

export const submitButtonTextValues = generateButtonTextValues(
  'submit',
  'sending',
  'sent',
  'not sent',
);

export const submitButtonTextValuesPL = generateButtonTextValues(
  'wyślij',
  'wysyłanie',
  'wysłano',
  'nie wysłano',
);

export const forgotPassButtonTextValues = generateButtonTextValues(
  'forgot password',
  'requesting',
  'email has been sent',
  'email is failed to send',
);

export const sendButtonTextValues = generateButtonTextValues(
  'send',
  'sending',
  'email has been sent',
  'email is failed to send',
);

export const generateFormElements = (formElementsObject) => {
  const formElementsArray = [];
  for (let key in formElementsObject) {
    formElementsArray.push({
      id: key,
      ...formElementsObject[key],
    });
  }

  return formElementsArray;
};

export const submitForm = (formData, setFormData, setLoading, statements) => {
  const formDataArray = Object.entries(formData);
  let formValid = true;
  for (let item of formDataArray) {
    if (!item[1].valid) {
      formValid = false;
      break;
    }
  }

  if (formValid) {
    setLoading(true);
    statements();
  } else {
    for (let item of formDataArray) {
      if (!item[1].valid) {
        item[1].touched = true;
        let { message } = checkValidity(item[1].value, item[1].validation);
        item[1].message = message;
      }
    }

    setFormData({ ...Object.fromEntries(formDataArray) });
  }
};
