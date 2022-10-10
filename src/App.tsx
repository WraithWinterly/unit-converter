import { useState, createRef } from 'react';
import reactLogo from './assets/react.svg';

import Header from './components/Header';

function App() {
  const [currFormula, setCurrFormula] = useState(['foot', 'mile']);

  const inputLeft = createRef<HTMLInputElement>();
  const inputRight = createRef<HTMLInputElement>();

  function inputKeyed(leftBox: boolean) {
    if (leftBox) {
      const number: number = Number(inputLeft.current!.value);
      if (number != null) {
        inputRight.current!.value = String(formulate(true, number));
      }
    } else {
      const number: number = Number(inputRight.current!.value);
      if (number != null) {
        inputLeft.current!.value = String(formulate(false, number));
      }
    }
  }

  function formulate(forward: boolean, number: number): number {
    const formula: string = forward
      ? `${currFormula[0]}-${currFormula[1]}`
      : `${currFormula[1]}-${currFormula[0]}`;

    switch (formula) {
      case 'foot-mile':
        if (number === 0) return 0;
        return number / 5280;
      case 'mile-foot':
        if (number === 0) return 0;
        return number * 5280;
      case 'c-f':
        return number * 1.8 + 32;
      case 'f-c':
        return (number - 32) / 1.8;
    }
    return NaN;
  }

  return (
    <div className='App'>
      <h1 className='text-2xl py-4'>Converter</h1>
      <input
        className='input input-primary'
        ref={inputLeft}
        onKeyUp={() => inputKeyed(true)}></input>
      <span className='text-lg'>&nbsp;=&nbsp;</span>
      <input
        className='input input-primary'
        ref={inputRight}
        onKeyUp={() => inputKeyed(false)}></input>
    </div>
  );
}

export default App;
