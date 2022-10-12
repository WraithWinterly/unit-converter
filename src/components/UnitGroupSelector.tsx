import React, { useId } from 'react';

import { UnitGroups } from '../Types';

import { capitalize } from '../Utils';

interface UnitGroupProps {
  unitGroups: UnitGroups;
  currUnitGroup: string;
  updateCurrUnitGroup: Function;
}
function UnitGroupSelector({
  unitGroups,
  currUnitGroup,
  updateCurrUnitGroup,
}: UnitGroupProps) {
  const id = useId();

  return (
    <div className='dropdown dropdown-hover my-4 sm:w-64 w-full'>
      <label tabIndex={0} className='btn btn-primary w-full'>
        {capitalize(currUnitGroup)}
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-300 p-2 shadow rounded-box w-52'>
        {Object.keys(unitGroups).map((unitGroup, i) => (
          <li key={id + i}>
            <a onClick={() => updateCurrUnitGroup(unitGroup)}>
              {capitalize(unitGroup, false)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnitGroupSelector;
