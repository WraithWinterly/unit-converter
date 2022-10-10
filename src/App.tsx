import { useState, createRef } from 'react';
import reactLogo from './assets/react.svg';

import Header from './components/Header';
import UnitGroup from './components/UnitGroup';
import UnitSelector from './components/UnitSelector';

import { UnitGroups } from './Types';

function App() {
  const [currFormula, setCurrFormula] = useState(['foot', 'mile']);
  const [currUnitGroup, setCurrUnitGroup] = useState('length');

  const inputLeft = createRef<HTMLInputElement>();
  const inputRight = createRef<HTMLInputElement>();

  const unitGroups: UnitGroups = {
    temperature: ['fahrenheit', 'celsius'],
    length: ['foot', 'mile'],
  };

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
      <h1 className='text-2xl py-4'>Unit Converter</h1>

      <UnitGroup unitGroups={unitGroups} currUnitGroup={currUnitGroup} />

      <div className='flex'>
        <div className='flex flex-col'>
          <input
            className='input input-primary'
            ref={inputLeft}
            onKeyUp={() => inputKeyed(true)}></input>
          <UnitSelector
            currentUnit={currFormula[0]}
            unitGroups={unitGroups}
            currUnitGroup={currUnitGroup}
          />
        </div>
        <span className='text-lg'>&nbsp;=&nbsp;</span>
        <div className='flex flex-col'>
          <input
            className='input input-primary'
            ref={inputRight}
            onKeyUp={() => inputKeyed(false)}></input>
          <UnitSelector
            currentUnit={currFormula[1]}
            unitGroups={unitGroups}
            currUnitGroup={currUnitGroup}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
