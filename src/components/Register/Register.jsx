import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.css";
import { supabase } from "../../../supabaseClient";
import { toast } from 'react-toastify';

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUp();
    };

    const handleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        fullName,
                    },
                },
            });
            if (error) throw error;

            toast.success("Account created successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>New here? <br /> Register Now!</h3>
                <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className={styles.input}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required autoComplete="off"
                />

                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required autoComplete="off"
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={7}
                />

                <button type="submit" className={styles.button}>REGISTER</button>
                <p className={styles.registerText}>
                    Already have an account?{" "}
                    <Link to="/login" className={styles.link}>Login</Link>
                </p>
            </form>
        </div>
    );
}
