import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import './Background3D.scss'
import useAtmosphere from '../../hooks/useAtmosphere'

function FloatingParticles({ color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={meshRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          // eslint-disable-next-line react/no-unknown-property
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          {/* eslint-disable-next-line react/no-unknown-property */}
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={color}
            // eslint-disable-next-line react/no-unknown-property
            emissive={color}
            // eslint-disable-next-line react/no-unknown-property
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

const Background3D = ({ intensity = 0.3 }) => {
  const { enabled, color } = useAtmosphere()
  if (!enabled) return null
  return (
    <motion.div
      className="background-3d"
      initial={{ opacity: 0 }}
      animate={{ opacity: intensity }}
      transition={{ duration: 2 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.5} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[10, 10, 10]} intensity={1} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
          <FloatingParticles color={color} />
          <Stars radius={300} depth={50} count={2000} factor={4} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

export default Background3D
