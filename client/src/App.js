import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState();

  useEffect(() => {
    axios.request("http://localhost:9090/words").then(function (response) {
      setLoading(false);
      setData(response.data);
      console.log(response.data)
    }).catch(function (error) {
      setLoading(false);
      console.error(error);
    })
  }, []);
  useEffect(() => {
    axios.post("http://localhost:9090/rank", {
    "finalScore" : (score/(counter+1))*100
    }).then(res => {
        setLoading(false);
        console.log(res)
        setFinalScore(res)
  })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
    
  }, [counter])
 // console.log(finalScore.data.rank);
  const next = (e) => {
    console.log(e.target.value)
    const et = e.target.value;
    const foundValue = data.findIndex(item=>item.word === data[counter].word);
    //console.log(data[foundValue].pos);
    if ( et === data[foundValue].pos)
    {
      setScore(score + 1)
      setCounter(counter + 1)
    } else
    {
      setCounter(counter + 1)
    }
  }
  const ar = [];
  const reset = () => {
    setCounter(0);
    setScore(0);
  }
  return (
    <div className="bg-[#67b8fb] w-full h-screen flex justify-center items-center">
      {loading ? "loading" : 
        <div className=' flex flex-col justify-center items-center w-3/4 h-1/2 rounded-xl bg-[#1f2840]'>
          <div className=''>
            {data.map((items, id) => {
              return (
                <div key={id}>
                  <p className='none'>{ar.push(items.pos)}</p>
                </div>
              )
            })
            }
          </div>
          {
            counter === data.length  ?
              <div className=' flex flex-col items-center w-full'>
                <p className=' text-3xl text-white mb-2 '>Score is : {(score / data.length) * 100}</p>
                <p className=' text-3xl text-white mb-2 '>Rank is : {finalScore.data.rank}</p>
                <button className=' Reset w-1/2 h-10 text-2xl text-white rounded-xl mt-10 border-[#2a577e] border-2 border-solid hover:bg-slate-400 ' onClick={reset}>Try Again</button>
              </div>
              :
              <div className=' flex w-11/12'>
                <div className=' questions flex flex-col text-4xl text-white mb-2 w-1/2'>
                  <p> Question {counter + 1} / {data.length}  </p>
                  <p className=' flex justify-start items-center w-full h-full'> {data[counter].word}</p>
                </div>
                <div className=' btns flex flex-col w-1/2 '>
                  {ar.filter((items, index, arr) => {
                    return arr.indexOf(items) === index;  
                  }).map((item, id) => {
                    return (
                      <button className=' btns w-full h-10 text-white text-xl rounded-xl mb-2 border-[#2a577e] border-2 border-solid hover:bg-slate-400 ' value={item} onClick={next} key={id}>{item}</button>
                    )
                  })}
                </div>
              </div>
          }
        </div> 
      }
    </div>
  );
}

export default App;
