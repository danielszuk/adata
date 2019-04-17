const nestedKeyIndicator = '.';

export const ObjectToFlat = (obj: object): object => {
  const flatObject: object = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.keys(ObjectToFlat(obj[key])).forEach(secondLvlKey => {
        const nestedKeys = secondLvlKey.split(nestedKeyIndicator);
        let value = obj[key];
        nestedKeys.forEach(nestedKey => {
          value = value[nestedKey];
        });
        flatObject[key + nestedKeyIndicator + secondLvlKey] = value;
      });
    } else {
      flatObject[key] = obj[key];
    }
  });
  return flatObject;
};
