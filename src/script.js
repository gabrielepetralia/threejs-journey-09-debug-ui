import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()
const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#d74f37'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug UI tweaks

// Range tweak
// gui.add(mesh.position, 'y', - 3, 3, 0.01)
gui
    .add(mesh.position, 'x')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('X axis')

gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('Y axis')

gui
    .add(mesh.position, 'z')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('Z axis')

// Checkbox tweak
gui
    .add(mesh, 'visible')

gui
    .add(mesh.material, 'wireframe')

// Color tweak
// gui
//     .addColor(mesh.material, 'color')
//     .onChange((value) => {
//         console.log(value.getHexString())
//     })
gui
    .addColor(debugObject, 'color')
    .onChange((value) => {
        material.color.set(debugObject.color)
    })

// Button tweak
debugObject.spin = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, 
                            duration: 2, 
                            ease: "power1.inOut", 
                            repeat: 1, 
                            yoyo: true }
            ) 
}

gui.add(debugObject, 'spin')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()