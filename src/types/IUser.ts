export interface UserData {
    contacts: Array<Contact>
    id: number
}

export interface UserAuth {
    id: number
    login: string
    password: string
}

export interface ContactCardProps {
    id: number
    style: string
    name: string
    img: string
    job: string
}


export interface Contact {
    id: number
    img: string
    name: string
    surname: string
    fatherName: string
    mail: string
    phone: string
    status: string
    job: string
    jobPlace: string
    vk: string
    tg: string
    git: string
}

export interface UserState {
    usersAuthData: Array<UserAuth>
    isAuth: boolean | Array<number>
    isReg: boolean | Array<number>
    currentUserData: UserData
    currentUserDataSave: UserData
    currentUserId: number
    contactInfoState: number
    currentPickedContact: number
}