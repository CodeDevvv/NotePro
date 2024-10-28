import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                Welcome to <span>NotePro!</span> 
            </h2>
            <div className={styles.contentWrapper}>
                <p className={styles.text}>
                    Say goodbye to scattered notes and hello to a more organized life.
                </p>
                <p className={styles.text}>
                    NotePro offers a versatile platform for all your note-taking needs,
                    helping you stay focused and in control.
                </p>
            </div>
            <button
                onClick={() => navigate("/login")}
                className={styles.button}
            >
                SIGN IN
            </button>
        </div>
    );
}
