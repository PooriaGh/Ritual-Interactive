import { generateButtonTextValues } from './button';

export const dataManipulationActions = {
  add: 'add',
  remove: 'remove',
  update: 'update',
};

export const saveChangeButtonTextValues = generateButtonTextValues(
  'save change',
  'saving',
  'saved',
  'not saved',
);

export const removeButtonTextValues = {
  active: 'do not remove',
  inactive: 'remove',
};

export const dataKeys = {
  title: 0,
  description: 1,
  trailer: 2,
  steam: 3,
};

const englishPlaceholders = [
  'title',
  'description',
  'trailer link',
  'steam link',
];

const polishPlaceholders = ['tytuł', 'opis', 'trailer link', 'steam link'];

export const getTextWithPlaceholder = (
  { index, english, englishValue, polishValue },
  multipleLang = false,
) => {
  if (multipleLang) {
    return english
      ? /\S/.test(englishValue)
        ? englishValue
        : englishPlaceholders[index]
      : /\S/.test(polishValue)
      ? polishValue
      : polishPlaceholders[index];
  } else {
    return /\S/.test(englishValue) ? englishValue : englishPlaceholders[index];
  }
};

const initializeMinAndMax = (data) => {
  data.forEach((element, index) => {
    data[index].orderIndex = index;
    if (index === 0) {
      data[index] = { ...data[index], min: true, max: true };
    } else {
      data[index] = { ...data[index], min: false, max: true };
      data[index - 1] = { ...data[index - 1], max: false };
    }
  });
};

const initializeValid = (data) => {
  data.forEach((element, index) => {
    data[index].valid = true;
    data[index].isValidUpdated = true;
    data[index].validations = [];
  });
};

const initializeIcons = (data) => {
  data.forEach((element, index) => {
    data[index].icons = [];
    for (const button of element.buttons) {
      data[index].icons.push(button.url);
    }
  });
};

const initializeEditing = (data, isGame = false) => {
  if (isGame) {
    data.forEach((element, index) => {
      data[index].editing = {
        title: false,
        genre: false,
        desc: false,
        trailer: false,
        steam: false,
      };
    });
  } else {
    data.forEach((element, index) => {
      data[index].editing = {
        title: false,
        desc: false,
        btns: [],
        icons: [],
      };
    });
  }
};

const initializeEnglish = (data) => {
  data.forEach((element, index) => {
    data[index].english = true;
  });
};

const initializeLoadLongDesc = (data) => {
  data.forEach((element, index) => {
    data[index].loadLongDesc = false;
  });
};

const initializePreAction = (data) => {
  data.forEach((element, index) => {
    data[index].pre_actions = data[index].actions;
  });
};

export const initializeNews = (data) => {
  initializeMinAndMax(data);
  initializeValid(data);
  initializeEnglish(data);
  initializeLoadLongDesc(data);
  initializePreAction(data);
  initializeIcons(data);
  initializeEditing(data);
};

export const initializeGames = (data) => {
  initializeMinAndMax(data);
  initializeValid(data);
  initializeEnglish(data);
  initializeLoadLongDesc(data);
  initializePreAction(data);
  initializeEditing(data, true);
};

export const increaseOrderItem = (items, orderIndex) => {
  let currentItem = items.find((item) => item.orderIndex === orderIndex);
  let nextItem = items.find((item) => item.orderIndex === orderIndex + 1);

  let currentItemIndex = items.indexOf(currentItem);
  let nextItemIndex = items.indexOf(nextItem);

  items[currentItemIndex] = { ...currentItem, orderIndex: orderIndex + 1 };
  items[nextItemIndex] = { ...nextItem, orderIndex: orderIndex };

  swapMinAndMax(items, currentItemIndex, nextItemIndex);
};

export const decreaseOrderItem = (items, orderIndex) => {
  let currentItem = items.find((item) => item.orderIndex === orderIndex);
  let prevItem = items.find((item) => item.orderIndex === orderIndex - 1);

  let currentItemIndex = items.indexOf(currentItem);
  let prevItemIndex = items.indexOf(prevItem);

  items[currentItemIndex] = { ...currentItem, orderIndex: orderIndex - 1 };
  items[prevItemIndex] = { ...prevItem, orderIndex: orderIndex };

  swapMinAndMax(items, currentItemIndex, prevItemIndex);
};

