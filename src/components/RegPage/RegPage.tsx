import { useRef, MutableRefObject } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import ErrorMessageReg from './ErrorMessageReg'
import css from './../AuthPage/AuthPage.module.sass'
import { Link, Navigate } from 'react-router-dom'

const RegPage = () => {
    const {isReg} = useAppSelector(state => state.userReducer)
    const {createAccount} = userSlice.actions
    const dispatch = useAppDispatch()


    const login = useRef() as MutableRefObject<HTMLInputElement>
    const password = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRepeat = useRef() as MutableRefObject<HTMLInputElement>

    const creatUserAcc = () => dispatch(createAccount([login.current.value, password.current.value, passwordRepeat.current.value]))

    if(isReg === true) return <Navigate to={'/'}/>

    return (
        <div className={css.background}>
            <div className={css.authWrapper}>
                <div className={css.mainText}>Добро пожаловать!</div>
                <ErrorMessageReg isReg={isReg}/>
                <div className={css.inputWrapper}>
                    <form>
                        <input ref={login} placeholder='Логин'/>
                        <input ref={password} autoComplete='on' type='password' name="password" placeholder='Пароль'/>
                        <input ref={passwordRepeat} autoComplete='on' type='password' name="password" placeholder='Ещё раз'/>
                    </form>
                </div>
                <button onClick={creatUserAcc}><div>СОЗДАТЬ АККАУНТ</div></button>
                <Link to={'/'}><button className={css.blue}><div>НАЗАД</div></button></Link>
            </div>
        </div>
    )
}

export default RegPage