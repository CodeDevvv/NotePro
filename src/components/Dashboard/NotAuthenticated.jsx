import styles from '../Home/home.module.css'
import { useNavigate } from 'react-router-dom';

const NotAuthenticated = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                UnAuthorized Access!
            </h2>
            <div className={styles.contentWrapper}>
                <p className={styles.text}>
                    Please Sign in to Authorize access.
                </p>
            </div>
            <button
                onClick={() => navigate("/login")}
                className={styles.button}
            >
                SIGN IN
            </button>
        </div>
    )
}

export default NotAuthenticated
