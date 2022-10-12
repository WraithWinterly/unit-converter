import React, { useEffect } from 'react';

import { useState, createRef } from 'react';

import Header from './Header';
import UnitGroupSelector from './UnitGroupSelector';
import UnitSelector from './UnitSelector';

import Checkbox from './daisy/Checkbox';

import { UnitGroups } from '../Types';

import { regexInputNotAllowed } from '../Utils';

import { evaluate, format } from 'mathjs';
import UnitInputField from './UnitInputField';

function UnitConverter() {
  const [currFormula, setCurrFormula] = useState(['foot', 'mile']);
  const [currUnitGroup, setCurrUnitGroup] = useState('length');
  const [useScientificNotation, setUseScientificNotation] = useState(true);
  const [useRoundNumber, setRoundNumber] = useState(true);
  const [lastBoxChanged, setLastBoxChanged] = useState(0);
  const inputLeft = createRef<HTMLInputElement>();
  const inputRight = createRef<HTMLInputElement>();

  const unitGroups: UnitGroups = {
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    digitalData: [
      'kilobit',
      'kilobyte',
      'megabit',
      'megabyte',
      'gigabit',
      'gigabyte',
      'terabit',
      'terabyte',
      'petabit',
      'petabyte',
      'exabit',
      'exabyte',
      'zettabit',
      'zettabyte',
      'yottabit',
      'yottabyte',
    ],
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
    mass: [
      'kilogram',
      'gram',
      'milligram',
      'microgram',
      'stone',
      'ton',
      'lb',
      'ounce',
    ],
    time: [
      'nanosecond',
      'microsecond',
      'millisecond',
      'seconds',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'year',
      'decade',
      'century',
      'millennium',
    ],
    frequency: [
      'hertz',
      'kilohertz',
      'megahertz',
      'gigahertz',
      'terahertz',
      'petahertz',
      'exahertz',
      'yottahertz',
    ],
    angle: [
      'radian',
      'degree',
      'gradian',
      'milliradian',
      'arcminute',
      'arcsecond',
    ],
    pressure: ['atm', 'psi', 'torr', 'bar'],
  };

  function updateConverter(useForward: boolean) {
    if (useForward) {
      let input = inputLeft.current!.value;
      input = input === '' ? '0' : input;
      if (input != null) {
        inputRight.current!.value = formulate(true, input);
      }
    } else {
      let input = inputRight.current!.value;
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

      formation = format(evalutation, {
        notation: useScientificNotation ? 'auto' : 'fixed',
        precision: useRoundNumber ? 4 : 12,
      });

      formation = formation.replace(regexInputNotAllowed, '');
      // cut off trailing e's
      while (formation.charAt(formation.length - 1) === 'e') {
        formation = formation.slice(0, -1);
      }
      //Remove trailing zeros after point (0.00000000)
      formation = formation.replace(/(\.0*|(?<=(\..*))0*)$/, '');

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

  function updateCurrUnitGroup(newGroup: string) {
    setCurrUnitGroup(newGroup);
    inputLeft.current!.value = String(0);
    inputRight.current!.value = String(0);
    updateCurrFormula(0, unitGroups[newGroup as keyof typeof unitGroups][0]);
    updateCurrFormula(1, unitGroups[newGroup as keyof typeof unitGroups][1]);
  }

  useEffect(() => {
    updateConverter(lastBoxChanged === 0 ? true : false);
  }, [useScientificNotation, useRoundNumber]);

  useEffect(() => {
    updateConverter(true);
  }, [currFormula]);

  return (
    <div className='flex flex-col bg-base-200 rounded-2xl py-4 sm:px-12 px-4 relative'>
      <h1 className='text-2xl w-full justify-self-start'>Unit Converter</h1>

      {/* CheckBoxes */}
      <div className='form-control mt-2 sm:absolute sm:right-1 order-3'>
        <Checkbox
          text={'Round Number'}
          defaultChecked={useRoundNumber}
          clickAction={(checked: boolean) => setRoundNumber(checked)}
        />
        <Checkbox
          text={'Use Scientific Notation'}
          defaultChecked={useScientificNotation}
          clickAction={(checked: boolean) => setUseScientificNotation(checked)}
        />
      </div>

      {/* Select Unit Group */}
      <UnitGroupSelector
        unitGroups={unitGroups}
        currUnitGroup={currUnitGroup}
        updateCurrUnitGroup={updateCurrUnitGroup}
      />

      {/* Input Boxes and Buttons */}
      <div className='flex w-full justify-between'>
        <UnitInputField
          boxNumber={0}
          refElm={inputLeft}
          setLastBoxChanged={setLastBoxChanged}
          updateConverter={updateConverter}
          updateCurrFormula={updateCurrFormula}
          currentUnit={currFormula[0]}
          unitGroups={unitGroups}
          currUnitGroup={currUnitGroup}
        />
        <span className='text-lg py-2 px-2'>&nbsp;=&nbsp;</span>
        <UnitInputField
          boxNumber={1}
          refElm={inputRight}
          setLastBoxChanged={setLastBoxChanged}
          updateConverter={updateConverter}
          updateCurrFormula={updateCurrFormula}
          currentUnit={currFormula[1]}
          unitGroups={unitGroups}
          currUnitGroup={currUnitGroup}
        />
      </div>
    </div>
  );
}

export default UnitConverter;
