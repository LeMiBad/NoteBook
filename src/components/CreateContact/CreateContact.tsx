import { useRef, MutableRefObject } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import css from './CreateContact.module.sass'

const CreateContact = () => {

    const {currentUserData} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {CreateContact, ChangeContactInfoState} = userSlice.actions

    const name = useRef() as MutableRefObject<HTMLInputElement>
    const surname = useRef() as MutableRefObject<HTMLInputElement>
    const fatherName = useRef() as MutableRefObject<HTMLInputElement>
    const mail = useRef() as MutableRefObject<HTMLInputElement>
    const phone = useRef() as MutableRefObject<HTMLInputElement>
    const job = useRef() as MutableRefObject<HTMLInputElement>
    const jobPlace = useRef() as MutableRefObject<HTMLInputElement>
    const img = useRef() as MutableRefObject<HTMLInputElement>
    const vk = useRef() as MutableRefObject<HTMLInputElement>
    const tg = useRef() as MutableRefObject<HTMLInputElement>
    const git = useRef() as MutableRefObject<HTMLInputElement>


    const phoneMask = (e: any) => {
        const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
        const subst = "+$1 ($2) $3-$4-$5";
        e.target.value = e.target.value.replace(regex, subst)
    }

    const createContact = () => {
        const newContact = {
            id: currentUserData.contacts?.length,
            name: name.current.value,
            surname: surname.current.value,
            fatherName: fatherName.current.value,
            mail: mail.current.value,
            phone: phone.current.value,
            job: job.current.value,
            jobPlace: jobPlace.current.value,
            img: img.current.value,
            vk: vk.current.value,
            tg: tg.current.value,
            git: git.current.value
        }
        dispatch(CreateContact(newContact))
        console.log(currentUserData)
    }

    return(
        <>
            <div className={css.inputWrapper}>
                <input ref={name} placeholder={'Имя'} />
                <input ref={surname} placeholder='Фамилия' />
                <input ref={fatherName} placeholder='Отчество' />
            </div>
            <div className={css.inputWrapper}>
                <input ref={mail} placeholder='Почта' />
                <input onBlur={phoneMask} ref={phone} placeholder='Номер' />
                <input ref={job} placeholder='Проффесия' />
                <input ref={jobPlace} placeholder='Место работы' />
                <input ref={img} placeholder='Аватарка (ссылка на картинку)' />
            </div>
            <div className={css.inputWrapper}>
                <input ref={vk} placeholder='Вконтакте' />
                <input ref={tg} placeholder='Telegram' />
                <input ref={git} placeholder='GitHub' />
            </div>
            <div className={css.actionButtonWrapper}>
                <button onClick={() => {dispatch(ChangeContactInfoState(0))}}>Отмена</button>
                <button>Добавить поле</button>
                <button onClick={createContact}>Сохранить</button>
            </div>
        </>
    )
}

export default CreateContact