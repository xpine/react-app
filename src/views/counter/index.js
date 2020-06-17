import React from 'react';
import { useGlobalState } from '../../store';
import Test from './Text';

export default function Counter() {
  const [state, dispatch] = useGlobalState();
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increase' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrease' })}>-</button>
      <Test />
    </div>
  );
}
