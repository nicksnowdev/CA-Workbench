import React from 'react';
import { useState } from 'react';

let waiting = true; // im sure there's a better way to do this, but this remembers the state without useing usestate
let lastID = -1;
let firstID = -1;
let edgeID = -1;
let pages = 0;
let pageNum = 1;
let navDirection = '';

// break up long words
const getCount = (str) => {
  return str.split(' ').filter((num) => {
    return num != '';
  }).length;
};

const Result = ({ r }) => {
  return (
    <div
      className='data-[direction=left]:animate-resultsLeft data-[direction=right]:animate-resultsRight'
      data-direction={navDirection}>
      {r}
    </div>
  );
};

const CAEBrowser = ({ load, setHardReloadSetter }) => {
  const [publishedArray, setPublishedArray] = useState([]);
  const [result, setResult] = useState();
  const [query, setQuery] = useState(true);
  const [reload, setReload] = useState(false); // triggers render when db results come in, will have to be set to true with every new query
  const [hardReload, setHardReload] = useState(true); // completely resets the gallery
  const [num, setNum] = useState(15);
  const [seek, setSeek] = useState('older');
  const [sort, setSort] = useState('newest');

  setHardReloadSetter(setHardReload);

  const req = new XMLHttpRequest();
  req.onload = () => {
    let numRecords = parseInt(JSON.parse(req.responseText)['COUNT(*)'], 10);
    if (num > 0) {
      pages = Math.ceil(numRecords / num);
    } else {
      pages = 1;
    }
  };
  req.open('GET', `count_cas.php`);
  req.send();

  pageNum = Math.min(Math.max(pageNum, 1), pages); // keep page number within number of pages

  const fillerResults = [];
  for (let i = 0; i < num; i++) {
    fillerResults.push(
      <li
        key={-2 - i}
        className='mx-1 mb-2 rounded-sm bg-back px-1 text-back dark:bg-backDark dark:text-backDark'>
        -
      </li>
    );
  }

  if (reload) {
    setQuery(true); // trigger rerender
    lastID = -1;
    firstID = -1;
    edgeID = -1;
    pageNum = 1; // reset page position
    navDirection = '';
    if (sort == 'newest') {
      setSeek('older');
    } else if (sort == 'oldest') {
      setSeek('newer');
    }
    setReload(false);
  }

  if (hardReload) {
    setQuery(true); // trigger rerender
    lastID = -1;
    firstID = -1;
    edgeID = -1;
    pageNum = 1; // reset page position
    navDirection = '';
    setSort('newest'); // reset sort mode
    setSeek('older');
    setHardReload(false);
  }

  if (query) {
    const req = new XMLHttpRequest();
    req.onload = () => {
      setQuery(false);
      waiting = false;
      try {
        let tempArray = [
          {
            id: -1,
            title: 'database error',
            date: '',
          },
        ];
        try {
          tempArray = JSON.parse(req.responseText);
        } catch {
          console.error(req.responseText);
        }
        while (publishedArray.length > 0) {
          publishedArray.pop();
        }
        if ((sort == 'newest' && seek == 'older') || (sort == 'oldest' && seek == 'newer')) {
          for (let i = 0; i < tempArray.length; i++) {
            publishedArray.push(tempArray[i]);
          }
          // reverse the array if going back, because the sql sorts backwards when going the opposite direction
        } else if ((sort == 'newest' && seek == 'newer') || (sort == 'oldest' && seek == 'older')) {
          for (let i = tempArray.length - 1; i >= 0; i--) {
            publishedArray.push(tempArray[i]);
          }
        }
        let setFirst = false;
        const publishedMap = publishedArray.map((ca) => {
          if (!setFirst) {
            firstID = ca.id;
            setFirst = true;
          }
          lastID = ca.id;
          let style = '';
          if (getCount(ca.title) <= 2) {
            style = 'break-all'; // break up overly-long words if there are 2 or fewer in the title
          }
          return (
            <li
              key={ca.id}
              onClick={() => {
                load(ca.rule, false, ca.iterations, ca.init);
              }}
              className='mx-1 mb-2 rounded-sm bg-back px-1 outline-1 outline-button2 hover:cursor-pointer hover:bg-white hover:underline hover:shadow-md hover:outline dark:bg-backDark dark:outline-button2Dark dark:hover:bg-bgCanvasDark'>
              <div className='flex justify-between'>
                <p className={`${style}`}>{ca.title}</p>
                <p className='shrink-0'>{ca.date}</p>
              </div>
            </li>
          );
        });

        // handle end of results
        const endFill = [];
        if (publishedArray.length < num) {
          // add filler results
          for (let i = publishedArray.length; i < num; i++) {
            endFill.push(
              <li
                key={-2 - i}
                className='mx-1 mb-2 rounded-sm bg-back px-1 text-back transition-colors duration-200 dark:bg-backDark dark:text-backDark'>
                -
              </li>
            );
          }
        } else if (num < 0 && publishedArray.length % 3 > 0) {
          // add filler results in case of showing all
          for (let i = 0; i <= publishedArray.length % 3; i++) {
            endFill.push(
              <li
                key={-2 - i}
                className='mx-1 mb-2 rounded-sm bg-back px-1 text-back transition-colors duration-200 dark:bg-backDark dark:text-backDark'>
                -
              </li>
            );
          }
        }
        if (publishedArray.length == 0) {
          setQuery(true);
          // fix result IDs
          if (sort == 'newest') {
            if (seek == 'older') {
              firstID++;
              edgeID = firstID;
            } else if (seek == 'newer') {
              lastID--;
              edgeID = lastID;
            }
          } else if (sort == 'oldest') {
            if (seek == 'newer') {
              firstID--;
              edgeID = firstID;
            } else if (seek == 'older') {
              lastID++;
              edgeID = lastID;
            }
          }
        }
        setResult(
          // for some reason there is extra padding on the bottom here compared to the filler results, so i counteract it with mb-0
          <ul className='m-2 mb-0 columns-3 p-1'>
            {publishedMap}
            {endFill}
          </ul>
        ); // render results
      } catch (error) {
        console.error(error);
      }
    };
    req.open('GET', `browse_cas.php?num=${num}&edgeID=${edgeID}&seek=${seek}&sort=${sort}`);
    req.send();
    waiting = true;
  }
  if (waiting) {
    return (
      <section className='text-textBlack, mt-4 w-full rounded-sm bg-bg2 shadow-md transition-colors duration-200 dark:bg-bg2Dark dark:text-textWhite dark:shadow-slate-900'>
        <header className='flex border-b-2 border-bg1 p-2 dark:border-bg1Dark'>
          <h1 className='ml-2 font-bold'>Gallery:</h1>
          <label className='ml-3'>Sort by:</label>
          <select
            value={sort}
            className='ml-1 rounded-sm bg-back text-textBlack transition-colors duration-100 hover:bg-white dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark'>
            <option value={sort}>{sort}</option>
            {/* for spacing */}
            <option value='newest'>newest</option>
          </select>
          <button
            disabled={true}
            className='ml-4 mr-2 rounded-sm bg-back px-1 text-textBlack transition-colors duration-100 hover:bg-white hover:shadow-md disabled:bg-bg2 disabled:hover:cursor-default disabled:hover:shadow-none dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark dark:disabled:bg-bg2Dark'>
            {'<<<'}
          </button>
          {pageNum}/{pages}
          <button
            disabled={true}
            className='ml-2 mr-2 rounded-sm bg-back px-1 text-textBlack transition-colors duration-100 hover:bg-white hover:shadow-md disabled:bg-bg2 disabled:hover:cursor-default disabled:hover:shadow-none dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark dark:disabled:bg-bg2Dark'>
            {'>>>'}
          </button>
          <label className='ml-4'>Results per page:</label>
          <select
            value={num}
            className='ml-1 rounded-sm bg-back text-textBlack hover:cursor-pointer hover:bg-white dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark'>
            <option value={num}>{num}</option>
            {/* for spacing */}
            <option value='-1'>All</option>
          </select>
        </header>
        <ul className='m-2 columns-3 p-1'>{fillerResults}</ul>
      </section>
    );
  } else {
    return (
      <section className='text-textBlack, mt-4 w-full rounded-sm bg-bg2 shadow-md transition-colors duration-200 dark:bg-bg2Dark dark:text-textWhite dark:shadow-slate-900'>
        <header className='flex border-b-2 border-bg1 p-2 dark:border-bg1Dark'>
          <h1 className='ml-2 font-bold'>Gallery:</h1>
          <label className='ml-3'>Sort by:</label>
          <select
            value={sort}
            onChange={(e) => {
              setQuery(true);
              firstID = -1; // reset the location
              lastID = -1;
              edgeID = -1;
              pageNum = 1;
              if (e.target.value == 'oldest') {
                setSort('oldest');
                setSeek('newer'); // ensures the first page of results will be in the correct order when they load
              } else if (e.target.value == 'newest') {
                setSort('newest');
                setSeek('older'); // ensures the first page of results will be in the correct order when they load
              }
            }}
            className='ml-1 rounded-sm bg-back text-textBlack transition-colors duration-100 hover:bg-white dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark'>
            <option value='newest'>newest</option>
            <option value='oldest'>oldest</option>
          </select>
          <button
            disabled={pageNum <= 1}
            onClick={() => {
              navDirection = 'left';
              setQuery(true);
              if (sort == 'newest') {
                setSeek('newer');
              } else if (sort == 'oldest') {
                setSeek('older');
              }
              edgeID = firstID;
              pageNum--;
            }}
            className='ml-4 mr-2 rounded-sm bg-back px-1 text-textBlack transition-colors duration-100 hover:bg-white hover:shadow-md disabled:bg-bg2 disabled:hover:cursor-default disabled:hover:shadow-none dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark dark:disabled:bg-bg2Dark'>
            {'<<<'}
          </button>
          {pageNum}/{pages}
          <button
            disabled={pageNum >= pages}
            onClick={() => {
              navDirection = 'right';
              setQuery(true);
              if (sort == 'newest') {
                setSeek('older');
              } else if (sort == 'oldest') {
                setSeek('newer');
              }
              edgeID = lastID;
              pageNum++;
            }}
            className='ml-2 mr-2 rounded-sm bg-back px-1 text-textBlack transition-colors duration-100 hover:bg-white hover:shadow-md disabled:bg-bg2 disabled:hover:cursor-default disabled:hover:shadow-none dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark dark:disabled:bg-bg2Dark'>
            {'>>>'}
          </button>
          <label className='ml-4'>Results per page:</label>
          <select
            value={num}
            onChange={(e) => {
              // for some reason there is a race condition with setNum and setReload when showing all results, and this prevents it.
              if (e.target.value < 0) {
                pages = 1;
                pageNum = 1;
              }
              setNum(e.target.value);
              setReload(true);
            }}
            className='ml-1 rounded-sm bg-back text-textBlack hover:cursor-pointer hover:bg-white dark:bg-backDark dark:text-textWhite dark:hover:bg-bgCanvasDark'>
            <option value='9'>9</option>
            <option value='15'>15</option>
            <option value='30'>30</option>
            <option value='-1'>All</option>
          </select>
        </header>
        <div class='galleryResultsBox' className='overflow-hidden'>
          <div>
            <Result r={result} />
          </div>
        </div>
      </section>
    );
  }
};

export default CAEBrowser;
