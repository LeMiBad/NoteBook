import { FC } from 'react'
import css from './AuthPage.module.sass'

interface ErrorMessageAuthProps{
    isAuth: boolean | Array<number>
} 

const ErrorMessageAuth: FC<ErrorMessageAuthProps> = ({isAuth}) => {
    if (isAuth === false) return <></>

    const returnErrorMessage = () => {
        if(typeof(isAuth) !== 'boolean' && isAuth[0] === 1 && isAuth[1] === 0) return 'Неверно введён пароль'
        if(typeof(isAuth) !== 'boolean' && isAuth[0] === 0 && isAuth[1] === 1) return 'Такого пользователя не существует'
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

export default ErrorMessageAuth