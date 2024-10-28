/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";
import { supabase } from "../../../supabaseClient";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      sessionStorage.setItem("token", JSON.stringify(data));

      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Sign in back here!</h3>
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
        />

        <button type="submit" className={styles.button}>Log In</button>
        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>Register</Link>
        </p>
      </form>
    </div>
  );
}
