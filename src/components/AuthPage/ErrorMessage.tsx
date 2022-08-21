import { FC } from 'react'
import css from './AuthPage.module.sass'

interface ErrorMessageProps{
    isAuth: boolean | Array<number>
} 

const ErrorMessage: FC<ErrorMessageProps> = ({isAuth}) => {
    if (isAuth === false) return <></>

    const returnErrorMessage = (variant: Array<number> | boolean) => {
        if(typeof(variant) !== 'boolean' && variant[0] === 1 && variant[1] === 0) return 'Неверно введён пароль'
        return 'Такого пользователя не существует'
    }

    return (
        <>
            <div className={css.errorBlock}>
                <div className={css.errorName}>Ошибка</div>
                <div className={css.errorText}>{returnErrorMessage(isAuth)}</div>
            </div>
        </>
    )
}

export default ErrorMessage