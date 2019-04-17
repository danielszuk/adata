export const Clone = (obj): any => {
  if (!obj) {
    return obj;
  }
  const cloneObj = new obj.constructor();
  for (const attribut in obj) {
    if (typeof obj[attribut] === 'object') {
      cloneObj[attribut] = Clone(obj[attribut]);
    } else {
      cloneObj[attribut] = obj[attribut];
    }
  }
  return cloneObj;
};
