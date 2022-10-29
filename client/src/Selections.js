import React from 'react'
/** Selections Component View The Buttons Come From Array */
/** */
function Selections({nextQuestion , arr}) {
  return (
      <div className=' btns flex flex-col w-4/5 '>
          {arr.map((item, id) => {
              return (
                  <button className=' btns sm:w-full w-4/5 sm:h-10 h-7 text-white sm:text-xl text-lg rounded-xl mb-2 border-[#2a577e] border-2 border-solid hover:bg-slate-600 ' value={item} onClick={nextQuestion} key={id}>{item}</button>
              )
          })}
      </div>
  )
}

export default Selections