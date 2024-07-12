import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css"
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { loginThunk } from "../../store/session";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

export default function LoginForm() {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal() as any;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(loginThunk({ credential, password }) as any)
      .then(res => {
        if(!res.ok){
          setErrors({ credential: "The provided credentials were invalid." });
        } else {
          closeModal()
        }
      })
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.inputGroup}>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.inputGroup}>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      <ButtonGroup 
        primaryButtonText="Submit"
        primaryButtonOnClick={handleSubmit}
        secondaryButtonText="Close"
        secondaryButtonOnClick={closeModal}
        tertiaryButtonText="Sign Up"
        tertiaryButtonOnClick={() => console.log("Sign up")}
      />
    </form>
  )
}