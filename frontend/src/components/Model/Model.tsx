import styles from "Model.module.css"
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { useRef } from "react";


export default function Model({src}){
    const gltf = useGLTF(src);
    // const mesh = useRef();

    // useFrame(({ clock }) => {
    //     mesh.current.rotation.y = clock.getElapsedTime() / 2
    // })

    return <primitive object={gltf.scene} />

    // return (
    //     <Float
    //         speed={1} // Animation speed, defaults to 1
    //         rotationIntensity={1} // XYZ rotation intensity, defaults to 1
    //         floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
    //         floatingRange={[1, 1.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    //     >
    //         <primitive object={gltf.scene} />
    //     </Float>
    // )
}