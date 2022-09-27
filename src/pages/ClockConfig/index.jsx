import { Input } from "../../components/Inputs"
import { useClockConfig } from "./useClockConfig"

export function ClockConfig () {
    const {
        navigate,
        minutes,
        seconds,
        startPomodoro,
        pause, 
        stepPomodoro,
        configTime,
        handleChange,
        handleChangeSession,
        setConfigTime
     

    } = useClockConfig()
    return (
        <>

        <Input nameLabel={'work'} label={"Work"} value={configTime.work} onChange={(e) => setConfigTime(e)}  />
        <Input nameLabel={'shortBreak'} label={"Short Break"} value={configTime.shortBreak} onChange={(e) => setConfigTime(e)}  />
        <Input nameLabel={'longBreak'} label={"Long Break"} value={configTime.longBreak} onChange={(e) => setConfigTime(e)} />
        <Input nameLabel={'sessions'} label={"Sessions"} value={configTime.sessions} oonChange={(e) => setConfigTime(e)} />

        <button>Iniciar </button>  
     
        <h1>{stepPomodoro}</h1>
        
        <div>
        {minutes}
        </div>
        <div>:</div>
        <div>
           {seconds}
        </div>

        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={startPomodoro}>Iniciar</button>
        <button onClick={pause}>Pause</button>
        </>
    )
}