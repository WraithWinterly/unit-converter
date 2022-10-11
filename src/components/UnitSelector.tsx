import React, { useId } from 'react';

import { UnitGroups } from './Types';

import { capitalize } from '../Utils';

interface UnitSelectorArgs {
  boxNumber: number;
  updateCurrFormula: Function;
  unitGroups: UnitGroups;
  currentUnit: string;
  currUnitGroup: string;
}

function UnitSelector({
  boxNumber,
  updateCurrFormula,
  currentUnit,
  unitGroups,
  currUnitGroup,
}: UnitSelectorArgs) {
  const id = useId();

  return (
    <div className='dropdown dropdown-hover mx-auto'>
      <label tabIndex={0} className='btn btn-primary my-2 mr-2 w-32'>
        {currentUnit}
      </label>
      <ul tabIndex={0} className='dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52'>
        {unitGroups[currUnitGroup as keyof typeof unitGroups].map((unit, i) => {
          console.log('curr', currentUnit);
          console.log('unit', unit);
          return (
            <li
              key={id + i}
              className={currentUnit === unit ? 'bg bg-primary' : ''}
              onClick={(e) => updateCurrFormula(boxNumber, e.currentTarget.innerText)}>
              <a>{capitalize(unit)}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UnitSelector;
