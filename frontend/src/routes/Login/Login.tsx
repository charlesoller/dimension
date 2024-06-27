// @ts-nocheck

import styles from "./Login.module.css"
// Util
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../utils/csrf";
const URL = "http://localhost:8000/api"
// Components

// Types

export default function Login(){
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const res = await csrfFetch(`${URL}/auth`, {
      method: "POST",
      body: JSON.stringify({
        credential, 
        password
      })
    }).then(res => res.json())
    if (res.user) navigate('/')
    // return dispatch(sessionActions.login({ credential, password }))
    //   .then(res => {
    //     if(!res.ok){
    //       setErrors({ credential: "The provided credentials were invalid." });
    //     } else {
    //       closeModal()
    //     }
    //   })
  };

  // const handleDemoLogin = (e) => {
  //   e.preventDefault();
  //   return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
  //     .then(closeModal)
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data) {
  //         setErrors({ credential: "Sorry, something went wrong. Please try again." });
  //       }
  //     });
  // }

  return (
    <div className={styles.main}>
      <h1>Log In</h1>
      { errors.credential && (
          <p className={styles.error}>{errors.credential}</p>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.input_group}>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.input_group}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button} disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>

      {/* <button className={styles.demo} onClick={handleDemoLogin}>Demo User</button> */}
    </div>
  )
}
