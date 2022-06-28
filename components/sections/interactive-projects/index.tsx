import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Physics, Triplet, useBox, usePlane } from "@react-three/cannon";
import { ThemeContext } from "../../../pages/_app";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import { useFBX, useTexture } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import getConfig from "next/config";

export default function MiniProjects() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <section>
      <div id="heading">
        <h2>Interactive Projects</h2>
        <p id="description">
          See my skills in action with some fun interactive projects.
          <br />
          Select an object to begin!
        </p>
      </div>
      <Canvas style={{ position: "absolute" }}>
        <ambientLight intensity={0.5} />

        <pointLight position={[0, -5, 0]} />
        <Physics gravity={[0, 0, 0]}>
          <BlueBox />
        </Physics>
      </Canvas>
      <Canvas style={{ position: "absolute" }}>
        <ambientLight intensity={0.5} />

        <pointLight position={[0, -5, 0]} />

        <Physics gravity={[0, 0, 0]}>
          <GreenBox />
        </Physics>
      </Canvas>
      <Canvas style={{ position: "absolute" }}>
        <ambientLight intensity={0.5} />

        <pointLight position={[0, -5, 0]} />

        <Physics gravity={[0, 0, 0]}>
          <RedBox />
        </Physics>
      </Canvas>
      <style jsx>{`
        #heading {
          position: absolute;
        }
        h2 {
          font-size: 3rem;
          color: ${isDark ? "white" : "black"};
        }

        #description {
          font-size: 1.25rem;
          font-weight: 500;
        }

        .desc {
          max-width: 500px;
        }
      `}</style>
    </section>
  );
}

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const BlueBox = () => {
  const [blue, blueAPI] = useBox(() => ({
    position: [0.5, -2, 0],
    mass: 1,
    rotation: [0.5, 1, 0],
  }));

  const box = useRef();

  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();
    blueAPI.rotation.set(time / 3, time / 6, time / 6);
  });

  return (
    <mesh position={[-1, -1, -1]} scale={0.95} ref={blue}>
      <boxGeometry args={[1, 1, 1]} ref={box} />
      <meshBasicMaterial attach="material" color={"red"} />
      <meshBasicMaterial attach="material" color={"blue"} />
      <meshBasicMaterial attach="material" color={"green"} />
      <meshBasicMaterial attach="material" color={"yellow"} />
      <meshBasicMaterial attach="material" color={"black"} />
      <meshBasicMaterial attach="material" color={"orange"} />
    </mesh>
  );
};

const GreenBox = () => {
  const [green, greenAPI] = useBox(() => ({
    position: [-5, 1, 0],
    mass: 1,
    rotation: [0.5, 1, 0],
  }));

  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();

    greenAPI.rotation.set(time / 6, time / 3, time / 6);
  });

  return (
    <group ref={green} scale={0.5}>
      {/* Side */}
      <group>
        {/* Bottom Row */}
        <group>
          <mesh position={[-1, -1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial attachArray="material" color={"red"} />
            <meshBasicMaterial attachArray="material" color={"blue"} />
            <meshBasicMaterial attachArray="material" color={"green"} />
            <meshBasicMaterial attachArray="material" color={"yellow"} />
            <meshBasicMaterial attachArray="material" color={"black"} />
            <meshBasicMaterial attachArray="material" color={"orange"} />
          </mesh>
          <mesh position={[0, -1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh position={[1, -1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
        </group>
        {/* Middle Row */}
        <group>
          <mesh position={[-1, 0, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
          <mesh position={[0, 0, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
          <mesh position={[1, 0, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>{" "}
        </group>
        {/* Top Row */}
        <group>
          <mesh position={[-1, 1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>

          <mesh position={[0, 1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh position={[1, 1, -1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
        </group>
      </group>
      {/* Side */}
      <group>
        {/* Bottom Row */}
        <group>
          <mesh position={[-1, -1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
          <mesh position={[0, -1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
          <mesh position={[1, -1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
        </group>
        {/* Middle Row */}
        <group>
          <mesh position={[-1, 0, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
          <mesh position={[0, 0, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          <mesh position={[1, 0, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>{" "}
        </group>
        {/* Top Row */}
        <group>
          <mesh position={[-1, 1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>

          <mesh position={[0, 1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
          <mesh position={[1, 1, 0]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </group>
      </group>
      {/* Side */}
      <group>
        {/* Bottom Row */}
        <group>
          <mesh position={[-1, -1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
          <mesh position={[0, -1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
          <mesh position={[1, -1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </group>
        {/* Middle Row */}
        <group>
          <mesh position={[-1, 0, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
          <mesh position={[0, 0, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
          <mesh position={[1, 0, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>{" "}
        </group>
        {/* Top Row */}
        <group>
          <mesh position={[-1, 1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>

          <mesh position={[0, 1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
          <mesh position={[1, 1, 1]} scale={0.95}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const RedBox = () => {
  const [red, redAPI] = useBox(() => ({
    position: [5, 0, 0],
    mass: 1,
  }));

  useFrame((state, delta) => {
    let time = state.clock.getElapsedTime();
    redAPI.rotation.set(-time / 6, -time / 6, -time / 6);
  });

  const { publicRuntimeConfig } = getConfig();
  const endpoint = publicRuntimeConfig.ENDPOINT;

  const gltf = useLoader(GLTFLoader, `${endpoint}slots/scene.gltf`);
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} ref={red} />
    </Suspense>
  );
};
