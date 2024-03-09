import { classNames } from "shared/lib/classNames/classNames"
import styles from "./ErrorPage.module.scss"

interface ErrorPageProps {
    className?: string
}

const ErrorPage = ({ className }: ErrorPageProps) => {

    const reloadPage = () => {
        location.reload()
    }


    return (
        <div className={classNames(styles.ErrorPage, {}, [className])}>
            <p>Something went wrong</p>
            <button onClick={reloadPage}>Reload page</button>
        </div>
    )
}

export default ErrorPage;