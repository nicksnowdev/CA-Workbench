import React from 'react';

const Logo = () => {
  return (
    <a
      href='https://ca-workbench.com'
      className='m-2 mr-4 flex h-14 items-center justify-center whitespace-nowrap bg-logolight bg-cover bg-center px-4 text-2xl font-extrabold text-textBlack transition-colors duration-200 ease-in-out dark:bg-logodark dark:text-textWhite'>
      C.A. Workbench
    </a>
  );
};

export default Logo;
