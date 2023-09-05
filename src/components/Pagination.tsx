import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export type IPagination = {
    nPages: number;
    currentPage: number;
    perPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
 
export function Pagination({nPages, currentPage, perPage, setCurrentPage}: IPagination) {
 
  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => setCurrentPage(index),
    } as any);
 
  const next = () => {
    if (currentPage === nPages) return;
 
    setCurrentPage(currentPage + 1);
  };
 
  const prev = () => {
    if (currentPage === 1) return;
 
    setCurrentPage(currentPage - 1);
  };

  const handlePageButton = (index: number) => {
    setCurrentPage(index + 1);
  }

  const getButtons = () => {
    const buttons = [];
    for (let i = 0; i < nPages; i++) {
        buttons.push(
          <button className={`px-3 py-1 mx-1 rounded-md hover:bg-gray-500 ${i === (currentPage - 1) ? 'bg-gray-500' : 'bg-white'}`} key={i} onClick={() => handlePageButton(i)}>{i + 1}</button>
        );
      }
    return buttons;
  }
 
  return (
    <div className='flex items-center gap-4'>
      <button
        className={`flex items-center gap-2 px-3 py-1 mx-1 bg-white rounded-md hover:bg-gray-500 ${currentPage === 1 && 'hover:bg-white'}`}
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' /> Previous
      </button>
      <div className='flex items-center gap-2'>
        {getButtons()}
      </div>
      <button
        className={`flex items-center gap-2 px-3 py-1 mx-1 bg-white rounded-md hover:bg-gray-500 ${currentPage === nPages && 'hover:bg-white'}`}
        onClick={next}
        disabled={currentPage === nPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
      </button>
    </div>
  );
}