import React from 'react';
import { useRef, useEffect } from 'react';

const CAETables = ({ p }) => {
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);

  useEffect(() => {
    table1Ref.current.appendChild(p.table1Renderer.view);
    table2Ref.current.appendChild(p.table2Renderer.view);
  });

  return (
    <div className='m-2 flex justify-center'>
      <div
        ref={table1Ref}
        onMouseEnter={() => p.setRenderTable1(true)}
        onMouseLeave={() => setTimeout(() => p.setRenderTable1(false), 20)}
        className='mx-2 cursor-pointer select-none shadow-md'></div>
      <div
        ref={table2Ref}
        onMouseEnter={() => p.setRenderTable2(true)}
        onMouseLeave={() => setTimeout(() => p.setRenderTable2(false), 20)}
        className='mx-2 cursor-pointer select-none shadow-md'></div>
    </div>
  );
};

export default CAETables;
