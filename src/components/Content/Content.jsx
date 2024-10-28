import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { supabase } from "../../../supabaseClient";
import CryptoJS from "crypto-js";
import { getUserID } from "../utils/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from 'react-toastify';
import logo from "../../Images/Logo.png"


export default function Content() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteID, setNoteID] = useState(null);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("slug", slug)
        .single();
      if (error) throw error;

      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const decryptedContent = CryptoJS.AES.decrypt(data.content, secretKey).toString(CryptoJS.enc.Utf8);

      setData(data);
      setNoteTitle(data.title);
      setNoteContent(decryptedContent);
      setNoteID(data.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUserSession = async () => {
      const userID = await getUserID();
      if (userID) fetchData();
    };
    fetchUserSession();
  }, [slug]);

  const updateNoteData = async (e) => {
    e.preventDefault();

    try {
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const encryptedContent = CryptoJS.AES.encrypt(noteContent, secretKey).toString();

      const { error } = await supabase
        .from("notes")
        .update({
          title: noteTitle,
          content: encryptedContent,
        })
        .eq("id", noteID);

      if (error) {
        console.error("Error updating note:", error);
        toast.error("Failed to update note. Please try again.");
        return;
      }

      toast.success("Updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error in updateNoteData:", err);
      toast.error("Error updating note.");
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", noteID);
      if (error) throw error;
      toast.success("Note deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting note.");
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to='/dashboard' className={styles.title}>
          <img src={logo} alt="" />
        </Link>
        <div className={styles.buttons}>
          <button onClick={updateNoteData} className={styles.updateButton}>
            Update Note
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete Note
          </button>
        </div>
      </nav>
      <main className={styles.main}>
        <input
          type="text"
          className={styles.titleInput}
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Title"
        />
        <p className={styles.createdDate}>Created on {data?.created_at || "Loading..."}</p>
        <ReactQuill
          theme="snow"
          value={noteContent}
          onChange={setNoteContent}
          className={styles.editor}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              ['clean']
            ],
          }}
        />
      </main>
    </div>
  );
}
