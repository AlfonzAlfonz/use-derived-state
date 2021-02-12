import { useState, useEffect, DependencyList, Dispatch, SetStateAction, useRef } from "react";

const useDerivedState = <S extends unknown>(
  initialState: S | (() => S), 
  deps: DependencyList
): [S, Dispatch<SetStateAction<S>>] => {
  const ref = useRef<DependencyList>();

  const [state, set] = useState(initialState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => set(initialState), deps);

  const returnValue = ref.current === undefined || state === initialState || areHookInputsEqual(deps, ref.current)
    ? state
    : evaluateState(initialState);
  ref.current = deps;

  return [returnValue, set];
};

export default useDerivedState;

const areHookInputsEqual = (nextDeps: readonly any[], prevDeps: readonly any[]) => {
  if (nextDeps.length !== prevDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
};

const evaluateState = <T>(s: T | (() => T)): T => typeof s === "function" ? (s as any)() : s;
