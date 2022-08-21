import css from './AuthPage.module.sass'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector} from '../../hooks/redux'
import {MutableRefObject, useEffect, useRef } from 'react'
import { userSlice } from '../../store/reducers/UserSlice'
import axios from 'axios'
import ErrorMessage from './ErrorMessage'

const AuthPage = () => {
    const {isAuth, currentUserId} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {setUserAuthData, setCurrentUserData, AuthCheck} = userSlice.actions

    const login = useRef() as MutableRefObject<HTMLInputElement>
    const password = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        axios.get('http://localhost:3000/usersAuthData')
        .then(data => dispatch(setUserAuthData(data.data)))
    }, [dispatch, isAuth, setUserAuthData])

    const setUserAuth = () => {
        const log = login.current.value,
            pass = password.current.value
        dispatch(AuthCheck([log, pass]))
    }

    if(isAuth === true) {
        axios.get(`http://localhost:3000/users/${currentUserId}`)
        .then(res => dispatch(setCurrentUserData(res.data)))
        return <Navigate to={'/contacts'}/>
    }
    return (
        <div className={css.background}>
            <div className={css.authWrapper}>
                <div className={css.mainText}>Member Login</div>
                <ErrorMessage isAuth={isAuth}/>
                <div className={css.inputWrapper}>
                    <form>
                        <input ref={login} placeholder='Login'/>
                        <input ref={password} type='password' autoComplete='on' name="password" placeholder='Password'/>
                    </form>
                </div>
                <button onClick={setUserAuth}><div>LOGIN</div></button>
            </div>
        </div>
    )
}

export default AuthPage