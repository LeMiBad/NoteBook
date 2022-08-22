import { FC } from 'react'
import css from './AuthPage.module.sass'

interface ErrorMessageRegProps{
    isReg: boolean | Array<number>
} 

const ErrorMessageReg: FC<ErrorMessageRegProps> = ({isReg}) => {
    if (isReg === false) return <></>

    const returnErrorMessage = () => {
        if(typeof(isReg) !== 'boolean' && isReg[0] === 2) return 'Такой логин занят'
        if(typeof(isReg) !== 'boolean' && isReg[0] === 4) return 'Пароли не совпадают'
        if(typeof(isReg) !== 'boolean' && isReg[0] === 3) return 'Не все поля заполнены'
    }

    return (
        <>
            <div className={css.errorBlock}>
                <div className={css.errorName}>Ошибка</div>
                <div className={css.errorText}>{returnErrorMessage()}</div>
            </div>
        </>
    )
}

export default ErrorMessageReg