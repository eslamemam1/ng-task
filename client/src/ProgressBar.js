import React from 'react'
/** ProgressBar Increase When Counter Increase */
/** */
function ProgressBar({ counter, data }) {
    const ProgressScore = (counter / data.length)*100;
  return (
      <div className=' w-11/12 h-7 rounded-2xl border-[#2a577e] border-2 border-solid mt-5'>
          <div className=' h-6 bg-[#67b8fb] rounded-2xl flex justify-center' style={{ width: `${ProgressScore}%` }}>
            {ProgressScore === 0 ? "" : <span className=' text-lg flex items-center text-white'>{ProgressScore} %</span> }
          </div>
      </div>
  )
}

export default ProgressBar