import React from 'react';
import { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

const InitializationPatterns = ({ callback, setInitControlsSetter }) => {
  const [init, setInit] = useState('mini');
  setInitControlsSetter(setInit);

  return (
    <form>
      <RadioGroup.Root
        value={init}
        onValueChange={(value) => {
          callback(value);
          setInit(value);
        }}>
        <div className='mt-2 flex justify-center'>
          <RadioGroup.Item
            value='full'
            onClick={() => {
              if (init == 'full') {
                callback(init);
              }
            }}
            className='mx-1 grow whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            Full Noise
          </RadioGroup.Item>
          <RadioGroup.Item
            value='mini'
            onClick={() => {
              if (init == 'mini') {
                callback(init);
              }
            }}
            className='mx-1 grow whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            Mini Noise
          </RadioGroup.Item>
        </div>

        <div className='mt-2 flex'>
          <RadioGroup.Item
            value='man1'
            onClick={() => {
              if (init == 'man1') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            A
          </RadioGroup.Item>
          <RadioGroup.Item
            value='man2'
            onClick={() => {
              if (init == 'man2') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            B
          </RadioGroup.Item>
          <RadioGroup.Item
            value='man3'
            onClick={() => {
              if (init == 'man3') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            C
          </RadioGroup.Item>
        </div>

        <div className='mt-2 flex'>
          <RadioGroup.Item
            value='man4'
            onClick={() => {
              if (init == 'man4') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            D
          </RadioGroup.Item>
          <RadioGroup.Item
            value='man5'
            onClick={() => {
              if (init == 'man5') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            E
          </RadioGroup.Item>
          <RadioGroup.Item
            value='man6'
            onClick={() => {
              if (init == 'man6') {
                callback(init);
              }
            }}
            className='mx-1 w-16 grow-0 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 py-1.5 px-1 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md data-[state=checked]:bg-button3 dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark data-[state=checked]:dark:bg-button3Dark data-[state=checked]:dark:text-textBlack'>
            F
          </RadioGroup.Item>
        </div>
      </RadioGroup.Root>
    </form>
  );
};

export default InitializationPatterns;
