import React from 'react';

import { useState, createRef } from 'react';

import Header from './Header';
import UnitGroup from './UnitGroup';
import UnitSelector from './UnitSelector';

import { UnitGroups } from './Types';

import { formulateLength } from './formulate/FormulateLength';

function UnitConverter() {
  const [currFormula, setCurrFormula] = useState(['foot', 'mile']);
  const [currUnitGroup, setCurrUnitGroup] = useState('length');

  const inputLeft = createRef<HTMLInputElement>();
  const inputRight = createRef<HTMLInputElement>();

  const unitGroups: UnitGroups = {
    temperature: ['fahrenheit', 'celsius'],
    length: [
      'kilometer',
      'meter',
      'centimeter',
      'millimeter',
      'micrometer',
      'nanometer',
      'mile',
      'yard',
      'foot',
      'inch',
      'nauticalmile',
    ],
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

    switch (currUnitGroup) {
      case 'length':
        return formulateLength(number, formula);
    }

    switch (formula) {
      case 'c-f':
        return number * 1.8 + 32;
      case 'f-c':
        return (number - 32) / 1.8;
    }
    return NaN;
  }

  function updateCurrFormula(boxNumber: number, str: string) {
    str = str.toLocaleLowerCase();
    setCurrFormula((currFormula) => {
      //If same unit is selected, swap them
      if (str === currFormula[boxNumber === 0 ? 1 : 0]) {
        const temp = currFormula[0];
        currFormula[0] = currFormula[1];
        currFormula[1] = temp;
      } else {
        currFormula[boxNumber] = str;
      }

      return [...currFormula];
    });
    inputKeyed(Boolean(boxNumber));
  }
  return (
    <div className='flex flex-col items-center bg-base-200 w-[34rem] rounded-2xl py-4'>
      <h1 className='text-2xl w-full px-10'>Unit Converter</h1>

      <UnitGroup unitGroups={unitGroups} currUnitGroup={currUnitGroup} />

      <div className='flex'>
        <div className='flex flex-col'>
          <input
            className='input input-primary'
            ref={inputLeft}
            onKeyUp={() => inputKeyed(true)}></input>
          <UnitSelector
            boxNumber={0}
            updateCurrFormula={updateCurrFormula}
            currentUnit={currFormula[0]}
            unitGroups={unitGroups}
            currUnitGroup={currUnitGroup}
          />
        </div>
        <span className='text-lg py-2 px-2'>&nbsp;=&nbsp;</span>
        <div className='flex flex-col'>
          <input
            className='input input-primary'
            ref={inputRight}
            onKeyUp={() => inputKeyed(false)}></input>
          <UnitSelector
            boxNumber={1}
            updateCurrFormula={updateCurrFormula}
            currentUnit={currFormula[1]}
            unitGroups={unitGroups}
            currUnitGroup={currUnitGroup}
          />
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
