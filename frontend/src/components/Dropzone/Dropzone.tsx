import styles from "./Dropzone.module.css"

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneComponent {
  handleFileUpload: (file: File) => void;
}

export default function Dropzone({ handleFileUpload }: DropzoneComponent) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    handleFileUpload(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}