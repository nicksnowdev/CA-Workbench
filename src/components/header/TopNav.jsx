import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const TopNav = () => {
  return (
    <div className='shrink-0'>
      <NavigationMenu.Root
        delayDuration='300'
        skipDelayDuration='300'
        className='m-2 flex h-14 w-full flex-nowrap items-center'>
        <div className='w-full'>
          <NavigationMenu.List className='flex flex-shrink-0 items-center justify-start text-textBlack dark:text-textWhite'>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className='w-24 p-6 transition duration-200 ease-in-out hover:scale-110 hover:bg-back hover:shadow-md data-[state=open]:bg-back dark:hover:bg-backDark dark:data-[state=open]:bg-backDark'>
                What?
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className='-mt-2 h-[562px] w-page rounded-b-sm bg-back/70 text-textBlack shadow-md dark:bg-backDark/70 dark:text-textWhite'>
                <div className='flex'>
                  <p className='w-2/3 p-4 pt-8'>
                    <h1 className='text-lg font-bold'>
                      This app generates interesting 2D patterns. That's basically it.
                    </h1>
                    <br />
                    It's slightly more interesting if you're familiar with{' '}
                    <em>cellular automata:</em>
                    <br />
                    <br />
                    A cellular automaton is a grid of pixels that changes over time according to an
                    algorithm.
                    <br />
                    <br />
                    Each pixel has one of two states, ON or OFF.
                    <br />
                    Each pixel is surrounded by 8 other pixels, forming a 3x3 square called a{' '}
                    <em>neighborhood.</em>
                    <br />
                    Each pixel gets its next state by finding its current neighborhood in the{' '}
                    <em>rule.</em>
                    <br />
                    The rule is a 9-bit truth table that maps every possible neighborhood to ON or
                    OFF.
                    <br />
                    <br />
                    The whole system iterates many times per second, thus, it changes over time.
                    <br />
                    By modifying the rule, you change how the system evolves.
                    <br />
                    Many rules are chaotic with no interesting patterns...
                    <br />
                    However, some rules exhibit geometric, mineralogical, or even life-like
                    behavior.
                    <br />
                    <br />
                    <br />
                    <p className='ml-8 font-bold'>
                      Adjust the controls and press "Generate Rule" to get started.
                    </p>
                    <br />
                    <p className='ml-8 text-sm'>
                      (You can disable tooltips with the top-right light bulb button)
                    </p>
                  </p>
                  <div className='mr-8 flex w-1/3 flex-col'>
                    <br />
                    <br />
                    <div className='flex w-full items-center justify-center'>
                      <div className='mr-4 flex w-5/12 flex-col items-center text-center'>
                        <img
                          src='/assets/neighborhood.png'
                          alt='a neighborhood'
                          className='w-5/6'
                        />
                        <em>a neighborhood</em>
                      </div>
                      <div className='w-7/12 text-center'>
                        <img
                          src='/assets/rule.png'
                          alt='a neighborhood in the rule'
                          className='w-full'
                        />
                        <em>a neighborhood in the rule (purple = ON)</em>
                      </div>
                    </div>
                    <br />
                    <div className='flex justify-between'>
                      <div className='-ml-10 flex w-1/2 flex-col items-center'>
                        <img src='/assets/gol.gif' alt="Conway's Game of Life" />
                        <em>"Conway's Game of Life"</em>
                      </div>
                      <div className='mr-1 flex w-1/2 flex-col items-center'>
                        <img src='/assets/otherCA.gif' alt='Another 2D CA' />
                        <em>Another 2D CA</em>
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <div className='absolute left-0 -z-10 flex w-full justify-start lg:justify-center'>
            <NavigationMenu.Viewport className='origin-top rounded-b-sm backdrop-blur-3xl data-[state=closed]:animate-navcontentdisappear data-[state=open]:animate-navcontentappear' />
          </div>
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default TopNav;
