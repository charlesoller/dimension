import { useState } from "react"
import styles from "./EditUserForm.module.css"
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { logoutThunk } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

export default function EditUserForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal() as any;
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.inputGroup}>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.inputGroup}>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <ButtonGroup
        primaryButtonText="Submit"
        primaryButtonOnClick={handleSubmit}
        secondaryButtonText="Close"
        secondaryButtonOnClick={closeModal}
        tertiaryButtonText="Logout"
        tertiaryButtonOnClick={() => dispatch(logoutThunk() as any)}
      />
    </form>
  )
}