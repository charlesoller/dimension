import Button from "../Button/Button"
import styles from "./ModalContent.module.css"

export interface ModalContentProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactElement;
  width?: number;
}

export default function ModalContent({
  title, subtitle, children, width
}: ModalContentProps) {
  return (
    <div className={styles.content}
      style={{
        width: width ? width : undefined
      }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <h4 className={styles.subtitle}>
          {subtitle}
        </h4>
      </div>
      {children}
    </div>
  )
}