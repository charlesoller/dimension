import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css"
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { loginThunk } from "../../store/session";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import SignupForm from "../SignupForm/SignupForm";
import ModalContent from "../ModalContent/ModalContent";
import Button from "../Button/Button";

export default function LoginForm() {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { closeModal, setModalContent } = useModal() as any;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = await dispatch(loginThunk({ credential, password }) as any)
    if (data.success === false) {
      setError("Unable to login. Please provide valid credentials.")
    } else {
      closeModal()
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ credential: 'charles@dimension.com', password: 'password1' }) as any);
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.center}>
        <Button variant="link" onClick={handleDemoLogin}>Demo Login</Button>
      </div>
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
      <p className={styles.error}>{ error }</p>
      <div className={styles.buttons}>
        <ButtonGroup
          primaryButtonText="Submit"
          primaryButtonOnClick={handleSubmit}
          secondaryButtonText="Close"
          secondaryButtonOnClick={closeModal}
          tertiaryButtonText="Sign Up"
          tertiaryButtonOnClick={() => setModalContent(
            <ModalContent
              title="Create Your Account"
              subtitle="Start sharing your 3D content"
            >
              <SignupForm />
            </ModalContent>
        )}
        />
      </div>
    </form>
  )
}