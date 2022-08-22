export interface UserAuth {
    id: number
    login: string
    password: string
}

interface Contact {
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
}

export interface UserData {
    contacts?: Array<Contact>
    id: number
}

