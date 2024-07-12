import Button from "../Button/Button";
import styles from "./ButtonGroup.module.css"

interface ButtonGroupProps {
  primaryButtonText?: string;
  primaryButtonOnClick?: (arg0?: any) => any;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: (arg0?: any) => any;
  tertiaryButtonText?: string;
  tertiaryButtonOnClick?: (arg0?: any) => any;
}

export default function ButtonGroup({
  primaryButtonText, primaryButtonOnClick,
  secondaryButtonText, secondaryButtonOnClick,
  tertiaryButtonText, tertiaryButtonOnClick,
}: ButtonGroupProps) {
  return (
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
        type="submit"
      >
        {primaryButtonText}
      </Button>
    </div>
  </div>
  )
}