import React from 'react'

function WrongAnswer({exit}) {
  return (
    <div className=' w-2/4 h-1/4 rounded-xl bg-[#1f2840] flex flex-col'>
      <div className=' flex justify-end w-full'>
       <button className=' w-10 h-10  text-3xl text-white mt-3 mr-5 cursor-pointer rounded-lg border-2 hover:bg-slate-600 ' onClick={exit}>X</button>
      </div>
      <p className=' w-full flex justify-center justify-items-center text-3xl text-red-500 mt-5 '>Wrong Answer</p> 
      </div>
  )
}

export default WrongAnswer