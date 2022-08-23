import css from './AuthPage.module.sass'
import { Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector} from '../../hooks/redux'
import {MutableRefObject, useEffect, useRef } from 'react'
import { userSlice } from '../../store/reducers/UserSlice'
import axios from 'axios'
import ErrorMessageAuth from './ErrorMessageAuth'

const AuthPage = () => {
    const {isAuth, currentUserId} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {setUserAuthData, resetIsReg, setCurrentUserData, authCheck} = userSlice.actions

    const login = useRef() as MutableRefObject<HTMLInputElement>
    const password = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        axios.get('http://localhost:3000/usersAuthData')
        .then(data => dispatch(setUserAuthData(data.data)))
    }, [dispatch, isAuth, setUserAuthData])

    useEffect(() => {
        dispatch(resetIsReg())
    })

    const setUserAuth = () => dispatch(authCheck([login.current.value, password.current.value]))

    if(isAuth === true) {
        axios.get(`http://localhost:3000/users/${currentUserId}`)
        .then(res => dispatch(setCurrentUserData(res.data)))
        return <Navigate to={'/contacts'}/>
    }

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
                <button onClick={setUserAuth}><div>ВОЙТИ</div></button>
                <Link to={'/reg'}><button className={css.blue}><div>ЗАРЕГИСТРИРОВАТЬСЯ</div></button></Link>
            </div>
        </div>
    )
}


export default AuthPage