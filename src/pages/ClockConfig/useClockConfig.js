import { useEffect, useState, useRef, useReducer } from "react";
import { useNavigate } from 'react-router-dom';

export const useClockConfig = () => {
  const initial = {
    work: 0,
    shortBreak: 0,
    longBreak: 0,
    sessions: 0,
  };

  const handleChange = (prev, e) => {
    const value = e.target.value;

    if (e.action === "reset") {
      return initial;
    }
    return {
      ...prev,
      [e.target.name]: value,
    };
  };
  // setConfigTime({e: {action: 'reset'}})
  const [configTime, setConfigTime] = useReducer(handleChange, initial);
  const [isCounting, setIsCounting] = useState(false);
  const [step, setStep] = useState("Work");
  const [currentTime, setCurrentTime] = useState(configTime.work);
  const [sessions, setSessions] = useState(configTime.session);

  const interval = useRef();
  const navigate = useNavigate();

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  function start() {
    workPomodoro();
  }

  function workPomodoro() {
    setIsCounting(true);
    setCurrentTime(configTime.work * 60);
    setStep("Work");
  }

  function breakPomodoro() {
    if (sessions > 1) {
      setCurrentTime(configTime.shortBreak * 60);
      setStep("Short Break");
      setSessions(sessions - 1);
    } else {
      setCurrentTime(configTime.longBreak * 60);
      setStep("Long Break");
    }
  }

  function endPomodoro() {
    setIsCounting(false);
    setStep("Ended");
  }

  function pause() {
    clearInterval(interval.current);
  }

  useEffect(() => {
    if (step === "Work") {
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
    } else if (step !== "Work") {
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
      } else if (isCounting && currentTime === 0 && step === "Short Break") {
        workPomodoro();
      } else if (isCounting && currentTime === 0 && step === "Long Break") {
        endPomodoro();
      }
    }
  }, [currentTime, isCounting, configTime]);

  return {
    step,
    start,
    minutes,
    seconds,
    pause,
    configTime,
    setConfigTime,
    navigate
  };
};
