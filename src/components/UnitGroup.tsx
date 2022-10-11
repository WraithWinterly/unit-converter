import React, { useId } from 'react';

import { UnitGroups } from './Types';

import { capitalize } from '../Utils';

interface UnitGroupProps {
  unitGroups: UnitGroups;
  currUnitGroup: string;
}
function UnitGroup({ unitGroups, currUnitGroup }: UnitGroupProps) {
  const id = useId();

  return (
    <div className='dropdown dropdown-hover my-4 w-52'>
      <label tabIndex={0} className='btn btn-primary w-full'>
        {currUnitGroup}
      </label>
      <ul tabIndex={0} className='dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52'>
        {Object.keys(unitGroups).map((unitGroup, i) => (
          <li key={id + i}>
            <a>{capitalize(unitGroup)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnitGroup;
