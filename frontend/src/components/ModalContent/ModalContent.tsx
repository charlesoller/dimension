import Button from "../Button/Button"
import styles from "./ModalContent.module.css"

export interface ModalContentProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: () => void;
  tertiaryButtonText?: string;
  tertiaryButtonOnClick?: () => void;
  children?: React.ReactElement;
}

export default function ModalContent({
  title, subtitle,
  primaryButtonText, primaryButtonOnClick,
  secondaryButtonText, secondaryButtonOnClick,
  tertiaryButtonText, tertiaryButtonOnClick,
  children
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
      <div className={styles.buttons}>
        <>
          {
            tertiaryButtonText && (
              <Button
                onClick={tertiaryButtonOnClick}
                variant="link"
              >
                {tertiaryButtonText}
              </Button>
            )
          }
        </>
        <div className={styles.buttonRight}>
          <Button
            onClick={secondaryButtonOnClick}
            variant="outlined"
          >
            {secondaryButtonText}
          </Button>
          <Button
            onClick={primaryButtonOnClick}
            variant="filled"
          >
            {primaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}