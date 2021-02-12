# use-derived-state - Handy react hook for useState with deps

Sometimes you need to derive your state from props and if you are using function components you can't use `getDerivedStateFromProps`. [React documentation](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html) suggest to either move the state from the component completely or use `key` prop to reset inner component state, but that may cause unnecessary re-renders inside because you basicaly re-mount the whole component.

## Should I use this hook?

Before you install and use this hook, please read this [article](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html) from React documentation and consired the "official" solutions for the problem.

## Installation

```bash
npm install use-derived-state
# or
yarn add use-derived-state
```

## Usage

**Typescript**
```tsx
import { FC } from "react";
import useDerivedState from "use-derived-state";

interface Props {
  value: string;
  submit: (v: string) => unknown;
}

const SearchField: FC<Props> = ({ value }) => {
  const [state, setState] = useDerivedState(
    value, // Value or function which returns a value (same as useState)
    [value] // List of dependencies the value depends on (same as e.g. useMemo)
  );

  return (
    <div>
      <input 
        value={state} 
        onChange={e => setState(e.target.value)} 
      />
      <button onClick={() => submit(state)}>Submit</button>
    </div>
  )
}
```