import * as S from './styles'

export function ClockPanel ({ minutes, seconds }) {
    return(
        <S.Panel>
            <S.Config>{minutes}</S.Config>
            <S.Config>:</S.Config>
            <S.Config>{seconds}</S.Config>
        </S.Panel>
    )
}