import React, { useState, useEffect } from 'react';

export const useFns = (initialValue, fns) => {
  const [value, setValue] = useState(initialValue);
  const fnsMap = Object.keys(fns).reduce((obj, fnName) => {
    const fn = (...args) => {
      setValue((value) => fns[fnName](value, ...args));
    };
    obj[fnName] = fn;
    return obj;
  }, {});
  return [value, fnsMap];
};
