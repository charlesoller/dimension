import styles from "./LinkChip.module.css"
import { Link } from "react-router-dom";
import { GoHash } from "react-icons/go";

interface LinkChipComponent {
  url: string;
  text: string;
}

export default function LinkChip({ url, text }: LinkChipComponent){
  return (
    <a href={url} className={styles.chip}>
      <GoHash />
      { text.slice(1) }
    </a>
  )
}