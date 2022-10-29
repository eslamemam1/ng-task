import React from 'react'

function Question({data , counter}) {
  return (
      <div className=' questions flex flex-col text-white h-full m-auto w-4/5'>
          <p className=' sm:h-1/4 h-1/2 w-4/5 sm:text-2xl sm:font-medium text-xl flex justify-center'> Question {counter + 1} <span className=' sm:block hidden '>/ {data.length}</span>  </p>
          <p className=' sm:h-3/4 h-1/2 w-4/5 sm:text-2xl sm:font-medium text-xl flex justify-center sm:items-center '> {data[counter].word}</p>
      </div>
  )
}

export default Question