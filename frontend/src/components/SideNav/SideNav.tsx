import Button from "../Button/Button";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import styles from "./SideNav.module.css"
import { GiMoebiusTriangle } from "react-icons/gi";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

export default function SideNav(){
  return (
    <aside className={styles.nav}>
      <h1 className={styles.dimension}><GiMoebiusTriangle style={{ fontSize: "1.3rem" }}/>Dimension</h1>
      <OpenModalButton
        buttonText={"Create"}
        modalComponent={<CreatePostForm />}
        className={styles.button}
      />
      {/* <div>
        <h1>Menu Item</h1>
      </div> */}
    </aside>
  )
}