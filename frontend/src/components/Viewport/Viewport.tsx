import styles from "./Viewport.module.css"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, Float } from "@react-three/drei"
import Model from "../Model/Model";
import { RingLoader } from "react-spinners";

export default function Viewport({ src }){

    return (
        <Suspense fallback={<RingLoader color="#EAEBEB"/>}>
            <Canvas
                className={styles.canvas}
                camera={{ fov: 50, zoom: 0.7, position: [0, 5, 5] }}
            >   
                <color args={[ "#18181B" ]} attach={"background"}/>
                <Stage intensity={0.3} shadows="contact" preset={"rembrandt"}>
                    <Model src={src} />
                </Stage>
                <OrbitControls enableZoom={false} makeDefault />
            </Canvas>
        </Suspense>
    )
}