import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./CreateContent.module.css";
import { supabase } from "../../../supabaseClient";
import CryptoJS from "crypto-js";
import { getUserID, titleToSlug } from "../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => navigate("/dashboard");

  const saveNote = async (userID) => {
    try {
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const encryptedContent = CryptoJS.AES.encrypt(content, secretKey).toString();

      const slug = await titleToSlug(title);

      const { error } = await supabase
        .from("notes")
        .insert({
          title,
          content: encryptedContent,
          slug,
          user: userID
        })
        .single();

      if (error) throw error;

      // Show success toast
      toast.success("Note saved successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save note. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = await getUserID();
    if (userID) {
      await saveNote(userID);
    } else {
      console.error("User not authenticated");
      toast.error("User not authenticated!");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdCancel className={styles.cancelIcon} onClick={handleCancel} />
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          type="text"
          name="title"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)} required
        />
        <label htmlFor="content" className={styles.label}>Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className={styles.editor}
        />
        <button type="submit" className={styles.button}>SAVE</button>
      </form>
    </div>
  );
}
