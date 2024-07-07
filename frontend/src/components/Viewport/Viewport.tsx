import styles from "./Viewport.module.css"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, Float } from "@react-three/drei"
import Model from "../Model/Model";
import { RingLoader } from "react-spinners";
// function MyRotatingBox() {
//     const myMesh = useRef();
  
//     useFrame(({ clock }) => {
//       const a = clock.getElapsedTime();
//       myMesh.current.rotation.y = a;
//     });
  
//     return (
//       <mesh ref={myMesh}>
//         <boxGeometry />
//         <meshPhongMaterial color="royalblue" />
//       </mesh>
//     );
//   }

// const Model = () => {
//     const gltf = useGLTF("./spaceship.gltf");
//     return (
//         <>
//             <primitive object={gltf.scene} scale={0.4} />
//         </>
//     );
// };



export default function Viewport({src}){

    return (
        <Suspense fallback={<RingLoader color="#EAEBEB"/>}>
            <Canvas
                className={styles.canvas}
                camera={{ fov: 50, position: [0, 5, 5], zoom: 0.7 }}
                // camera={{ position: [0, 5, 5], fov: 50 }}
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