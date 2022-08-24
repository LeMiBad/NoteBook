import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { UserAuth, UserState, UserData, Contact } from "../../types/IUser"

const initialState: UserState = {
    usersAuthData: [],
    isAuth: false,
    isReg: false,
    currentUserData: {id: 0, contacts: []},
    currentUserDataSave: {id: 0, contacts: []},
    currentUserId: 0,
    contactInfoState: 0,
    currentPickedContact: 0
}

export const userSlice = createSlice({
    name: 'userSlice',
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
            state.currentUserDataSave = state.currentUserData
        },
        setCurrentPickedContact(state, action) {
            state.currentPickedContact = action.payload+1
        },
        filterCurrentUserData(state, action) {
            let newArr: Array<Contact> = []
            state.currentUserData.contacts?.forEach((item) => {
                if(item.name.toLowerCase().includes(action.payload) === true) newArr.push(item)
            })
            state.currentUserData.contacts = newArr
            if(action.payload === ''){state.currentUserData = state.currentUserDataSave}
        },
        unAuth(state){
            state.isAuth = false
            state.contactInfoState = 0
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
            state.currentUserData = state.currentUserDataSave
            action.payload.id += 1
            state.currentUserData.contacts?.push(action.payload)
            state.currentUserData.contacts?.forEach((item, index) => item.id = index+1)
            axios.put(`http://localhost:3000/users/${state.currentUserId}`, state.currentUserData)
            state.contactInfoState = 0
        },
        deleteContact(state, action){
            state.currentUserData = state.currentUserDataSave
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