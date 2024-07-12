import styles from "./Dropzone.module.css"

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneComponent {
  handleFileUpload: (file: File) => void;
  children: React.ReactElement;
  noClick?: boolean;
}

export default function Dropzone({ handleFileUpload, children, noClick = false }: DropzoneComponent) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    handleFileUpload(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          children
      }
    </div>
  )
}