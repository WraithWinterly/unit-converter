import React, { useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';

function Header() {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [generatedCat, setGeneratedCat] = useState({});

  async function genCat() {
    try {
      console.log('try');
      const data = await fetch('https://cataas.com/cat?json=true', { method: 'GET' });
      console.log('data', data);
      const jsonData = await data.json();
      setGeneratedCat(jsonData.results);
      console.log(jsonData.results);
    } catch (e) {
      setGeneratedCat({ failed: true });
      console.log(generatedCat);
    }
  }

  return (
    <div>
      {/* <!-- The button to open modal --> */}
      <label htmlFor='my-modal-3' className='btn modal-button'>
        open modal
      </label>
      {/* <!-- Put this part before </body> tag --> */}
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />

      <div className='modal'>
        <div className='modal-box relative' ref={parent}>
          <h3 className='text-lg font-bold'>Create a new cat</h3>
          <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <div className='mt-2 py-2'>
            <button className='btn btn-primary' onClick={genCat}>
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
