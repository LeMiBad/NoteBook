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
        resetIsReg(state) {
            state.isReg = false
        },
        setCurrentUserData(state, action: PayloadAction<UserData>) {
            state.currentUserData = action.payload
        },
        unAuth(state){
            state.isAuth = false
        },
        changeContactInfoState(state, action) {
            state.contactInfoState = action.payload
        },
        authCheck(state, action: PayloadAction<Array<string>>) {
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
                if(action.payload[0] === '' && action.payload[1] === '') {
                    state.isAuth = false
                    break
                }
                if(item.login !== action.payload[0]) {
                    state.isAuth = [0, 1]
                }
            }
        },
        createContact(state, action) {
            action.payload.id += 1
            state.currentUserData.contacts?.push(action.payload)
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
            state.contactInfoState = 0
        },
        deleteContact(state, action){
            const newState = state.currentUserData.contacts?.filter( item => item.id !== action.payload )
            state.currentUserData.contacts = newState
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
        },
        createAccount(state, action){
            let isHave = 0
            state.usersAuthData.forEach((item) => {
                if(item.login === action.payload[0]) isHave = 1
            })

            if(isHave === 1) state.isReg = [2]
            if(isHave === 0 && action.payload[1] !== action.payload[2]) state.isReg = [4]
            if(action.payload[0] === '' || action.payload[1] === '' || action.payload[2] === '') state.isReg = [3]
            if(action.payload[0] === '' && action.payload[1] === '' && action.payload[2] === '') state.isReg = false

            if(action.payload[1] === action.payload[2] && isHave === 0 && action.payload[2] !== ''){
                axios.post(`http://localhost:3000/usersAuthData`, {id: (state.usersAuthData.length + 1), login: action.payload[0], password: action.payload[1]})
                axios.post(`http://localhost:3000/users`, {id: (state.usersAuthData.length + 1), contacts: []})
                state.isReg = true
            }
        },
    }
})

export default userSlice.reducer