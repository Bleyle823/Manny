import { Plane } from "@react-three/drei"

export function Ground() {
  return (
    <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} args={[1000, 1000]}>
      <meshStandardMaterial color="#5a8f3d" />
    </Plane>
  )
}

