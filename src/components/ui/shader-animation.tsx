"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader - Optimized for performance and corporate branding
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        float t = time * 0.15;
        
        // Fluid-like distortion for elegant waves
        vec2 fluid = vec2(
            sin(p.y * 2.0 + t) + cos(p.x * 1.5 + t * 0.8),
            cos(p.x * 2.2 - t) + sin(p.y * 1.8 - t * 0.6)
        ) * 0.5;
        
        // Intensity of the wave
        float val = sin(length(p + fluid) * 3.0 - t * 1.5) * 0.5 + 0.5;
        
        // Dark Corporate Ventrix Palette for maximum text contrast
        vec3 col1 = vec3(0.020, 0.080, 0.180); // Very Deep Blue
        vec3 col2 = vec3(0.040, 0.150, 0.300); // Dark Blue
        vec3 col3 = vec3(0.005, 0.020, 0.050); // Almost Black
        
        vec3 finalColor = mix(col1, col2, val);
        finalColor = mix(finalColor, col3, uv.y * 1.2); // Darken heavily towards the edges/bottom
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Performance optimizations: Disable antialias (not needed for smooth gradients), disable alpha
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    // Limit pixel ratio to max 1.0. High pixel ratio on full-screen shaders kills GPU performance.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0))

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
