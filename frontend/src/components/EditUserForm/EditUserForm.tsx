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

export default function EditUserForm() {
  const currentUser = useSelector((state: any) => state.session.user);
  console.log("User: ", currentUser)
  const dispatch = useDispatch();
  const { closeModal } = useModal() as any;

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUsername(currentUser.username);
      setProfilePicture(currentUser.profilePicture?.url)
    }
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);


    setHasUploaded(true);
    setLoading(false);
  }

  const uploadText = () => {
    if (loading) return "Uploading";
    if (hasUploaded) return "Done";
    return "Waiting"
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.top}>
        <Dropzone
          handleFileUpload={() => console.log("Upload")}
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
            handleFileUpload={() => console.log("Upload")}
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

      <ButtonGroup
        primaryButtonText="Submit"
        primaryButtonOnClick={handleSubmit}
        secondaryButtonText="Close"
        secondaryButtonOnClick={closeModal}
      />
    </form>
  )
}