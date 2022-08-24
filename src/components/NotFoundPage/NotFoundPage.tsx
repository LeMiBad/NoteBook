import { Navigate } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Navigate to={'/'}></Navigate>
    )
}

export default NotFoundPage