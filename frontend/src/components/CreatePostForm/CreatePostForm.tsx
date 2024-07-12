import styles from "./CreatePostForm.module.css";
import Dropzone from "../Dropzone/Dropzone";
import { useRef, useState } from "react";
import { createPost } from "../../utils/api";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../store/posts";
import { uploadFile } from "../../utils/clients/supabase";
import { useModal } from "../../context/Modal";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Viewport from "../Viewport/Viewport";
import { BarLoader } from "react-spinners";
import Button from "../Button/Button";
import classNames from "classnames";
import { nanoid } from "nanoid"

export default function CreatePostForm() {
  const { closeModal } = useModal() as any;
  const dispatch = useDispatch();

  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = async (uploadedFile: File) => {
    setLoading(true);
    const { success, data } = await uploadFile(uploadedFile, 'models');
    if (!success) {
      console.log({ success, data })
      return { success, data };
    }

    setUrl(data);
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // const { success, data } = await uploadFile(file);
    // if (!success) {
    //   console.log({success, data})
    //   return { success, data };
    // }

    dispatch(createPostThunk({ description, url }) as any);
    closeModal();
    setLoading(false);
  }

  const uploadText = () => {
    if (loading) return "Uploading";
    if (url.length) return "Done";
    return "Waiting"
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Dropzone
        handleFileUpload={handleFileUpload}
        variant="3D"
        noClick
      >
        <div className={styles.viewport}>
          <Viewport src={url} grid />
        </div>
      </Dropzone>
      <div className={styles.uploadInfo}>
        <div className={styles.uploadButton}>
          <Dropzone
            handleFileUpload={handleFileUpload}
            variant="3D"
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
              [styles.success]: !!url.length && !loading
            })} />
          )}
        </div>
        <p className={classNames({
          [styles.uploadText]: true,
          [styles.success]: !!url.length && !loading
        })}>{uploadText()}</p>
      </div>
      {/* {loading ? <BarLoader /> : null} */}
      {/* { loading ? url : null } */}
      <div>
        <label
          htmlFor="post-description"
          className={styles.label}
        >
          Description
        </label>
        <textarea
          id="post-description"
          name="post-description"
          className={styles.textInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={5}
        />
      </div>
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