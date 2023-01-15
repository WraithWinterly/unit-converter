import React from 'react';

import UnitSelector from './UnitSelector';

import { UnitGroups } from '../Types';

import { regexInputNotAllowed } from '../Utils';

interface UnitInputFieldProps {
  boxNumber: number;
  refElm: React.RefObject<HTMLInputElement>;
  setLastBoxChanged: Function;
  updateConverter: Function;
  updateCurrFormula: Function;
  currentUnit: string;
  unitGroups: UnitGroups;
  currUnitGroup: string;
}

function UnitInputField({
  boxNumber,
  refElm,
  setLastBoxChanged,
  updateConverter,
  updateCurrFormula,
  currentUnit,
  unitGroups,
  currUnitGroup,
}: UnitInputFieldProps) {
  return (
    <div className='flex flex-col sm:w-48 w-36'>
      <input
        className='input input-primary'
        ref={refElm}
        defaultValue={0}
        onChange={(e) => {
          const str = e.currentTarget.value;
          if (str.match(regexInputNotAllowed)) e.preventDefault();
          setLastBoxChanged(boxNumber);
          e.currentTarget.value = e.currentTarget.value.replace(
            regexInputNotAllowed,
            ''
          );
          updateConverter(boxNumber === 0 ? true : false);
        }}></input>
      <UnitSelector
        boxNumber={boxNumber}
        updateCurrFormula={updateCurrFormula}
        currentUnit={currentUnit}
        unitGroups={unitGroups}
        currUnitGroup={currUnitGroup}
      />
    </div>
  );
}

export default UnitInputField;
