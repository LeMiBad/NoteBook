import { useAppSelector } from '../../hooks/redux'
import css from './ContactInfo.module.sass'

const ContactInfo = () => {

    const {currentPickedContact, currentUserData} = useAppSelector(state => state.userReducer)

    let contactData = {name: '',surname: '',fatherName: '',mail: '',phone: '',job: '',jobPlace: '',img: '',vk: '',tg: '',git: ''}
    currentUserData.contacts?.forEach((item, index) => {
        if(index+1 === currentPickedContact) {
            contactData.name = item.name
            contactData.surname = item.surname
            contactData.fatherName = item.fatherName
            contactData.mail = item.mail
            contactData.phone = item.phone
            contactData.job = item.job
            contactData.jobPlace = item.jobPlace
            contactData.img = item.img
            contactData.vk = item.vk
            contactData.tg = item.tg
            contactData.git = item.git
        }   
    })
    
    if(contactData.vk === undefined) contactData.vk = '*' 
    if(contactData.tg === undefined) contactData.tg = '*' 
    if(contactData.git === undefined) contactData.git = '*'
    if(contactData.name === '') contactData.name = 'Безимянный'
    if(contactData.job === '') contactData.job = 'Не указано'
    if(contactData.jobPlace === '') contactData.jobPlace = 'Не указано'
    if(contactData.phone === '') contactData.phone = 'Не указано'
    if(contactData.mail === '') contactData.mail = 'Не указано'

    return (
        <div className={css.wrapper}>
            <div className={css.name}>{contactData.name}</div>
            <div className={css.secondNameWrapper}>
                <div>{contactData.surname}</div>
                <div>{contactData.fatherName}</div>
            </div>
            <div className={css.otherInfoWrapper}>
                <div>По профессии: {contactData.job}</div>
                <div>Работает в: {contactData.jobPlace}</div>
                <div>Телефон: {contactData.phone}</div>
                <div>Почта: {contactData.mail}</div>
                <div className={css.linksWrapper}>
                    <a target='blank' href={`${contactData.vk}`}><div className={css.vk}></div></a>
                    <a target='blank' href={`${contactData.git}`}><div className={css.tg}></div></a>
                    <a target='blank' href={`${contactData.tg}`}><div className={css.git}></div></a>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo