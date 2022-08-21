import css from './NotFoundPage.module.sass'

const NotFoundPage = () => {
    return (
        <div className={css.background}>
            <div className={css.authWrapper}>
                <div className={css.mainText}>Member Login</div>
                <div className={css.errorBlock}>
                    <div className={css.errorName}>Ошибка</div>
                    <div className={css.errorText}>Неправильно введён пароль</div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage