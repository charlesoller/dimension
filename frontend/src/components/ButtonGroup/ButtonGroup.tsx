import Button from "../Button/Button";
import styles from "./ButtonGroup.module.css"

interface ButtonGroupProps {
  primaryButtonText?: string;
  primaryButtonOnClick?: (arg0?: any) => any;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: (arg0?: any) => any;
  tertiaryButtonText?: string;
  tertiaryButtonOnClick?: (arg0?: any) => any;
  disabled: boolean;
}

export default function ButtonGroup({
  primaryButtonText, primaryButtonOnClick,
  secondaryButtonText, secondaryButtonOnClick,
  tertiaryButtonText, tertiaryButtonOnClick,
  disabled
}: ButtonGroupProps) {
  return (
    <div className={styles.buttons}>
    <>
      {
        tertiaryButtonText && (
          <Button
            onClick={tertiaryButtonOnClick}
            variant="link"
            disabled={disabled}
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
        disabled={disabled}
      >
        {secondaryButtonText}
      </Button>
      <Button
        onClick={primaryButtonOnClick}
        variant="filled"
        type="submit"
        disabled={disabled}
      >
        {primaryButtonText}
      </Button>
    </div>
  </div>
  )
}