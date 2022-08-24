import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import css from './CreateContact.module.sass'

const CreateContact = () => {

    const dispatch = useAppDispatch()
    const {createContact, changeContactInfoState} = userSlice.actions
    const [values, setValues] = useState({name: '',surname: '',fatherName: '',mail: '',phone: '',job: '',jobPlace: '',img: '',vk: '',tg: '',git: ''})

    const phoneMask = (e: any) => {
        const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
        const subst = "+$1 ($2) $3-$4-$5";
        e.target.value = e.target.value.replace(regex, subst)
    }

    return(
        <>
            <div className={css.inputWrapper}>
                <input 
                onChange={(e) => {const newValues = values; newValues.name = e.target.value; setValues(newValues)}} 
                placeholder={'Имя'} />
                <input
                onChange={(e) => {const newValues = values; newValues.surname = e.target.value; setValues(newValues)}}
                placeholder='Фамилия' />
                <input
                onChange={(e) => {const newValues = values; newValues.fatherName = e.target.value; setValues(newValues)}}
                placeholder='Отчество' />
            </div>
            <div className={css.inputWrapper}>
                <input
                onChange={(e) => {const newValues = values; newValues.mail = e.target.value; setValues(newValues)}}
                placeholder='Почта' />
                <input
                onChange={(e) => {const newValues = values; newValues.phone = e.target.value; setValues(newValues)}}
                onBlur={phoneMask} placeholder='Номер' />
                <input 
                onChange={(e) => {const newValues = values; newValues.job = e.target.value; setValues(newValues)}}
                placeholder='Проффесия' />
                <input
                onChange={(e) => {const newValues = values; newValues.jobPlace = e.target.value; setValues(newValues)}} 
                placeholder='Место работы' />
                <input
                onChange={(e) => {const newValues = values; newValues.img = e.target.value; setValues(newValues)}}
                placeholder='Аватарка (ссылка на картинку)' />
            </div>
            <div className={css.inputWrapper}>
                <input
                onChange={(e) => {const newValues = values; newValues.vk = e.target.value; setValues(newValues)}}
                placeholder='Вконтакте' />
                <input
                onChange={(e) => {const newValues = values; newValues.tg = e.target.value; setValues(newValues)}}
                placeholder='Telegram' />
                <input
                onChange={(e) => {const newValues = values; newValues.git = e.target.value; setValues(newValues)}}
                placeholder='GitHub' />
            </div>
            <div className={css.actionButtonWrapper}>
                <button onClick={() => {dispatch(changeContactInfoState(0))}}>Отмена</button>
                <button onClick={() => {dispatch(createContact(values))}}>Сохранить</button>
            </div>
        </>
    )
}

export default CreateContact