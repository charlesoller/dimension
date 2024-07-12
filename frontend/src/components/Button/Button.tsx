import { ReactNode } from "react"
import styles from "./Button.module.css"
import classNames from "classnames";

export interface ButtonProps {
  children?: ReactNode;
  onClick?: (arg0: any) => any;
  variant?: "outlined" | "filled" | "link"
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export default function Button({
  children, onClick, variant = "outlined", 
  type, fullWidth = false
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames({
        [styles.button]: true,
        [styles.outlined]: variant === "outlined",
        [styles.filled]: variant === "filled",
        [styles.link]: variant === "link",
        [styles.fullWidth]: fullWidth
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}