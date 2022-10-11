import React, { useEffect } from 'react';

import { useState, createRef } from 'react';

import Header from './Header';
import UnitGroup from './UnitGroup';
import UnitSelector from './UnitSelector';

import { UnitGroups } from './Types';

import { evaluate, format } from 'mathjs';

function UnitConverter() {
  const [currFormula, setCurrFormula] = useState(['foot', 'mile']);
  const [currUnitGroup, setCurrUnitGroup] = useState('length');
  const [useScientificNotation, setUseScientificNotation] = useState(true);

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
    ],
  };

  function updateConverter(useForward: boolean) {
    console.log(useScientificNotation);
    if (useForward) {
      let input = inputLeft.current!.value;
      input = input === '' ? '0' : input;
      if (input != null) {
        inputRight.current!.value = formulate(true, input);
      }
    } else {
      let input = inputLeft.current!.value;
      input = input === '' ? '0' : input;
      if (input != null) {
        inputLeft.current!.value = formulate(false, input);
      }
    }
  }

  function formulate(forward: boolean, number: string): string {
    const formula: string = forward
      ? `${currFormula[0]} to ${currFormula[1]}`
      : `${currFormula[1]} to ${currFormula[0]}`;

    try {
      const evalutation: number = evaluate(`${number} ${formula}`);
      let formation: string;
      if (useScientificNotation) {
        formation = format(evalutation, { precision: 14 });
      } else {
        formation = format(evalutation, { precision: 14, notation: 'fixed' });
      }

      // replace all units with a string
      // regex allow only numbers and e and + and - and .
      formation = formation.replace(/[^0-9eE\+\-\.]/g, '');
      // cut off trailing e's
      while (formation.charAt(formation.length - 1) === 'e') {
        console.log(formation);
        formation = formation.slice(0, -1);
      }
      //Remove trailing zeros after point (0.00000000)
      formation = formation.replace(/\.?0+$/, '');

      return formation;
    } catch (e) {
      console.log('Evaluate error', e);
      return 'NaN';
    }
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
  }

  useEffect(() => {
    updateConverter(true);
  }, [useScientificNotation, currFormula]);

  return (
    <div className='flex flex-col items-center bg-base-200 w-[34rem] rounded-2xl py-4'>
      <h1 className='text-2xl w-full px-10'>Unit Converter</h1>

      <UnitGroup unitGroups={unitGroups} currUnitGroup={currUnitGroup} />

      {/* Check Box */}
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <input
            type='checkbox'
            defaultChecked={useScientificNotation}
            onChange={() => {
              setUseScientificNotation((use) => !use);
            }}
            className='checkbox checkbox-primary'
          />
          <span className='label-text'>Allow Scientific Notation</span>
        </label>
      </div>

      <div className='flex'>
        <div className='flex flex-col'>
          <input
            className='input input-primary'
            ref={inputLeft}
            onKeyUp={() => updateConverter(true)}></input>
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
            onKeyUp={() => updateConverter(false)}></input>
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