const swapMinAndMax = (items, firstItemIndex, secondItemIndex) => {
  let firstItem = items[firstItemIndex];
  let secondItem = items[secondItemIndex];

  if (firstItem.max) {
    items[firstItemIndex] = { ...items[firstItemIndex], max: false };
    items[secondItemIndex] = { ...items[secondItemIndex], max: true };
  }
  if (firstItem.min) {
    items[firstItemIndex] = { ...items[firstItemIndex], min: false };
    items[secondItemIndex] = { ...items[secondItemIndex], min: true };
  }
  if (secondItem.max) {
    items[firstItemIndex] = { ...items[firstItemIndex], max: true };
    items[secondItemIndex] = { ...items[secondItemIndex], max: false };
  }
  if (secondItem.min) {
    items[firstItemIndex] = { ...items[firstItemIndex], min: true };
    items[secondItemIndex] = { ...items[secondItemIndex], min: false };
  }
};

export const updateItems = (items, newItem) => {
  const foundNew = items.find((item) => item.orderIndex === newItem.orderIndex);
  const foundNewIndex = items.indexOf(foundNew);
  items[foundNewIndex] = { ...items[foundNewIndex], ...newItem };
};

export const addNewItem = (items, newItem) => {
  let maxOrderIndex = -1;
  items.forEach((item) => {
    if (item.orderIndex > maxOrderIndex) {
      maxOrderIndex = item.orderIndex;
    }
  });

  const maxItem = items.find((item) => item.orderIndex === maxOrderIndex);
  const maxItemIndex = items.indexOf(maxItem);

  newItem.orderIndex = maxOrderIndex + 1;
  if (maxItemIndex === -1) {
    newItem.min = true;
    newItem.max = true;
  } else {
    newItem.min = false;
    newItem.max = true;
    items[maxItemIndex] = { ...maxItem, max: false };
  }
};

export const initializeRemovedItems = (items) => {
  items.forEach((item) => {
    if (item.actions === dataManipulationActions.remove) {
      const keys = Object.keys(item);
      keys.forEach((key) => {
        if (typeof item[key] === 'string') {
          item[key] = dataManipulationActions.remove;
        }
      });
    }
  });
};

export const validateItems = (items) => {
  const invalidItemsIndex = [];
  for (const item of items) {
    item.valid = true;
    for (const validation of item.validations) {
      if (!validation) {
        item.valid = false;
        item.isValidUpdated++;
        break;
      }
    }
  }

  let allItemsValid = true;
  for (let index = 0; index < items.length; index++) {
    if (
      !items[index].valid &&
      items[index].actions !== dataManipulationActions.remove
    ) {
      allItemsValid = false;
      invalidItemsIndex.push(index);
    }
  }

  return { allItemsValid, invalidItemsIndex };
};

const convertToOrdinals = (numbers) => {
  const ordinalNumbers = [];
  for (const number of numbers) {
    let ordinalNumber = null;
    switch (number) {
      case 1:
        ordinalNumber = number + 'st';
        break;
      case 2:
        ordinalNumber = number + 'nd';
        break;
      case 3:
        ordinalNumber = number + 'rd';
        break;
      default:
        ordinalNumber = number + 'th';
        break;
    }
    ordinalNumbers.push(ordinalNumber);
  }

  return ordinalNumbers;
};

export const generateValidationMessage = (indexs, singular, plural) => {
  const items = [];
  for (const index of indexs) {
    items.push(index + 1);
  }

  const ordinalNumbers = convertToOrdinals(items);
  let message = null;
  if (ordinalNumbers.length === 1) {
    message = ordinalNumbers.join('') + ` ${singular} is not valid`;
  } else {
    const lastOrdinalNumber = ordinalNumbers.splice(
      ordinalNumbers.length - 1,
      1,
    );
    message =
      ordinalNumbers.join(', ') +
      ' and ' +
      lastOrdinalNumber +
      ` ${plural} are not valid`;
  }

  return message;
};
