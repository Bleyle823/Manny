import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

const randomPhrases = [
  "Hello there!",
  "Nice day, isn't it?",
  "I love peanuts!",
  "Let's go for a walk!",
  "Water is refreshing!",
  "I'm feeling playful!",
  "Time for a nap...",
  "Anyone want to play?",
  "I'm hungry!",
  "This grass is delicious!",
]

export function Elephant({ position }) {
  const mesh = useRef()
  const [targetPosition, setTargetPosition] = useState(position)
  const [chatText, setChatText] = useState("")

  useEffect(() => {
    const moveInterval = setInterval(
      () => {
        setTargetPosition([Math.random() * 10 - 5, 0, Math.random() * 10 - 5])
      },
      5000 + Math.random() * 5000,
    )

    const chatInterval = setInterval(
      () => {
        setChatText(randomPhrases[Math.floor(Math.random() * randomPhrases.length)])
        setTimeout(() => setChatText(""), 3000) // Clear text after 3 seconds
      },
      7000 + Math.random() * 5000,
    )

    return () => {
      clearInterval(moveInterval)
      clearInterval(chatInterval)
    }
  }, [])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.lerp(new THREE.Vector3(...targetPosition), 0.02)

      const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...targetPosition), mesh.current.position)
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z)
        mesh.current.rotation.y = angle
      }
    }
  })

  return (
    <group ref={mesh} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <Html position={[0, 1.5, 0]} center distanceFactor={10} occlude>
        <div className="chatbox">{chatText}</div>
      </Html>
    </group>
  )
}

