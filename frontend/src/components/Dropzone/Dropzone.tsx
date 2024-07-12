import styles from "./Dropzone.module.css"

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { GoUpload } from "react-icons/go";

interface DropzoneComponent {
  handleFileUpload: (file: File) => void;
  children: React.ReactElement;
  noClick?: boolean;
  variant: '3D' | 'image';
}

const acceptedImageTypes = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg']
}

const accepted3DTypes = {
  'model/gltf-binary': ['.glb'],
  'model/gltf+json': ['.gltf']
}

export default function Dropzone({ handleFileUpload, children, noClick = false, variant }: DropzoneComponent) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    handleFileUpload(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick,
    accept: variant === '3D' ? accepted3DTypes : acceptedImageTypes
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className={styles.activeDrag}>
          <GoUpload className={styles.dragIcon} />
          <div className={styles.activeDragFilter}>
            {children}
          </div>
        </div>
        :
          children
      }
    </div>
  )
}