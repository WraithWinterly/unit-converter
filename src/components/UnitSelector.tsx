import React, { useId } from 'react';

import { UnitGroups } from '../Types';

import { capitalize } from '../Utils';

interface UnitSelectorArgs {
  unitGroups: UnitGroups;
  currentUnit: string;
  currUnitGroup: string;
}

function UnitSelector({ currentUnit, unitGroups, currUnitGroup }: UnitSelectorArgs) {
  const id = useId();

  return (
    <div className='dropdown dropdown-hover'>
      <label tabIndex={0} className='btn btn-primary m-1'>
        {currentUnit}
      </label>
      <ul tabIndex={0} className='dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52'>
        {unitGroups[currUnitGroup as keyof typeof unitGroups].map((unit, i) => (
          <li key={id + i}>
            <a>{capitalize(unit)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnitSelector;
