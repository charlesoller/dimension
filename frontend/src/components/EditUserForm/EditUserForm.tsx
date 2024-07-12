import { useEffect, useState } from "react"
import styles from "./EditUserForm.module.css"
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { logoutThunk } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { PROFILE_PIC_PLACEHOLDER } from "../../utils/constants";
import Dropzone from "../Dropzone/Dropzone";
import classNames from "classnames";
import { BarLoader } from "react-spinners";
import Button from "../Button/Button";
import { GoUpload } from "react-icons/go";
import { uploadFile } from "../../utils/clients/supabase";
import { editUserThunk } from "../../store/users";
import { loadAllPostsThunk } from "../../store/posts";

export default function EditUserForm() {
  const currentUser = useSelector((state: any) => state.session.user);
  const dispatch = useDispatch();

  const { closeModal } = useModal() as any;

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUsername(currentUser.username);
      setProfilePicture(currentUser.profilePicture?.url)
    }
  }, [currentUser])

  const handleFileUpload = async (uploadedFile: File) => {
    setLoading(true);
    const { success, data } = await uploadFile(uploadedFile, 'profile_pictures');
    if (!success) {
      console.log({ success, data })
      return { success, data };
    }

    setProfilePicture(data);
    setLoading(false);
    setHasUploaded(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, username, profilePicture };
    const { data: res, success } = await dispatch(editUserThunk(currentUser.id, data) as any);
    dispatch(loadAllPostsThunk() as any);

    if (!success) {
      setError(res);
      setLoading(false);
    } else {
      setLoading(false);
      closeModal();
      window.location.href = `/${username}`
    }
  }

  const uploadText = () => {
    if (loading) return "Loading";
    if (hasUploaded) return "Done";
    return "Waiting"
  }

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
        <form className={styles.form}>
          <label className={styles.inputGroup}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.inputGroup}>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>
        </form>
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
      <p className={styles.error}>{error}</p>
      <ButtonGroup
        primaryButtonText="Submit"
        primaryButtonOnClick={handleSubmit}
        secondaryButtonText="Close"
        secondaryButtonOnClick={closeModal}
        disabled={loading}
      />
    </form>
  )
}