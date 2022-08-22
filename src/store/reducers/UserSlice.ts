import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { UserAuth, UserData } from "../../types/IUser"

interface UserState {
    usersAuthData: Array<UserAuth>
    isAuth: boolean | Array<number>
    isReg: boolean | Array<number>
    currentUserData: UserData
    currentUserId: number
    contactInfoState: number
}

const initialState: UserState = {
    usersAuthData: [],
    isAuth: false,
    isReg: false,
    currentUserData: {id: 0},
    currentUserId: 0,
    contactInfoState: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserAuthData(state, action: PayloadAction<Array<UserAuth>>) {
            state.usersAuthData = action.payload
        },
        setCurrentUserData(state, action: PayloadAction<UserData>) {
            state.currentUserData = action.payload
        },
        UnAuth(state){
            state.isAuth = false
        },
        ChangeContactInfoState(state, action) {
            state.contactInfoState = action.payload
        },
        AuthCheck(state, action: PayloadAction<Array<string>>) {
            for(let i = 0; i < state.usersAuthData.length; i++){
                const item = state.usersAuthData[i]
                if(item.login === action.payload[0] && item.password === action.payload[1]) {
                    state.isAuth = true
                    state.currentUserId = item.id
                    break
                }
                if(item.login === action.payload[0] && item.password !== action.payload[1]) {
                    state.isAuth = [1, 0]
                    break
                }
                if(item.login !== action.payload[0] && item.password === action.payload[1]) {
                    state.isAuth = [0, 1]
                    break
                }
                state.isAuth = [0, 0]
            }
        },
        CreateContact(state, action) {
            action.payload.id += 1
            state.currentUserData.contacts?.push(action.payload)
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
            state.contactInfoState = 0
        },
        DeleteContact(state, action){
            const newState = state.currentUserData.contacts?.filter( item => item.id !== action.payload )
            state.currentUserData.contacts = newState
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
        },
        CreateAccount(state, action){
            let isHave = 0
            state.usersAuthData.forEach((item) => {
                if(item.login === action.payload[0]) isHave = 1
            })

            if(isHave === 1) state.isReg = [2]
            if(isHave === 0 && action.payload[1] !== action.payload[2]) state.isReg = [4]
            if(action.payload[0] === '' || action.payload[1] === '' || action.payload[2] === '') state.isReg = [3]

            if(action.payload[1] === action.payload[2] && isHave === 0){
                console.log('РЕГИСТРАЦИЯ ПРОШЛА')
                axios.post(`http://localhost:3000/usersAuthData`, {id: (state.usersAuthData.length + 1), login: action.payload[0], password: action.payload[1]})
                axios.post(`http://localhost:3000/users`, {id: (state.usersAuthData.length + 1), contacts: []})
            }
        },
    }
})

export default userSlice.reducer