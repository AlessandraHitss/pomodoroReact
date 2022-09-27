import { useEffect, useState,  useRef } from "react";
import { useNavigate } from 'react-router-dom';


export const useClock = () => {
  const [time, setTime] = useState({
    workTime: 15,
    shortTime: 5,
    longTime: 15,
});
  const [sessions, setSessions,] = useState(4);
  const [isCounting, setIsCounting] = useState(false);


  const [step, setStep] = useState("Work");
  const [currentTime, setCurrentTime] = useState(time.workTime * 60);
  const [listTask, setListTask] = useState([])

  const interval = useRef();
  const navigate = useNavigate();

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  function start() {
    work();
    setListTask([...listTask, {title:'work', time:`${time.workTime} minutes` }])

 
  }

  function work() {
    setIsCounting(true);
    setCurrentTime(time.workTime * 60);
    setStep("Work");
    setListTask([...listTask, {title:'work', time:`${time.workTime} minutes` }])

  }

  console.log(listTask, "listTask")

  function breakTime() {
 
    if (sessions > 1) {
      setCurrentTime(time
        .shortTime * 60);
      setStep("Short Break");
      setSessions(sessions - 1);
      setListTask([...listTask, {title:'Short Break', time:`${time.shortTime} minutes` }])

     
    } else {
      setCurrentTime(time.longTime * 60);
      setStep("Long Break");
      setListTask([...listTask, {title:'Long Break', time:`${time.workTime} minutes` }])

    }
  }

  function ended() {

    setIsCounting(false);
    setStep("Ended");
    setListTask([...listTask, {title:'Ended!'}])
  }


  function pause() {
    clearInterval(interval.current)
  }

  useEffect(() => {
    if (step === "Work") {
      console.log("pegou work true");
      if (currentTime > 0 && isCounting) {
        interval.current = setInterval(() => {
          isCounting &&
            setCurrentTime((currentTime) =>
              currentTime >= 1 ? currentTime - 1 : 0
            );
        }, 10);

        return () => {
          clearInterval(interval.current);
        };
      } else if (isCounting && currentTime === 0) {
        breakTime();
      }
    } else if (step !== "Work") {
      if (currentTime > 0 && isCounting) {
        interval.current = setInterval(() => {
          isCounting &&
            setCurrentTime((currentTime) =>
              currentTime >= 1 ? currentTime - 1 : 0
            );
        }, 10);

        return () => {
          clearInterval(interval.current);
        };
      } else if (currentTime === 0 && step === 'Short Break') {
        work();
      } else if (currentTime === 0 && step === 'Long Break') {
       ended();
      }
    } 
  }, [currentTime, isCounting]);

  return {
    step,
    start,
    minutes,
    seconds,
    pause,
    listTask,
    navigate
  };
};