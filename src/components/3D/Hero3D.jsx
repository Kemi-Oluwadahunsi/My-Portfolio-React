import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import './Hero3D.scss'

function AnimatedSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#bce0fb"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

const Hero3D = () => {
  return (
    <motion.div
      className="hero-3d"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Stars radius={300} depth={50} count={5000} factor={4} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

export default Hero3D
