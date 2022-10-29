import './App.css';
import Score from './Score';
import Question from './Question';
import Selections from './Selections';
import WrongAnswer from './WrongAnswer';
import ProgressBar from './ProgressBar';
import axios from 'axios'
import { useEffect, useState } from 'react'
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState();
  const [hidden, setHidden] = useState(false);

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
  

  const nextQuestion = (e) => {

    //console.log(e.target.value)

    const targetValue = e.target.value;
    const foundValue = data.findIndex(item => item.word === data[counter].word);
    const valueOfPos = data[foundValue].pos;

    //console.log(valueOfPos);

    if ( targetValue === valueOfPos)
    {
      setScore(score + 1)
      setCounter(counter + 1)
      setHidden(false);
    } else
    {
      setCounter(counter + 1)
      setHidden(true);
    }
  }

  const arr = [];
  const reset = () => {
    setCounter(0);
    setScore(0);
  }

  // eslint-disable-next-line no-unused-expressions
  //loading ? "dd" : data.map((item) => { return arr.push(item.pos) })

  const exit = ()=>{
    setHidden(false);
    console.log("exit")
  }
  
  return (
    <div className="bg-[#67b8fb] w-full h-screen flex justify-center items-center ">
        {loading ? "loading" :
          hidden ? <WrongAnswer exit={ exit } /> :  
          <div className=' flex flex-col justify-center items-center w-2/3 h-1/2 rounded-xl bg-[#1f2840]'>
          <div className=''>
            { data.map((items, id) => {
              return (
                <div key={id}>
                  <p className='none'>{arr.push(items.pos)}</p>
                </div>
              )
            })
            }
          </div>
            { 
            counter === data.length  ?
              <Score score={score} data={ data } reset={reset} finalScore={finalScore} />
              :
              <div className=' flex sm:flex-row justify-start items-center sm:items-start flex-col w-11/12'>
                <Question counter={counter} data={data} />
                <Selections arr={arr} nextQuestion={nextQuestion} />
              </div>
            }
            <ProgressBar counter={counter} data={data} />
        </div> 
      }
      </div>
  );
}

export default App;
