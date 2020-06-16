import React, { useState, useEffect, useRef, useMemo } from 'react';

export const useInterval = (fn, time) =>
  useEffect(() => {
    const tick = setInterval(fn);
    return () => clearInterval(tick);
  }, [fn, time]);
