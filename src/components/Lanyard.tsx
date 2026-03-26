import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import cardGLB from "../assets/lanyard/card.glb";
import lanyardTexture from "../assets/lanyard/cordaCesar.jpeg";
import cardFrontArt from "../assets/lanyard/frente-joao-pedro-v2.jpg";
import cardBackArt from "../assets/lanyard/tras.png";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

const LANYARD_MAX_LENGTH = 3;
const LANYARD_REPEAT_AT_FULL_STRETCH = 4;
const LANYARD_MIN_REPEAT = 2.15;

function createAdjustedTexture(
  sourceTexture: THREE.Texture,
  options: { contrast?: number; saturation?: number; brightness?: number; repeat?: boolean } = {},
) {
  if (typeof document === "undefined" || !sourceTexture.image) {
    return sourceTexture;
  }

  const image = sourceTexture.image as CanvasImageSource & { width: number; height: number };
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");
  if (!context) {
    return sourceTexture;
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const contrast = options.contrast ?? 1.0;
  const saturation = options.saturation ?? 1.0;
  const brightness = options.brightness ?? 1.0;

  for (let index = 0; index < pixels.length; index += 4) {
    let red = pixels[index] / 255;
    let green = pixels[index + 1] / 255;
    let blue = pixels[index + 2] / 255;

    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

    red = luminance + (red - luminance) * saturation;
    green = luminance + (green - luminance) * saturation;
    blue = luminance + (blue - luminance) * saturation;

    red = (red - 0.5) * contrast + 0.5;
    green = (green - 0.5) * contrast + 0.5;
    blue = (blue - 0.5) * contrast + 0.5;

    red *= brightness;
    green *= brightness;
    blue *= brightness;

    pixels[index] = THREE.MathUtils.clamp(red, 0, 1) * 255;
    pixels[index + 1] = THREE.MathUtils.clamp(green, 0, 1) * 255;
    pixels[index + 2] = THREE.MathUtils.clamp(blue, 0, 1) * 255;
  }

  context.putImageData(imageData, 0, 0);

  const adjustedTexture = new THREE.CanvasTexture(canvas);
  adjustedTexture.colorSpace = THREE.SRGBColorSpace;
  adjustedTexture.wrapS = adjustedTexture.wrapT = options.repeat
    ? THREE.RepeatWrapping
    : THREE.ClampToEdgeWrapping;
  adjustedTexture.needsUpdate = true;

  return adjustedTexture;
}

function configureDisplayTexture(texture: THREE.Texture, anisotropy: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
}

function createCardBodyMaterial(baseMaterial: THREE.MeshPhysicalMaterial, isMobile: boolean) {
  const material = baseMaterial.clone();
  material.map = null;
  material.color = new THREE.Color(0xf3f3f3);
  material.clearcoat = isMobile ? 0 : 0.08;
  material.clearcoatRoughness = 0.3;
  material.roughness = 0.95;
  material.metalness = 0.02;

  return material;
}

function createCardProjectionMaterial(
  frontTexture: THREE.Texture,
  backTexture: THREE.Texture,
  bounds: THREE.Box3,
) {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
    depthWrite: false,
    alphaTest: 0.02,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.frontArt = { value: frontTexture };
    shader.uniforms.backArt = { value: backTexture };
    shader.uniforms.cardBoundsMin = { value: new THREE.Vector2(bounds.min.x, bounds.min.y) };
    shader.uniforms.cardBoundsMax = { value: new THREE.Vector2(bounds.max.x, bounds.max.y) };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vCardLocalPosition;\nvarying vec3 vCardLocalNormal;",
      )
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvCardLocalPosition = position;\nvCardLocalNormal = normalize(normal);",
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform sampler2D frontArt;\nuniform sampler2D backArt;\nuniform vec2 cardBoundsMin;\nuniform vec2 cardBoundsMax;\nvarying vec3 vCardLocalPosition;\nvarying vec3 vCardLocalNormal;",
      )
      .replace(
        "#include <map_fragment>",
        `
        vec2 cardSize = max(cardBoundsMax - cardBoundsMin, vec2(0.0001));
        vec2 projectedUv = (vCardLocalPosition.xy - cardBoundsMin) / cardSize;
        projectedUv = clamp(projectedUv, vec2(0.0), vec2(1.0));

        vec2 frontUv = vec2(projectedUv.x, projectedUv.y);
        vec2 backUv = vec2(1.0 - projectedUv.x, projectedUv.y);

        vec3 cardNormal = normalize(vCardLocalNormal);
        float cardFaceMask = smoothstep(0.7, 0.92, abs(cardNormal.z));
        vec4 frontColor = texture2D(frontArt, frontUv);
        vec4 backColor = texture2D(backArt, backUv);
        vec4 projectedColor = cardNormal.z >= 0.0 ? frontColor : backColor;
        diffuseColor = vec4(projectedColor.rgb, projectedColor.a * cardFaceMask);
        `,
      );
  };

  material.customProgramCacheKey = () =>
    `lanyard-card-projection-${bounds.min.x}-${bounds.max.x}`;
  material.needsUpdate = true;

  return material;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-stage">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const { gl } = useThree();
  const band = useRef<any>(null);
  const lineMaterial = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const [sourceTexture, frontTexture, backTexture] = useTexture([
    lanyardTexture,
    cardFrontArt,
    cardBackArt,
  ]);
  const lanyardBandTexture = useMemo(
    () => createAdjustedTexture(sourceTexture, { contrast: 1.24, saturation: 1.08, repeat: true }),
    [sourceTexture],
  );
  const frontDisplayTexture = useMemo(
    () => createAdjustedTexture(frontTexture, { contrast: 1.16, saturation: 1.04, brightness: 0.92 }),
    [frontTexture],
  );
  const cardBounds = useMemo(() => {
    nodes.card.geometry.computeBoundingBox();
    return nodes.card.geometry.boundingBox.clone();
  }, [nodes.card.geometry]);
  const cardBodyMaterial = useMemo(
    () => createCardBodyMaterial(materials.base, isMobile),
    [isMobile, materials.base],
  );
  const cardProjectionMaterial = useMemo(
    () => createCardProjectionMaterial(frontDisplayTexture, backTexture, cardBounds),
    [backTexture, cardBounds, frontDisplayTexture],
  );
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (!hovered) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = dragged ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current) {
      return;
    }

    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
      );

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

    const currentLength = curve.getLength();
    const repeatX = -THREE.MathUtils.clamp(
      (currentLength / LANYARD_MAX_LENGTH) * LANYARD_REPEAT_AT_FULL_STRETCH,
      LANYARD_MIN_REPEAT,
      LANYARD_REPEAT_AT_FULL_STRETCH,
    );

    lineMaterial.current?.repeat.set(repeatX, 1);
  });

  curve.curveType = "chordal";
  lanyardBandTexture.wrapS = lanyardBandTexture.wrapT = THREE.RepeatWrapping;
  lanyardBandTexture.colorSpace = THREE.SRGBColorSpace;
  lanyardBandTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
  configureDisplayTexture(frontDisplayTexture, gl.capabilities.getMaxAnisotropy());
  configureDisplayTexture(backTexture, gl.capabilities.getMaxAnisotropy());

  useEffect(() => {
    if (lanyardBandTexture === sourceTexture) {
      return;
    }

    return () => {
      lanyardBandTexture.dispose();
    };
  }, [lanyardBandTexture, sourceTexture]);

  useEffect(() => {
    if (frontDisplayTexture === frontTexture) {
      return;
    }

    return () => {
      frontDisplayTexture.dispose();
    };
  }, [frontDisplayTexture, frontTexture]);

  useEffect(() => {
    return () => {
      cardBodyMaterial.dispose();
      cardProjectionMaterial.dispose();
    };
  }, [cardBodyMaterial, cardProjectionMaterial]);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event: any) => {
              event.target.releasePointerCapture(event.pointerId);
              setDragged(false);
            }}
            onPointerDown={(event: any) => {
              event.target.setPointerCapture(event.pointerId);
              setDragged(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <primitive object={cardBodyMaterial} attach="material" />
            </mesh>
            <mesh geometry={nodes.card.geometry} renderOrder={1}>
              {/* Artwork is projected onto the original 3D card mesh. */}
              <primitive object={cardProjectionMaterial} attach="material" />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          ref={lineMaterial}
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={lanyardBandTexture}
          repeat={[-2.5, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
useTexture.preload(lanyardTexture);
useTexture.preload(cardFrontArt);
useTexture.preload(cardBackArt);
