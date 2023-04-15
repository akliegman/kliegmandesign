// @ts-nocheck
export const replaceSpecialCharacters = (str) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return str;
};
