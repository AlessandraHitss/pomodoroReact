import { ButtonControl } from "../../components/ButtonControl";
import { ClockPanel } from "../../components/ClockPanel";
import { Input } from "../../components/Inputs";
import { TitleAction } from "../../components/TitleAction";
import * as S from "./styles";
import { useClockConfig } from "./useClockConfig";

export function ClockConfig() {
  const {
    navigate,
    minutes,
    seconds,
    start,
    pause,
    step,
    configTime,
    setConfigTime,
  } = useClockConfig();
  return (
    <S.BodyClockConfig>
      <S.Container>
        <Input
          nameLabel={"work"}
          label={"Work"}
          value={configTime.work}
          onChange={(e) => setConfigTime(e)}
        />
        <Input
          nameLabel={"shortBreak"}
          label={"Short Break"}
          value={configTime.shortBreak}
          onChange={(e) => setConfigTime(e)}
        />
        <Input
          nameLabel={"longBreak"}
          label={"Long Break"}
          value={configTime.longBreak}
          onChange={(e) => setConfigTime(e)}
        />
        <Input
          nameLabel={"sessions"}
          label={"Sessions"}
          value={configTime.sessions}
          onChange={(e) => setConfigTime(e)}
        />
   
      </S.Container>

      <S.Container>
        <ClockPanel
          minutes={`${minutes < 10 ? "0" : ""}${minutes}`}
          seconds={`${seconds < 10 ? "0" : ""}${seconds}`}
        />
        <div>
          <TitleAction title={`| ${step}`} />
          <S.Box>
            <ButtonControl text={"Start"} onClick={start} />
            <ButtonControl text={"Pause"} onClick={pause} />
            <ButtonControl text={"Home"} onClick={() => navigate("/")} />
          </S.Box>
        </div>
      </S.Container>
    </S.BodyClockConfig>
  );
}
