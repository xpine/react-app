import React, { useMemo } from 'react';
import { useGlobalState } from '../../store';

export default function Test() {
  const [state, dispatch] = useGlobalState();

  return useMemo(() => {
    return <div>test</div>;
  }, [state.token]);
}
