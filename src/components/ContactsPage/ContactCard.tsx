import { useRef, MutableRefObject, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import css from './ContactsPage.module.sass'

interface ContactCardProps {
    id: number
    style: string
    name: string
    img: string
    job: string
}

const ContactCard = ({id, style, name, job, img}: ContactCardProps) => {
    const returnImg = (img: string, name: string) => {
        if(img === '') return <div className={css.icon}>{name[0]}</div>
        return <img src={img} alt="" />
    }

    const returnShortName = () => {
        if(name === '') name = 'Безимянный'
        if(job === '') return name
        return `${name} (${job})`   
    }

    const dispatch = useAppDispatch()
    const {deleteContact} = userSlice.actions

    const [cardMargin, setCardMargin] = useState(0)
    const card = useRef() as MutableRefObject<HTMLDivElement>

    
    const checkDivClick = (downEvent: React.MouseEvent<HTMLDivElement>) => {
        const mouseMoveChecker = (e: MouseEvent) => setCardMargin(downEvent.clientX - e.clientX)

        window.addEventListener('mousemove', mouseMoveChecker)
        window.addEventListener('mouseup', () => {
            setCardMargin(0)
            window.removeEventListener('mousemove', mouseMoveChecker)
        })
    }

    const returnBackGround = () => {
        const blackColor = ((cardMargin - 50) >= 99)? 99 : cardMargin - 50 
        if(blackColor < 0 && blackColor < -50) return 'rgba(255, 255, 255, 0.6)'
        if(blackColor === -50) return 
        return `linear-gradient(250deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.${blackColor/10}) 100%)`
    }

    return (
        <div onMouseUp={() => {if(cardMargin >= 150) dispatch(deleteContact(id+1))}} onMouseDown={e => checkDivClick(e)} ref={card} style={{marginLeft: `-${cardMargin}px`, background: returnBackGround()}} className={style}>
            {returnImg(img, name)}
            <div>{returnShortName()}</div>
            <div></div>
        </div>
    )
}

export default ContactCard