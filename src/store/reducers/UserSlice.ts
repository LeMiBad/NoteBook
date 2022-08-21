import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { UserAuth, UserData } from "../../types/IUser"

interface UserState {
    usersAuthData: Array<UserAuth>
    isAuth: boolean | Array<number>
    currentUserData: UserData
    currentUserId: number
}

const initialState: UserState = {
    usersAuthData: [],
    isAuth: false,
    currentUserData: {id: 0},
    currentUserId: 0
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
        },
        DeleteContact(state, action){
            const newState = state.currentUserData.contacts?.filter( item => item.id !== action.payload )
            state.currentUserData.contacts = newState
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
        }
    }
})

export default userSlice.reducer