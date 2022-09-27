import { useHome } from "./useHome";
import * as S from "./styles";
import { Title } from "../../components/Title";
import logo from "../../assets/tomato.png";
import { Button } from "../../components/Button";

export function Home() {
  const { navigate } = useHome();
  return (
    <S.BodyHome>
      <S.Container>
        <Title title={"Pomodoro Timer"} />
        <img src={logo} height={"50px"} />
      </S.Container>
      <S.Container>
        <Button onClick={() => navigate("/clock")} text={"Pomodoro Padrão"} />
        <Button
          onClick={() => navigate("/clockConfig")}
          text={"Pomodoro Personalizado"}
        />
      </S.Container>
    </S.BodyHome>
  );
}
