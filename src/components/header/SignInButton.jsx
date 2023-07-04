import React from 'react';

const SignInButton = () => {
  return (
    <button className='w-24 rounded-full border-2 border-button1 bg-bg2 p-2 text-textBlack decoration-auto transition-colors duration-100 ease-out hover:border-button2 hover:bg-back hover:underline hover:shadow-md dark:border-button1Dark dark:bg-bg2Dark dark:text-textWhite hover:dark:border-button2Dark dark:hover:bg-backDark'>
      Sign-in
    </button>
  );
};

export default SignInButton;
