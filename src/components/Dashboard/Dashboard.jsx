import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { supabase } from "../../../supabaseClient";
import { useEffect, useState } from 'react';
import logo from "../../Images/Logo.png"

export default function Dashboard() {
    const navigate = useNavigate();
    const [token, setToken] = useState(false);
    const [notes, setNotes] = useState([]); 

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        sessionStorage.removeItem("token");
        if (error) return alert("Encountered an error ⚡️");
        navigate("/");
    };

    useEffect(() => {
        const fetchSession = () => {
            const session = sessionStorage.getItem("token");
            if (session) {
                setToken(true);
                const userDetails = JSON.parse(session);
                fetchNotes(userDetails.user.id); 
            } else {
                navigate("/notAuthenticated"); 
            }
        };
        fetchSession();
    }, [navigate]); 

    // Fetch user's notes from Supabase
    async function fetchNotes(userId) {
        try {
            const { data, error } = await supabase
                .from("notes")
                .select()
                .eq("user", userId);
            if (error) throw error;
            setNotes(data); 
        } catch (error) {
            alert(error);
        }
    }

    // Ensure we don't render component content if redirecting
    if (!token) return null;

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <Link to='/dashboard' className={styles.title}>
                    <img src={logo} alt="" />
                </Link>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Log out
                </button>
            </nav>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>Your Notes</h2>
                    <Link to='/create' className={styles.addNoteButton}>
                        Add Note
                    </Link>
                </header>
                <div className={styles.notesContainer}>
                    {notes.length > 0 ? (
                        notes.map(note => (
                            <div className={styles.note} key={note.id}>
                                <Link to={`/notes/${note.slug}`} >
                                    <h3 className={styles.noteTitle}>{note.title}</h3>
                                    <p className={styles.noteDate}>Created on {new Date(note.created_at).toLocaleDateString()}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No notes available</p>
                    )}
                </div>
            </main>
        </div>
    );
}
