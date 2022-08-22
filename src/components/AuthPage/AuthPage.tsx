import css from './AuthPage.module.sass'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector} from '../../hooks/redux'
import {MutableRefObject, useEffect, useRef, useState } from 'react'
import { userSlice } from '../../store/reducers/UserSlice'
import axios from 'axios'
import ErrorMessageAuth from './ErrorMessageAuth'
import ErrorMessageReg from './ErrorMessageReg'

const AuthPage = () => {
    const {isAuth, isReg, currentUserId} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {setUserAuthData, setCurrentUserData, AuthCheck, CreateAccount} = userSlice.actions

    const [regLink, setRegLink] = useState(0)

    const login = useRef() as MutableRefObject<HTMLInputElement>
    const password = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRepeat = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        axios.get('http://localhost:3000/usersAuthData')
        .then(data => dispatch(setUserAuthData(data.data)))
    }, [dispatch, isAuth, setUserAuthData])

    const setUserAuth = () => {
        const log = login.current.value,
            pass = password.current.value
        dispatch(AuthCheck([log, pass]))
    }

    const creatUserAcc = () => {
        const log = login.current.value,
            pass = password.current.value,
            passAgain = passwordRepeat.current.value
        dispatch(CreateAccount([log, pass, passAgain]))
        dispatch(AuthCheck([log, pass]))
    }

    if(isAuth === true || isReg === true) {
        axios.get(`http://localhost:3000/users/${currentUserId}`)
        .then(res => dispatch(setCurrentUserData(res.data)))
        return <Navigate to={'/contacts'}/>
    }

    if(regLink === 1) return (
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
                <button onClick={creatUserAcc}><div>ACCEPT</div></button>
                <button onClick={() => setRegLink(0)} className={css.blue}><div>BACK</div></button>
            </div>
        </div>
    )

    return (
        <div className={css.background}>
            <div className={css.authWrapper}>
                <div className={css.mainText}>Войти</div>
                <ErrorMessageAuth isAuth={isAuth}/>
                <div className={css.inputWrapper}>
                    <form>
                        <input ref={login} placeholder='Логин'/>
                        <input ref={password} type='password' autoComplete='on' name="password" placeholder='Пароль'/>
                    </form>
                </div>
                <button onClick={setUserAuth}><div>LOGIN</div></button>
                <button onClick={() => setRegLink(1)} className={css.blue}><div>REGISTER</div></button>
            </div>
        </div>
    )
}

export default AuthPage