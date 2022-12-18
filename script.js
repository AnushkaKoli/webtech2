import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const loader = new THREE.TextureLoader()
const height = loader.load('height2.png')
const texture = loader.load('/texture.jpg')
const alpha = loader.load('/alpha.jpg')
const waves = loader.load('waves.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Sphere
const round = new THREE.SphereGeometry( .1, 7, 30 );
const gol = new THREE.MeshBasicMaterial()
gol.color = new THREE.Color(0xcd00ff)
const sphere = new THREE.Mesh(round,gol)
 scene.add(sphere)
 sphere.position.x = 2;
 sphere.position.y = 2;
 sphere.position.z = 1;

//Sphere 1
 const round1 = new THREE.SphereGeometry( .2, 7, 30 );
 const gol1 = new THREE.MeshBasicMaterial({
   map : waves
 })
 gol1.color = new THREE.Color(0xcd00ff)
 const sphere1 = new THREE.Mesh(round1,gol1)
  scene.add(sphere1)
  sphere1.position.x = -2;
  sphere1.position.y = 1;
  sphere1.position.z = 2;

  //Donut 
const donut = new THREE.TorusGeometry(0.25,0.01,20,50)
const pie = new THREE.MeshPhongMaterial()
const sweet = new THREE.Mesh(donut,pie)
scene.add(sweet)
sweet.position.x = -2;
sweet.position.y = 1;
sweet.position.z = 2;

//Plane
const geometry = new THREE.PlaneBufferGeometry(10,5,64, 64)
const material = new THREE.MeshStandardMaterial({
   color:'pink',
   map :texture,
   displacementMap :height,
   alphaMap : alpha,
   transparent : true
})
const plane = new THREE.Mesh(geometry,material)
scene.add(plane)

plane.rotation.x = 181


//GUI
 gui.add(plane.rotation,'x').min(20).max(100)
 gui.add(plane.rotation,'y').min(20).max(100)
 gui.add(plane.rotation,'z').min(20).max(100)
 


// Lights
 const pointLight = new THREE.PointLight(0xff00ff, 3)
 pointLight.position.x = 2
 pointLight.position.y = 3
 pointLight.position.z = 4
 scene.add(pointLight)


 gui.add(pointLight.position,'x')
 gui.add(pointLight.position,'y')
 gui.add(pointLight.position,'z')

 const col = {color :'#00ffff'}
 gui.addColor(col,'color').onChange(() =>{
   pointLight.color.set(col.color)
 })

 

// /**
//  * Sizes
//  */
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
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

     // Update objects
     sphere.rotation.y = .5 * elapsedTime
   plane.rotation.z = .03 * elapsedTime
   sphere1.rotation.z = .5 * elapsedTime

     // Update Orbital Controls
     // controls.update()

    // Render
     renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
 }

  tick()

