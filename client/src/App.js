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

  /** Get Data From Api Using Axios Request */
  /** */
  useEffect(() => {
    axios.request("http://localhost:9090/words").then(function (response) {
      setLoading(false);
      setData(response.data);
    }).catch(function (error) {
      setLoading(false);
      console.error(error);
    })
  }, []);

  /** Send Data Using Axios Post  */
  useEffect(() => {
    axios.post("http://localhost:9090/rank", {
    "finalScore" : (score/(counter+1))*100
    }).then(res => {
        setLoading(false);
        setFinalScore(res)
  })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
  }, [counter])
  
  /** If targetValue Equal valueOfPos Go To Next Question */
  const nextQuestion = (e) => {
    const targetValue = e.target.value;
    const foundValue = data.findIndex(item => item.word === data[counter].word);
    const valueOfPos = data[foundValue].pos;

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

  const arr = ["verb", "adverb", "noun", "adjective"];

  /** Function To Reset Counter and Score Stat */
  const reset = () => {
    setCounter(0);
    setScore(0);
  }
  /** Function To Exit From Wrong Answer Window */
  const exit = ()=>{
    setHidden(false);
  }
  
  return (
    <div className="bg-[#67b8fb] w-full h-screen flex justify-center items-center ">
        {loading ? "" :
          hidden ? <WrongAnswer exit={ exit } /> :  
          <div className=' flex flex-col justify-center items-center w-2/3 h-1/2 rounded-xl bg-[#1f2840]'>
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
