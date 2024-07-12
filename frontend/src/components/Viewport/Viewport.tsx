import styles from "./Viewport.module.css"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, Float, useProgress, Html, Grid } from "@react-three/drei"
import Model from "../Model/Model";
import { RingLoader } from "react-spinners";

interface ViewportProps {
    src: string;
    grid?: boolean;
}

export default function Viewport({ src, grid = false }: ViewportProps) {
    function Loader() {
        const { active, progress, errors, item, loaded, total } = useProgress()
        return <Html center>{progress} % loaded</Html>
    }
    
    return (
        // <Suspense fallback={<RingLoader />}>
        <Canvas
            className={styles.canvas}
            camera={{ fov: 50, zoom: 0.7, position: [0, 5, 5] }}
        >
            <Suspense fallback={<Loader />}>
                <color args={["#18181B"]} attach={"background"} />
                <Stage intensity={0.3} shadows="contact" preset={"rembrandt"} adjustCamera>
                    {src ? <Model src={src} /> : null}
                </Stage>
                {grid ? <Grid
                    infiniteGrid
                    sectionSize={0.2}
                    sectionColor={"#52525B"}
                /> : null}
                <OrbitControls
                    enableZoom={grid}
                    makeDefault
                />
            </Suspense>
        </Canvas >
        // </Suspense >
    )
}