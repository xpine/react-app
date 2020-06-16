import React, { useState, useEffect } from 'react';

export default function usePending(initialState) {
  const [pending, setPending] = useState(initialState);
  return [pending, setPending];
}
