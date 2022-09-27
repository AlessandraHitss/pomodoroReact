import { useEffect, useState,  useRef, useReducer } from "react";

export const useClockConfig = () => {

const initial = {
  work: 0,
  shortBreak: 0,
  longBreak: 0,
  sessions:0
  
} 

const handleChange = (prev, e) => {
  const value = e.target.value

  if (e.action === 'reset') {
    return initial
  }
 return ({
    ...prev,
    [e.target.name]: value
  })


}
// setConfigTime({e: {action: 'reset'}})
const [configTime, setConfigTime] = useReducer(handleChange, initial);


const [play, isPlay] = useState(false)
const [isCounting, setIsCounting] = useState(false);
const [stepPomodoro, setStepPomodoro] = useState("work");



const [currentTime, setCurrentTime] = useState(configTime.work);
console.log('configTime', configTime.work)
console.log('currentTime',currentTime)

console.log('initial', initial)

  const interval = useRef();

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  function startPomodoro() {

    console.log("startPomodoro()", initial);
    workPomodoro();
  }

  function workPomodoro() {
    console.log("workPomodoro()");
    setIsCounting(true);
    setCurrentTime(configTime.work * 60);
    console.log('currentTime222222', configTime.work)
    setStepPomodoro("work");
  }

  function breakPomodoro() {
    // console.log("intervalo");
    // console.log(sessionsConfig);
    // if (sessionsConfig > 1) {
    //   setCurrentTime(configTime.shortBreak * 60);
    //   setStepPomodoro("shortBreak");
    // } else {
    //   setCurrentTime(configTime.longBreak * 60);
    //   setStepPomodoro("longBreak");
    //   setHasFinished(true);
    // }
  }

  function endPomodoro() {
    console.log("endPomodoro");
    setIsCounting(false);
    setStepPomodoro("finished");
  }


  function pause() {
    clearInterval(interval.current)
  }

  useEffect(() => {
    if (stepPomodoro === "work") {
      console.log("pegou work true");
      if (currentTime > 0 && isCounting) {
        interval.current = setInterval(() => {
          isCounting &&
            setCurrentTime((currentTime) =>
              currentTime >= 1 ? currentTime - 1 : 0
            );
        }, 100);

        return () => {
          clearInterval(interval.current);
        };
      } else if (isCounting && currentTime === 0) {
        breakPomodoro();
      }
    } else if (stepPomodoro !== "work") {
      if (currentTime > 0 && isCounting) {
        interval.current = setInterval(() => {
          isCounting &&
            setCurrentTime((currentTime) =>
              currentTime >= 1 ? currentTime - 1 : 0
            );
        }, 100);

        return () => {
          clearInterval(interval.current);
        };
      } else if (isCounting && currentTime === 0 && stepPomodoro === 'shortBreak') {
        workPomodoro();
      } else if (isCounting && currentTime === 0 && stepPomodoro === 'longBreak') {
       endPomodoro();
      }
    } 
  }, [currentTime, isCounting, configTime]);

  return {
    stepPomodoro,
    startPomodoro,
    minutes,
    seconds,
    pause,
    handleChange,
    configTime,
    // handleChangeSession,
    setConfigTime
   
  };
};