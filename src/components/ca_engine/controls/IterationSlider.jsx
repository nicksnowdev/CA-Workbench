import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';

const IterationSlider = ({ callback, setIterationsControlsSetter }) => {
  const [iterations, setIterations] = useState(2);
  setIterationsControlsSetter(setIterations);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <label className='text-textBlack transition-colors duration-200 dark:text-textWhite'>
        Iterations/frame
      </label>
      <div className='flex items-center'>
        <Slider.Root
          min={0}
          max={10}
          value={[iterations]}
          step={1}
          type='number'
          onValueChange={(value) => {
            setIterations(value[0]);
            callback(value[0]);
          }}
          className='relative flex h-4 w-48 items-center justify-center px-2 py-2.5'>
          <Slider.Track className='relative flex h-2 grow items-center rounded-sm bg-slider1 shadow-md transition-colors duration-200 dark:bg-bg1Dark' />
          <Slider.Thumb className='block h-4 w-4 cursor-pointer rounded-sm bg-button1 transition-colors duration-200 ease-in-out hover:bg-button2 dark:bg-button2Dark hover:dark:bg-button3Dark' />
        </Slider.Root>
        <input
          type='number'
          name='iterations'
          value={iterations}
          step={1}
          min={0}
          max={10}
          onChange={(e) => {
            setIterations(e.target.value);
            callback(e.target.value);
          }}
          className='mx-1 w-10 rounded-sm bg-bgCanvas px-0.5 text-textBlack shadow-md transition-colors duration-200 dark:bg-bg1Dark dark:text-textWhite'
        />
      </div>
    </div>
  );
};

export default IterationSlider;
