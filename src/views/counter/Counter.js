import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count.count}</p>
      <button onClick={() => dispatch({ type: 'increase' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrease' })}>-</button>
      <a href='#/login'>login</a>
    </div>
  );
}
