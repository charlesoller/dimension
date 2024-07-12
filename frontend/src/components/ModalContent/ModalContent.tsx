import Button from "../Button/Button"
import styles from "./ModalContent.module.css"

export interface ModalContentProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactElement;
}

export default function ModalContent({
  title, subtitle, children
}: ModalContentProps) {
  return (
    <div className={styles.content}>
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