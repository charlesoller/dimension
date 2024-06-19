import styles from "./Viewport.module.css"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, Float } from "@react-three/drei"
import { useGLTF } from "@react-three/drei";
import Model from "../Model/Model";

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
    const gltf = useGLTF(src);

    return (
        <Canvas
            className={styles.canvas}
            camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 5, 5], zoom: 0.8 }}
            
        >   
            <color args={[ "#2C2E32" ]} attach={"background"}/>
                <Suspense fallback={null}>
                    <Stage intensity={0.3} shadows="contact" preset={"rembrandt"}>
                        <Model src={src} />
                    </Stage>
                    <OrbitControls enableZoom={false} />
                </Suspense>
        </Canvas>
    )
}