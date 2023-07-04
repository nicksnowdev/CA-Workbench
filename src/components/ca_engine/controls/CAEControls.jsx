import React from 'react';
import CAETables from './CAETables';
import IterationSlider from './IterationSlider';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';
import * as Toggle from '@radix-ui/react-toggle';
import * as Tooltip from '@radix-ui/react-tooltip';
import InitializationPatterns from './InitializationPatterns';
import { useRef, useEffect } from 'react';

const toggleTips = () => {
  const lmnts = document.getElementsByClassName('tip');
  if (document.documentElement.classList.contains('noTooltips')) {
    for (let i = 0; i < lmnts.length; i++) {
      lmnts[i].classList.add('hide');
    }
  } else {
    for (let i = 0; i < lmnts.length; i++) {
      lmnts[i].classList.remove('hide');
    }
  }
};

const CAEControls = ({ p }) => {
  const backRef = useRef(null);
  const fwdRef = useRef(null);

  useEffect(() => {
    p.setBackRef(backRef);
    p.setFwdRef(fwdRef);
  });

  return (
    <Tooltip.Provider delayDuration={100} skipDelayDuration={0}>
      <div className='flex w-[532px] flex-col items-center justify-between rounded-sm bg-bg2 shadow-md dark:bg-bg2Dark dark:shadow-slate-900'>
        <section className='flex h-full w-full'>
          <section className='flex w-1/2 flex-col border-r border-bg1 transition-colors duration-200 dark:border-bg1Dark'>
            <section className='flex w-full items-center justify-evenly border-b-2 border-bg1 p-2 transition-colors duration-200 dark:border-bg1Dark'>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <button
                    onClick={() => p.historyBack()}
                    ref={backRef}
                    className='grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 py-2 text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md disabled:border-bg1 disabled:text-textBlack2 disabled:hover:bg-bg2 disabled:hover:shadow-none dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark disabled:dark:border-bg1Dark disabled:dark:text-textWhite2 disabled:hover:dark:bg-bg2Dark'>
                    Back
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 -translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Load previous patch
                </Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <button
                    onClick={() => p.historyForward()}
                    ref={fwdRef}
                    className='mx-2 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 py-2 text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md disabled:border-bg1 disabled:text-textBlack2 disabled:hover:bg-bg2 disabled:hover:shadow-none dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark disabled:dark:border-bg1Dark disabled:dark:text-textWhite2 disabled:hover:dark:bg-bg2Dark'>
                    Fwd
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 -translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Load next patch
                </Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <button
                    onClick={() => p.generateRule()}
                    className='grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 py-2 text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                    Generate Rule
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 -translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Randomize the rule tables with
                  <br />
                  density and bias
                </Tooltip.Content>
              </Tooltip.Root>
            </section>
            <div className='flex w-full flex-col items-center justify-center border-b-2 border-bg1 pb-1 transition-colors duration-200 dark:border-bg1Dark'>
              <label className='mt-1 text-textBlack transition-colors duration-200 dark:text-textWhite'>
                Rule Density
              </label>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <Slider.Root
                    min={-0.5}
                    max={0.5}
                    defaultValue={[0.3]}
                    step={0.1}
                    onValueChange={(value) => p.setDensity(value)}
                    className='relative flex h-4 w-60 items-center justify-center px-2 py-2.5'>
                    <Slider.Track className='relative flex h-2 grow items-center rounded-sm bg-slider1 shadow-md transition-colors duration-200 dark:bg-slider1Dark' />
                    <Slider.Thumb className='block h-4 w-4 cursor-pointer rounded-sm bg-slider2 transition-colors duration-200 ease-in-out hover:bg-slider3 dark:bg-slider2Dark hover:dark:bg-slider3Dark' />
                  </Slider.Root>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Set the total ratio of ON:OFF while randomizing
                </Tooltip.Content>
              </Tooltip.Root>
              <div className='flex w-full justify-between'>
                <label className='mx-4 -mt-0.5 text-xs italic text-textBlack2 transition-colors duration-200 dark:text-textWhite2'>
                  Low
                </label>
                <label className='mx-4 -mt-0.5 text-xs italic text-textBlack2 transition-colors duration-200 dark:text-textWhite2'>
                  High
                </label>
              </div>
            </div>
            <div className='flex w-full flex-col items-center justify-center border-b-2 border-bg1 pb-1 transition-colors duration-200 dark:border-bg1Dark'>
              <label className='mt-1 text-textBlack transition-colors duration-200 dark:text-textWhite'>
                Rule Bias
              </label>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <Slider.Root
                    min={-1}
                    max={1}
                    defaultValue={[-0.6]}
                    step={0.2}
                    onValueChange={(value) => p.setBias(value)}
                    className='relative flex h-4 w-60 items-center justify-center px-2 py-2.5'>
                    <Slider.Track className='relative flex h-2 grow items-center rounded-sm bg-slider1 shadow-md transition-colors duration-200 dark:bg-slider1Dark' />
                    <Slider.Thumb className='block h-4 w-4 cursor-pointer rounded-sm bg-slider2 transition-colors duration-200 ease-in-out hover:bg-slider3 dark:bg-slider2Dark hover:dark:bg-slider3Dark' />
                  </Slider.Root>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Distribution of ON/OFF between the
                  <br />
                  left and right tables
                </Tooltip.Content>
              </Tooltip.Root>
              <div className='flex w-full justify-between'>
                <label className='mx-4 -mt-0.5 text-xs italic text-textBlack2 transition-colors duration-200 dark:text-textWhite2'>
                  Static
                </label>
                <label className='mx-4 -mt-0.5 text-xs italic text-textBlack2 transition-colors duration-200 dark:text-textWhite2'>
                  Dynamic
                </label>
              </div>
            </div>
            <div className='flex w-full grow items-center justify-center border-b-2 border-bg1 transition-colors duration-200 dark:border-bg1Dark'>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <Switch.Root
                    onCheckedChange={(checked) => p.setSymmetry(checked)}
                    defaultChecked={true}
                    className='h-5 w-9 rounded-full border-2 border-slider3 bg-bg1 transition-colors duration-100 data-[state=checked]:bg-ruleButton2 dark:border-slider2Dark dark:bg-slider1Dark data-[state=checked]:dark:bg-ruleButton2'>
                    <Switch.Thumb className='block h-4 w-4 rounded-full bg-back transition duration-100 data-[state=checked]:translate-x-4 dark:bg-ruleButton3Dark' />
                  </Switch.Root>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Only generate rotationally symmetrical CAs
                </Tooltip.Content>
              </Tooltip.Root>
              <label className='my-0.5 h-full border-r-2 border-bg1 px-2 pt-0.5 leading-tight text-textBlack transition-colors duration-200 dark:border-bg1Dark dark:text-textWhite'>
                Symmetrical
                <br />
                Rules Only
              </label>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <Switch.Root
                    onCheckedChange={(checked) => p.radialTables(checked)}
                    defaultChecked={false}
                    className='ml-2 h-5 w-9 rounded-full border-2 border-slider3 bg-bg1 transition-colors duration-100 data-[state=checked]:bg-ruleButton2 dark:border-slider2Dark dark:bg-slider1Dark data-[state=checked]:dark:bg-ruleButton2'>
                    <Switch.Thumb className='block h-4 w-4 rounded-full bg-back transition duration-100 data-[state=checked]:translate-x-4 dark:bg-ruleButton3Dark' />
                  </Switch.Root>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Toggle alternate table layout
                </Tooltip.Content>
              </Tooltip.Root>
              <label className='my-0.5 h-full px-2 pt-0.5 leading-tight text-textBlack transition-colors duration-200 dark:text-textWhite'>
                Radial
                <br />
                Tables
              </label>
            </div>
          </section>

          <section className='flex w-1/2 flex-col justify-evenly border-b-2 border-l border-bg1 transition-colors duration-200 dark:border-bg1Dark'>
            <Tooltip.Root
              onOpenChange={() => {
                setTimeout(toggleTips, 1);
              }}>
              <Tooltip.Trigger>
                <IterationSlider
                  callback={p.setIterations}
                  setIterationsControlsSetter={p.setIterationsControlsSetter}
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                side='bottom'
                className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                <Tooltip.Arrow height={8} className='fill-yellow-100' />
                Set the number of iterations per frame.
                <br />
                Even numbers prevent flickering.
              </Tooltip.Content>
            </Tooltip.Root>
            <div className='w-full border border-bg1 transition-colors duration-200 dark:border-bg1Dark'></div>
            <div className='flex w-full flex-col items-center justify-center'>
              <label className='-mb-0.5 -mt-1 text-textBlack transition-colors duration-200 dark:text-textWhite'>
                Initialization Pattern
              </label>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <InitializationPatterns
                    callback={p.setInit}
                    setInitControlsSetter={p.setInitControlsSetter}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Click these to initialize the canvas with the
                  <br />
                  given pattern. A-F correspond to "seeds" that
                  <br />
                  can produce geometric patterns.
                  <br />
                  Click the selected button to re-initialize.
                </Tooltip.Content>
              </Tooltip.Root>
            </div>
          </section>
        </section>

        <section>
          <Tooltip.Root
            onOpenChange={() => {
              setTimeout(toggleTips, 1);
            }}>
            <Tooltip.Trigger>
              <CAETables p={p} />
            </Tooltip.Trigger>
            <Tooltip.Content
              side='bottom'
              className='tip -translate-y-4 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
              <Tooltip.Arrow height={8} className='fill-yellow-100' />
              Edit the rule manually.
              <br />
              Click and drag to paint.
            </Tooltip.Content>
          </Tooltip.Root>
          <div className='mb-1 flex h-[28px] w-full justify-center'>
            <div className='flex h-min'>
              <div className='flex grow'>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <Toggle.Root
                      onPressedChange={(pressed) => p.setLock1(pressed)}
                      defaultPressed={false}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-[1px] text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:shadow-md data-[state=on]:bg-ruleButton1 dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark data-[state=on]:dark:bg-ruleButton1Dark data-[state=on]:dark:text-textBlack'>
                      🔒
                    </Toggle.Root>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Lock table.
                    <br />
                    Stays the same while generating.
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.fillRule1()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Fill
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Fill the table with ON
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.clearRule1()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Clear
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Fill the table with OFF
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.invertRule1()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Invert
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Swap ON and OFF
                  </Tooltip.Content>
                </Tooltip.Root>
              </div>
            </div>
            <div className='mx-[23px] flex h-min'>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <button
                    onClick={() => p.rotateRule()}
                    className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-1 text-sm font-bold text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                    ⟳
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Rotate rule.
                  <br />
                  Rotates the output 90 degrees.
                  <br />
                  No effect on symmetrical rules.
                </Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root
                onOpenChange={() => {
                  setTimeout(toggleTips, 1);
                }}>
                <Tooltip.Trigger>
                  <button
                    onClick={() => p.swapRule()}
                    className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-1 text-sm font-bold text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                    ⥂
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side='bottom'
                  className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                  <Tooltip.Arrow height={8} className='fill-yellow-100' />
                  Swap tables.
                  <br />
                  Swaps the left and right tables.
                </Tooltip.Content>
              </Tooltip.Root>
            </div>
            <div className='flex h-min'>
              <div className='flex grow'>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <Toggle.Root
                      onPressedChange={(pressed) => p.setLock2(pressed)}
                      defaultPressed={false}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-[1px] text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:shadow-md data-[state=on]:bg-ruleButton1 dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark data-[state=on]:dark:bg-ruleButton1Dark data-[state=on]:dark:text-textBlack'>
                      🔒
                    </Toggle.Root>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Lock table.
                    <br />
                    Stays the same while generating.
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.fillRule2()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Fill
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Fill the table with ON
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.clearRule2()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Clear
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Fill the table with OFF
                  </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                  onOpenChange={() => {
                    setTimeout(toggleTips, 1);
                  }}>
                  <Tooltip.Trigger>
                    <button
                      onClick={() => p.invertRule2()}
                      className='mx-1 grow-0 whitespace-nowrap rounded-sm border-2 border-ruleButton1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-ruleButton2 hover:bg-back hover:shadow-md dark:border-ruleButton1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-ruleButton2Dark hover:dark:bg-backDark'>
                      Invert
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side='bottom'
                    className='tip z-50 translate-y-1 rounded-sm border border-textBlack bg-yellow-100 px-1 text-textBlack shadow-md data-[state=closed]:animate-tooltipdisappear data-[state=delayed-open]:animate-tooltipappear'>
                    <Tooltip.Arrow height={8} className='fill-yellow-100' />
                    Swap ON and OFF
                  </Tooltip.Content>
                </Tooltip.Root>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Tooltip.Provider>
  );
};

export default CAEControls;
