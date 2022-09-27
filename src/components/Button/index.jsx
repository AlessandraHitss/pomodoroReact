import * as S from './styles'


export function Button ({ onClick, text }) {

    return(
        <S.Button onClick={onClick}>
        {text}
    </S.Button>
    )
    
    
}