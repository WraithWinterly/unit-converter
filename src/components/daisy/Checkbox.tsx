import React from 'react';

interface CheckboxProps {
  text: string;
  defaultChecked: boolean;
  clickAction: Function;
}

function Checkbox({ text, defaultChecked, clickAction }: CheckboxProps) {
  return (
    <label className='label cursor-pointer gap-4 justify-start'>
      <input
        type='checkbox'
        defaultChecked={defaultChecked}
        onChange={(e) => {
          clickAction(e.currentTarget.checked);
        }}
        className='checkbox checkbox-primary'
      />
      <span className='label-text'>{text}</span>
    </label>
  );
}

export default Checkbox;
