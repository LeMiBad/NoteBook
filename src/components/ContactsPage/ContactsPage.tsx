import ContactInfo from '../ContactInfo/ContactInfo'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import CreateContact from '../CreateContact/CreateContact'
import ContactCard from './ContactCard'
import css from './ContactsPage.module.sass'

const ContactsPage = () => {

    const dispatch = useAppDispatch()
    const {unAuth, changeContactInfoState, filterCurrentUserData} = userSlice.actions
    const {isAuth, currentUserData, contactInfoState} = useAppSelector(state => state.userReducer)

    const returnContactInfo = () => {
        if(contactInfoState === 0) return (
            <div className={css.wrapper}>
                <div>Выберите контакт</div>
            </div>
        )
        if(contactInfoState === 1) return <CreateContact/>
        if(contactInfoState === 2) return <ContactInfo/>
    }

    if(isAuth === false) return <Navigate to={'/'}/>
    return (
        <div className={css.background}>
            <div className={css.contactsPageWrapper}>
                <div className={css.contacts}>
                    <div className={css.inputWrapper}>
                        <input onBlur={(e) => {e.target.value = ''; dispatch(filterCurrentUserData(''))}} 
                        onChange={(e) => {dispatch(filterCurrentUserData(e.target.value))}} placeholder='Поиск'/>
                    </div>
                    <div className={css.buttonWrapper}>
                        <button onClick={() => {dispatch(unAuth())}}>Выйти</button>
                        <button onClick={() => {dispatch(changeContactInfoState(1))}}>Добавить</button>
                    </div>
                    <div className={css.contactsItemWrapper}>
                        {currentUserData.contacts.map(((item, index) => <ContactCard key={index} id={item.id -1} style={css.contact} name={item.name} job={item.job} img={item.img}/>))}
                    </div>
                </div>
                <div className={css.contactsInfo}>
                    {returnContactInfo()}
                </div>
            </div>
        </div>
    )
}

export default ContactsPage