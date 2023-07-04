import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipButton = () => {
  const [toggle, setToggle] = useState('on');

  useEffect(() => {
    if (localStorage.tooltips === 'off') {
      setToggle('off');
    } else {
      setToggle('on');
    }
  }, []);

  useEffect(() => {
    // yeah i know this is backwards from everything else but it's easier to style everything if it's negative
    if (toggle === 'off') {
      document.documentElement.classList.add('noTooltips');
    } else {
      document.documentElement.classList.remove('noTooltips');
    }
  }, [toggle]);

  const handleToggle = () => {
    if (toggle === 'on') {
      setToggle('off');
      localStorage.setItem('tooltips', 'off');
    } else {
      setToggle('on');
      localStorage.setItem('tooltips', 'on');
    }
  };

  const bulb = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class='h-6 w-6 stroke-textWhite dark:stroke-textBlack'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
      />
    </svg>
  );

  const bulbCross = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class='h-6 w-6 stroke-textWhite dark:stroke-textBlack'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18 M0 24L24 0M0 0l24 24'
      />
    </svg>
  );

  return (
    <Tooltip.Provider delayDuration={100} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <button
            onClick={handleToggle}
            className='m-4 rounded-full bg-bg2Dark p-2 opacity-50 transition duration-100 ease-out hover:scale-110 hover:opacity-100 hover:shadow-md dark:bg-bg2'>
            {toggle === 'on' ? bulb : bulbCross}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side='bottom'
          className='z-50 -translate-y-3 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
          <Tooltip.Arrow height={8} className='fill-yellow-100' />
          Toggle tooltips
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipButton;
