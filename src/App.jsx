import CAEMain from './components/ca_engine/CAEMain';
import Logo from './components/header/Logo';
import ThemeButton from './components/header/ThemeButton';
import TopNav from './components/header/TopNav';
import TooltipButton from './components/header/TooltipButton';

const App = () => {
  return (
    <div className='flex justify-start lg:justify-center'>
      <div className='z-0 flex w-page flex-col'>
        <header className='flex w-full items-center justify-between rounded-b-sm bg-bg2 shadow-md dark:bg-bg2Dark dark:shadow-slate-900'>
          <div className='flex'>
            {/*replace with active logo*/}
            <Logo />
            <TopNav />
          </div>
          <div className='flex items-center bg-center'>
            <TooltipButton />
            <ThemeButton />
          </div>
        </header>
        <div className='-z-20 w-full'>
          <CAEMain />
        </div>
      </div>
    </div>
  );
};

export default App;
