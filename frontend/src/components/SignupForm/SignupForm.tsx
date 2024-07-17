import classNames from "classnames"
import styles from "./SignupForm.module.css"
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_PIC_PLACEHOLDER } from "../../utils/constants";
import Dropzone from "../Dropzone/Dropzone";
import Button from "../Button/Button";
import { BarLoader } from "react-spinners";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { uploadFile } from "../../utils/clients/supabase";
import { loginThunk } from "../../store/session";
import { UserLogin } from "../../utils/types";
import { createUserThunk } from "../../store/users";

const isValidEmail = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

export default function SignupForm() {
  const dispatch = useDispatch();

  const { closeModal } = useModal() as any;

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (uploadedFile: File) => {
    setLoading(true);
    setError("");
    console.log("error: ", error)
    const { success, data } = await uploadFile(uploadedFile, 'profile_pictures');
    if (!success) {
      setError("Error with uploading this image. Please try a different photo.")
      return { success, data };
    }

    setProfilePicture(data);
    setLoading(false);
    setHasUploaded(true);
  }

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ credential: 'charles@dimension.com', password: 'password1' }) as any);
    closeModal();
  }

  const uploadText = () => {
    if (loading) return "Loading";
    if (hasUploaded) return "Done";
    return "Waiting"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, username, email, password, profilePicture };
    const { data: res, success } = await dispatch(createUserThunk(data) as any);

    if (!success) {
      setError(res);
      setLoading(false);
    } else {
      setLoading(false);
      closeModal();
      window.location.href = `/`
    }
  }

  const isDisabled = () => (
    loading || !username.length || !email.length || !name.length || password.length < 6
    || !isValidEmail(email)
  )

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.top}>
        <Dropzone
          handleFileUpload={handleFileUpload}
          variant="image"
        >
          <div className={styles.dropzoneContent}>
            <img
              src={profilePicture || PROFILE_PIC_PLACEHOLDER}
              className={styles.profilePicture}
            />
          </div>
        </Dropzone>
      </div>
      <div className={styles.uploadInfo}>
        <div className={styles.uploadButton}>
          <Dropzone
            handleFileUpload={handleFileUpload}
            variant="image"
          >
            <Button type="button">
              Upload
            </Button>
          </Dropzone>
        </div>
        <div className={styles.loader}>
          {loading ? (
            <BarLoader
              width={"100%"}
              height={6}
              color={"#D4D4D8"}
              speedMultiplier={0.8}
            />
          ) : (
            <div className={classNames({
              [styles.loadingPlaceholder]: true,
              [styles.success]: hasUploaded
            })} />
          )}
        </div>
        <p className={classNames({
          [styles.uploadText]: true,
          [styles.success]: hasUploaded
        })}>{uploadText()}</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form}>
        <label className={styles.inputGroup}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.inputGroup}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.inputGroup}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.inputGroup}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
      </form>
      <div className={styles.buttons}>
        <Button
          variant="link"
          onClick={(e) => handleDemoLogin(e)}
          type="button"
        >
          Demo
        </Button>
        <ButtonGroup
          primaryButtonText="Submit"
          primaryButtonOnClick={handleSubmit}
          secondaryButtonText="Close"
          secondaryButtonOnClick={closeModal}
          disabled={isDisabled()}
        />
      </div>

    </form>
  )
}