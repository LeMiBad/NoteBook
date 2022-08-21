// import ContactInfo from '../ContactInfo/ContactInfo'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import CreateContact from '../CreateContact/CreateContact'
import ContactCard from './ContactCard'
import css from './ContactsPage.module.sass'

const ContactsPage = () => {

    const dispatch = useAppDispatch()
    const {UnAuth} = userSlice.actions
    const {isAuth, currentUserData} = useAppSelector(state => state.userReducer)


    if(isAuth === false) return <Navigate to={'/'}/>
    return (
        <div className={css.background}>
            <div className={css.contactsPageWrapper}>
                <div className={css.contacts}>
                    <div className={css.inputWrapper}>
                        <input placeholder='Поиск'/>
                    </div>
                    <div className={css.buttonWrapper}>
                        <button onClick={() => {dispatch(UnAuth())}}>Выйти</button>
                        <button>Добавить</button>
                    </div>
                    <div className={css.contactsItemWrapper}>
                        {currentUserData.contacts?.map(((item, index) => <ContactCard key={index} id={index} style={css.contact} name={`${item.name} (${item.job})`} img={item.img}/>))}
                    </div>
                </div>
                <div className={css.contactsInfo}>
                    <CreateContact/>
                    {/* <ContactInfo/> */}
                </div>
            </div>
        </div>
    )
}

export default ContactsPage