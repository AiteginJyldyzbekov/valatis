import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import styles from "./Header.module.scss"
import PageTitle from "shared/ui/PageTitle/PageTitle";

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitle />

            <div className={styles.switchers__container}>
                <ThemeSwitcher />
            </div>
        </div>
    )
}

export default Header;