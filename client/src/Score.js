import React from 'react'
//** Score Component View Score And Rank Result */
/** */
function Score({ score, data, finalScore, reset }) {
  return (
      <div className=' flex flex-col items-center w-full'>
          <p className=' text-3xl text-white mb-2 '> Score is : {(score / data.length) * 100} % </p>
          <p className=' text-3xl text-white mb-2 '> Rank is : {finalScore.data.rank}</p> 
          <button className=' Reset w-1/2 h-10 text-2xl text-white rounded-xl mt-10 border-[#2a577e] border-2 border-solid hover:bg-slate-400 ' onClick={reset}>Try Again</button>
      </div>
  )
}

export default Score