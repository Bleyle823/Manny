"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Elephant } from "./Elephant"
import { Ground } from "./Ground"

const NUM_ELEPHANTS = 5

export default function ElephantWorld() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Environment preset="sunset" background />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Ground />
        {Array.from({ length: NUM_ELEPHANTS }).map((_, index) => (
          <Elephant key={index} position={[Math.random() * 10 - 5, 0, Math.random() * 10 - 5]} />
        ))}
        <OrbitControls />
      </Canvas>
      <style jsx global>{`
        .chatbox {
          background-color: white;
          border-radius: 10px;
          padding: 5px 10px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        .chatbox:empty {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

