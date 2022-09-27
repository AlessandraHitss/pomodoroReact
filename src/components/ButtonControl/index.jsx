import * as S from './styles'


export function ButtonControl ({ onClick, text}) {

    return(
        <S.Button onClick={onClick}>
      {text}
    </S.Button>
    )
    
    
}