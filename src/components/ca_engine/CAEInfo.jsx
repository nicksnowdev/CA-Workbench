import React from 'react';
import { useState } from 'react';
import 'bad-words';
import BadWordsFilter from 'bad-words';
import CAEBrowser from './CAEBrowser';
const filter = new BadWordsFilter();

let setHardReload;
const setHardReloadSetter = (funcRef) => {
  setHardReload = funcRef;
};

// initialize this one time so that it keeps its state through re-renders
let enteredTitle = '';
let lastRule = '';

const DbSection = ({ patchJSON, refresh, setWaitingSetter }) => {
  const [waiting, setWaiting] = useState(true);
  const [titleMessage, setTitleMessage] = useState('NEW!');

  setWaitingSetter(setWaiting);

  if (lastRule != patchJSON.rule) {
    lastRule = patchJSON.rule;
    setTitleMessage('NEW!');
  }

  const publishToDB = (rule, title, iterations, init, user) => {
    const nonZeroIter = Math.max(parseInt(iterations, 10), 1); // prevent storing 0 iterations
    console.log('uploading patch to database:');
    console.log({
      rule: rule,
      title: enteredTitle,
      iterations: nonZeroIter,
      init: init,
      user: user,
    });
    const req = new XMLHttpRequest();
    req.onload = () => {
      setWaiting(false);
      if (req.responseText[0] != 'E') {
        // if not an error
        console.log(req.responseText);
        enteredTitle = ''; // reset this after submission
      } else {
        console.error('title already exists in database');
        setTitleMessage('this title is taken');
      }
      refresh(); // this refreshes the info
      setHardReload(true); // this refreshes the browser
    };
    req.open(
      'GET',
      `publish_ca.php?rule=${rule}&title=${title}&iterations=${nonZeroIter}&init=${init}&user=${user}`
    );
    req.send();
  };

  const onTitleChange = (e) => {
    enteredTitle = e.target.value;
    enteredTitle = enteredTitle.replace(/\s+/g, ' '); // remove extra spaces
    enteredTitle = enteredTitle.replace(/[^a-zA-Z0-9!#&()_+-=,. ]/g, ''); // ensure safe characters
    e.target.value = enteredTitle;
    enteredTitle = enteredTitle.trim(); // remove outside whitespace ;
  };
  if (waiting) {
    return (
      <div className='w-1/2 border-l border-bg1 py-1 pl-4 pr-2 text-textBlack transition-colors duration-200 dark:border-bg1Dark dark:text-textWhite'>
        <div className='flex h-full items-center justify-center'>loading...</div>
      </div>
    );
  } else {
    if (patchJSON.title != null) {
      const TitleElement = <h1 className='ml-2 font-bold'>{patchJSON.title}</h1>;
      return (
        <div className='w-1/2 border-l border-bg1 py-1 pl-4 pr-2 text-textBlack transition-colors duration-200 dark:border-bg1Dark dark:text-textWhite'>
          <h1 className='flex'>Title: {TitleElement}</h1>
          <h1>Published: {patchJSON.date}</h1>
        </div>
      );
    } else {
      return (
        <div className='w-1/2 border-l border-bg1 py-1 pl-4 pr-2 text-textBlack transition-colors duration-200 dark:border-bg1Dark dark:text-textWhite'>
          <p className='-mt-1 text-center text-red-600 dark:text-red-400'>{titleMessage}</p>
          <div className='flex'>
            <input
              type='text'
              placeholder='enter a descriptive title'
              defaultValue={enteredTitle}
              maxLength={48}
              onChange={(e) => onTitleChange(e)}
              className='ml-0.5 mr-1 w-full rounded-sm bg-bgCanvas px-1 text-center text-textBlack shadow-md dark:bg-bg1Dark dark:text-textWhite'
            />
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() => {
                if (enteredTitle.length > 0) {
                  try {
                    let cleaned = filter.clean(enteredTitle);
                    if (cleaned == enteredTitle) {
                      setWaiting(true);
                      publishToDB(
                        patchJSON.rule,
                        enteredTitle,
                        patchJSON.iterations,
                        patchJSON.init,
                        patchJSON.user
                      );
                      setTitleMessage('NEW!');
                    } else {
                      console.error('input does not comply with filter');
                      setTitleMessage('title does not comply with filter');
                    }
                  } catch {
                    console.error('error parsing input');
                    setTitleMessage('error parsing input');
                  }
                } else {
                  console.error('please enter a title');
                  setTitleMessage('please enter a title');
                }
              }}
              className='mt-1 whitespace-nowrap rounded-sm border-2 border-button1 bg-bg2 px-2 text-sm text-textBlack transition duration-100 ease-out hover:border-button2 hover:bg-back hover:shadow-md dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark hover:dark:bg-backDark'>
              Save and Publish
            </button>
          </div>
        </div>
      );
    }
  }
};

const CAEInfo = ({ setPatchJSONSetter, load, refresh, setWaitingSetter }) => {
  const [patchJSON, setPatchJSON] = useState({});
  setPatchJSONSetter(patchJSON, setPatchJSON);
  return (
    <div>
      <div className='mt-4 flex w-app rounded-sm bg-bg2 shadow-md transition-colors duration-200 dark:bg-bg2Dark dark:shadow-slate-900'>
        <div className='h-20 w-1/2 break-words border-r border-bg1 py-1 pl-2 pr-4 text-textBlack transition-colors duration-200 dark:border-bg1Dark dark:text-textWhite'>
          CA#{patchJSON.rule}
        </div>
        <DbSection patchJSON={patchJSON} refresh={refresh} setWaitingSetter={setWaitingSetter} />
      </div>
      <CAEBrowser load={load} setHardReloadSetter={setHardReloadSetter} />
    </div>
  );
};

export default CAEInfo;
