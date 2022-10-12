import '../styles/style.css'
//import '../pages/spacebattle.html' 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import * as dat from 'dat.gui'
import Stats from 'stats.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import vertexShader from '/static/shaders/test/vertex.glsl'
import fragmentShader from '/static/shaders/test/fragment.glsl'


//Useful Functions
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

async function timeSensitiveAction(){ //must be async func
        await sleep(5000) //1000 per second
        // continue on
}
    
  

// Loaders
const gltfLoader = new GLTFLoader()

const cubeTextureLoader= new THREE.CubeTextureLoader()

const textureLoader = new THREE.TextureLoader()

const listener = new THREE.AudioListener()


/**
 * Base
 */
// Debug
 const gui = new dat.GUI()
 const debugObject = {}

 //Stats
 const stats = new Stats()
 stats.showPanel(0)
 document.body.appendChild(stats.dom)

// Canvas
const canvas = document.querySelector('canvas.webgl-spacebattle')


// Scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

/**
 * Update All Materials
 */
 const updateAllMaterials = () =>
 {
     scene.traverse((child) =>
     {
         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
         {
             child.material.envMap = environmentMap
             child.material.envMapIntensity = debugObject.envMapIntensity
             child.material.needsUpdate = true
             child.castShadow = true
             child.receiveShadow = true
         }
     })
 }
 


/**
 * Environment Map
 */

 
const environmentMap = cubeTextureLoader.load([
    '/textures/space/ulukai-bluered-deepred/corona_ft.png', // positive x
    '/textures/space/ulukai-bluered-deepred/corona_bk.png', // negative x
    '/textures/space/ulukai-bluered-deepred/corona_up.png', // positive y
    '/textures/space/ulukai-bluered-deepred/corona_dn.png', // negative y
    '/textures/space/ulukai-bluered-deepred/corona_rt.png', // positive z
    '/textures/space/ulukai-bluered-deepred/corona_lf.png' // negative z
 ])
environmentMap.encoding = THREE.sRGBEncoding
scene.background = environmentMap
scene.environment = environmentMap

 debugObject.envMapIntensity = 5
 gui.add(debugObject, 'envMapIntensity').min(0).max(100).step(0.001).onChange(updateAllMaterials)


/**
 * Models -- Empire to Rebels
 */
//DEATH STAR
var deathStar
 gltfLoader.load(
    '/models/death_star_-_star_wars/scene.gltf',
    (gltf) =>
    {

        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(0,-1, 0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
        //gui.add(gltf.scene.scale, 'scale').min(0).max(10).step(0.10).name('DeathStarSize')
        deathStar = gltf.scene
        //console.log(deathStar)

        updateAllMaterials()
    }
)




// //EXECUTOR
// var executor
// gltfLoader.load(
//     '/models/capitalships/star_wars_executor_class_star_destroyer/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.001, 0.001, 0.001)
//         gltf.scene.position.set(0,0, -3)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)
//         executor= gltf.scene

//         gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

//EMPIRE CAPITAL SHIP 1
gltfLoader.load(
    '/models/capitalships/star_destroyer/scene.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.015, 0.015, 0.015)
        gltf.scene.position.set(1, 0, -3)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
        gui.add(gltf.scene.position, 'x').min(0).max(10).step(0.01).name('PositionX')
        gui.add(gltf.scene.position, 'z').min(0).max(10).step(0.01).name('PositionZ')

        updateAllMaterials()
    }
)

//EMPIRE CAPITAL SHIP 2
gltfLoader.load(
  '/models/capitalships/star_destroyer/scene.gltf',
  (gltf) =>
  {
      gltf.scene.scale.set(0.015, 0.015, 0.015)
      gltf.scene.position.set(1.5, 0, -3)
      gltf.scene.rotation.y = Math.PI * 0.5
      scene.add(gltf.scene)

      //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

      updateAllMaterials()
  }
)

//EMPIRE CAPITAL SHIP 3
gltfLoader.load(
  '/models/capitalships/star_destroyer/scene.gltf',
  (gltf) =>
  {
      gltf.scene.scale.set(0.015, 0.015, 0.015)
      gltf.scene.position.set(2, 0, -3)
      gltf.scene.rotation.y = Math.PI * 0.5
      scene.add(gltf.scene)

      //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

      updateAllMaterials()
  }
)


// //TIE FIGHTER 1
// gltfLoader.load(
//   '/models/starfighters/tie_fighter/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.00001, 0.00001, 0.00001)
//       gltf.scene.position.set(2, 0.15, -3.1)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TIE FIGHTER 2
// gltfLoader.load(
//   '/models/starfighters/tie_fighter/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.001, 0.001, 0.001)
//       gltf.scene.position.set(2,0,-3.3)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TIE FIGHTER 3
// gltfLoader.load(
//   '/models/starfighters/tie_fighter/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.01, 0.01, 0.01)
//       gltf.scene.position.set(0,-1, -5)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TIE FIGHTER 4
// gltfLoader.load(
//   '/models/starfighters/tie_fighter/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.01, 0.01, 0.01)
//       gltf.scene.position.set(0,-1, -5)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TIE FIGHTER 5
// gltfLoader.load(
//   '/models/starfighters/tie_fighter/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.01, 0.01, 0.01)
//       gltf.scene.position.set(0,-1, -5)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

//DARTH VADER TIE FIGHTER
// gltfLoader.load(
//     '/models/starfighters/ghelps_vader_tie/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.0015, 0.0015, 0.0015)
//         gltf.scene.position.set(2, 0.15, -3.125)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

// //INTERCEPTOR TIE
// gltfLoader.load(
//     '/models/starfighters/interceptor_tie/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.0000004, 0.0000004, 0.0000004)
//         gltf.scene.position.set(2, 0.15, -3.07)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )


// //HOME ONE
// gltfLoader.load(
//     '/models/capitalships/star_wars_mc80_home_one_type_star_cruiser/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.0005, 0.0005, 0.0005)
//         gltf.scene.position.set(0,0, 3)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

// //HOME TWO
// gltfLoader.load(
//   '/models/capitalships/star_wars_mc80_home_one_type_star_cruiser/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.0005, 0.0005, 0.0005)
//       gltf.scene.position.set(0,0, 3.5)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TRANSPORT SHIP 1
// gltfLoader.load(
//     '/models/frigates/star_wars_gr-75_medium_transport/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.0012, 0.0012, 0.0012)
//         gltf.scene.position.set(0, 0, 4.25)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

// //TRANSPORT SHIP 2
// gltfLoader.load(
//   '/models/frigates/star_wars_gr-75_medium_transport/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.0012, 0.0012, 0.0012)
//       gltf.scene.position.set(0, 0, 4.35)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )

// //TRANSPORT SHIP 3
// gltfLoader.load(
//   '/models/frigates/star_wars_gr-75_medium_transport/scene.gltf',
//   (gltf) =>
//   {
//       gltf.scene.scale.set(0.0012, 0.0012, 0.0012)
//       gltf.scene.position.set(0, 0, 4.45)
//       gltf.scene.rotation.y = Math.PI * 0.5
//       scene.add(gltf.scene)

//       //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//       updateAllMaterials()
//   }
// )


// //MILLENNIUM FALCON
// gltfLoader.load(
//     '/models/starfighters/millennium_falcon/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.01, 0.01, 0.01)
//         gltf.scene.position.set(3,-1, 6)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

// //X-WING

//     gltfLoader.load(
//         '/models/starfighters/x-wing/scene.gltf',
//         (gltf) =>
//         {
//             gltf.scene.scale.set(0.00005, 0.00005, 0.00005)
//             gltf.scene.position.set(2, 0.15, -3.05)
//             gltf.scene.rotation.y = Math.PI * 0.5
//             scene.add(gltf.scene)

//             //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//             updateAllMaterials()
//         }
//     )

// //Y-WING
// gltfLoader.load(
//     '/models/starfighters/y-wing_-_by_silvia_nanni/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.00015, 0.00015, 0.00015)
//         gltf.scene.position.set(2.03, 0.15, -3.07)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )


// //A-WING
// gltfLoader.load(
//     '/models/starfighters/a-wing/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.000015, 0.000015, 0.000015)
//         gltf.scene.position.set(2.05, 0.15, -3.07)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

//         updateAllMaterials()
//     }
// )

// //PLANETS
// var planet
// gltfLoader.load(
//     '/models/planets/lava_planet/scene.gltf',
//     (gltf) =>
//     {
        
//         gltf.scene.scale.set(40, 40, 40)
//         gltf.scene.position.set(100,0, 0) // was at (100,0,0)
//         //gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//             planet = gltf.scene
//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
    
//         updateAllMaterials()
//     }
// )

//ASTEROIDS
// var asteroids = []
// for (let i = 0; i < 2; i++) {

//     gltfLoader.load(
//         '/models/asteroids/space_rocks/scene.gltf',
//         (gltf) =>
//         {
            
//             gltf.scene.scale.set(2, 2, 2)
//             //gltf.scene.position.set(0 ,0 , 0)
//             //gltf.scene.rotation.y = Math.PI * (2*i)
//             scene.add(gltf.scene)
//             asteroids.push(gltf.scene)

        
//             //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
            
//             //updateAllMaterials()
        
//         }
//     )
// }











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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)
camera.add(listener) // this is for sound


/**
 * Object Geometry
 */


// const ghostGeometry = new THREE.SphereBufferGeometry(0.05, 32, 32)
// const ghostMaterial = new THREE.MeshBasicMaterial({transparent: true})
// const ghostForm1 = new THREE.Mesh(ghostGeometry, ghostMaterial)
// scene.add(ghostForm1)

// const ghost1 = new THREE.PointLight('#ff00ff', 2,3)
// ghost1.add(ghostForm1)
// scene.add(ghost1)
const lavaPlanetTexture = textureLoader.load('/textures/planets/makemake4k.png')
const lavaPlanetCloudsTexture = textureLoader.load('/textures/planets/earthclouds2k.png')


const sphereGeometry = new THREE.SphereBufferGeometry(60,60,60)
const sphereMaterial = new THREE.MeshPhongMaterial({map: lavaPlanetTexture})
const lavaPlanet = new THREE.Mesh(sphereGeometry, sphereMaterial)

const sphereGeometryCloud = new THREE.SphereBufferGeometry(60.1, 60, 60)
const sphereMaterialCloud = new THREE.MeshPhongMaterial({
    map: lavaPlanetCloudsTexture,
    side: THREE.DoubleSide,
    opacity: 0.4,
    transparent: true,
    depthWrite: false
})
lavaPlanet.position.x = 100

const sphereMaterialAtmosphere = new THREE.ShaderMaterial( 
	{
	    uniforms: 
		{ 
			"c":   { type: "f", value: 0.37 },
			"p":   { type: "f", value: 2.25 },
			glowColor: { type: "c", value: new THREE.Color('#212171') },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );



const lavaPlanetAtmosphere = new THREE.Mesh(sphereGeometryCloud, sphereMaterialAtmosphere)
//lavaPlanetAtmosphere.position = lavaPlanet.position
//scene.add( lavaPlanetAtmosphere )
lavaPlanetAtmosphere.scale.multiplyScalar(1.003)
const lavaPlanetClouds = new THREE.Mesh(sphereGeometryCloud, sphereMaterialCloud)
scene.add(lavaPlanet)
lavaPlanet.add(lavaPlanetClouds)
lavaPlanet.add(lavaPlanetAtmosphere)
lavaPlanetAtmosphere.material.uniforms.glowColor.value = new THREE.Color('#212171')



 

/**
 * Lights
 */

 const lightAtDeathStar = new THREE.HemisphereLight(0xffffff, 0.6)
//  lightAtDeathStar.castShadow = true
//  lightAtDeathStar.shadow.mapSize.set(1024, 1024)
  lightAtDeathStar.position.set(5, 2, 10)


 const lightAtPlanet = new THREE.HemisphereLight(0xffffff, 0.6)

 scene.add(lightAtDeathStar)
 const helper = new THREE.HemisphereLightHelper( lightAtDeathStar, 5 );
 scene.add( helper );

//Audio
const sound = new THREE.Audio(listener)

const audioLoader = new THREE.AudioLoader()
audioLoader.load( 'sounds/music/ImperialMarch.mp3', function( buffer ) {
	sound.setBuffer( buffer )
	sound.setLoop(false)
	sound.setVolume(0.5)
	sound.play()
});

/*
Controls
*/

//Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// const controls = new FirstPersonControls(camera, canvas)
// controls.lookSpeed = 0.5
// controls.movementSpeed = 10
// controls.lookVertical = true
// controls.constrainVertical = true
// controls.lookAt(0,0,0)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true //Allows for smoother edges on models
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.setClearColor('#262837')

renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//////////
///GUI////
//////////
//gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
gui.add(lightAtDeathStar.position, 'x').min(-100).max(100).step(0.1).name("lightAtDeathStarX")
gui.add(lightAtDeathStar.position, 'y').min(-100).max(100).step(0.1).name("lightAtDeathStarY")
gui.add(lightAtDeathStar.position, 'z').min(-100).max(100).step(0.1).name("lightAtDeathStarZ")
gui.add(lightAtDeathStar, 'intensity').min(-100).max(100).step(0.1).name("lightAtDeathStarBright")
gui.add(lightAtDeathStar.rotation, 'y').min(-10).max(10).step(0.01).name("lightAtDeathStarAngle")
gui.add(lavaPlanet.position, 'x').min(-100).max(100).step(0.01).name("planetX")
gui.add(lavaPlanetAtmosphere.material.uniforms.c, 'value').min(-3).max(3).step(0.01).name('c')
gui.add(lavaPlanetAtmosphere.material.uniforms.p, 'value').min(-3).max(3).step(0.01).name('p')
gui.addColor(lavaPlanetAtmosphere.material.uniforms.glowColor, 'value').name('Glow Color')





/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    stats.begin()
    const elapsedTime = clock.getElapsedTime()
    

    //Update Objects

    //if (deathStar) deathStar.position.y = elapsedTime / 200

    // if (executor != null) {
    //     executor.position.x = elapsedTime / 20
    // }


    // if (asteroids) {
    //     //asteroids.rotation.y = elapsedTime / 20 
    //     for (let i = 0; i< asteroids.length; i++){
    //         if (i % 2 ==0){
    //         asteroids[i].rotation.z = elapsedTime / 2
    //         }
    //         else{
    //             asteroids[i].rotation.x = elapsedTime / 2
    //         }
    //         asteroids[i].position.x = 100 + 45 * Math.cos(elapsedTime) 
    //         asteroids[i].position.z = 45  * Math.sin(elapsedTime) 
    //     }
    // }

    lavaPlanet.rotation.y = elapsedTime / 125
    lavaPlanetClouds.rotation.y = elapsedTime / 200

    


    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end()
}

tick()

/////

//THIS IS THE OLD CODE AREA FOR HAUNTED HOUSE

//////



// /**
//  * Base
//  */
// // Debug
//  const gui = new dat.GUI()
// // Canvas
// const canvas = document.querySelector('canvas.webgl')


// // Scene
// const scene = new THREE.Scene()

// //Fog
// const fog = new THREE.Fog('#262837', 1, 15)
// scene.fog = fog


// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()

// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
// const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
// const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
// const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
// const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
// const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
// const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

// grassColorTexture.repeat.set(8,8)
// grassAmbientOcclusionTexture.repeat.set(8,8)
// grassNormalTexture.repeat.set(8,8)
// grassRoughnessTexture.repeat.set(8,8)

// grassColorTexture.wrapS = THREE.ReapeatWrapping
// grassAmbientOcclusionTexture.wrapS = THREE.ReapeatWrapping
// grassNormalTexture.wrapS = THREE.ReapeatWrapping
// grassRoughnessTexture.wrapS = THREE.ReapeatWrapping

// grassColorTexture.wrapT = THREE.ReapeatWrapping
// grassAmbientOcclusionTexture.wrapT = THREE.ReapeatWrapping
// grassNormalTexture.wrapT = THREE.ReapeatWrapping
// grassRoughnessTexture.wrapT = THREE.ReapeatWrapping





// /**
//  * House
//  */
// //group
// const house = new THREE.Group()
// scene.add(house)

// //walls
// const walls = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(4,2.5,4),
//     new THREE.MeshStandardMaterial({
//         map: bricksColorTexture,
//         aoMap: bricksAmbientOcclusionTexture,
//         normalMap: bricksNormalTexture,
//         roughnessMap: bricksRoughnessTexture,
//     })
// )
// walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
// walls.position.y = 1.25
// house.add(walls)

// //roof
// const roof = new THREE.Mesh(
//     new THREE.ConeBufferGeometry(3.5, 1, 4),
//     new THREE.MeshStandardMaterial({color: '#b35f45'})
// )

// roof.position.y = 2.5 + 0.5 //height of the walls plus half the height of the cone
// roof.rotation.y = Math.PI * 0.25
// house.add(roof)

// //door
// const door = new THREE.Mesh(
//     new THREE.PlaneBufferGeometry(2.2, 2.2, 100,100),
//     new THREE.MeshStandardMaterial({
//         map: doorColorTexture,
//         transparent: true,
//         alphaMap: doorAlphaTexture,
//         aoMap: doorAmbientOcclusionTexture,
//         displacementMap: doorHeightTexture,
//         displacementScale: 0.1,
//         normalMap: doorNormalTexture,
//         metalnessMap: doorMetalnessTexture,
//         roughnessMap: doorRoughnessTexture
//     })
// )

// door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
// door.position.y = 1
// door.position.z = 2+0.01
// house.add(door)

// //bushes
// const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
// const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

// const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush1.scale.set(0.5, 0.5, 0.5)
// bush1.position.set(0.8, 0.2, 2.2) 

// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush2.scale.set(0.25, 0.25, 0.25)
// bush2.position.set(1.4, 0.1, 2.1)

// const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush3.scale.set(0.4, 0.4, 0.4)
// bush3.position.set(-0.8, 0.1, 2.2)

// const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush4.scale.set(0.15, 0.15, 0.15)
// bush4.position.set(-1, 0.05, 2.6)


// house.add(bush1, bush2, bush3, bush4)

// //ghost shapes

// const ghostGeometry = new THREE.SphereBufferGeometry(0.05, 32, 32)
// const ghostMaterial = new THREE.MeshBasicMaterial({transparent: true})

// const ghostForm1 = new THREE.Mesh(ghostGeometry, ghostMaterial)
// const ghostForm2 = new THREE.Mesh(ghostGeometry, ghostMaterial)
// const ghostForm3 = new THREE.Mesh(ghostGeometry, ghostMaterial)

// scene.add(ghostForm1, ghostForm2, ghostForm3)

// //Graveyard group
// const graves = new THREE.Group()
// scene.add(graves)

// const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
// const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})

// for (let i = 0; i <= 50; i++) {
//     const angle = Math.random() * Math.PI * 2
//     const radius = 3 + Math.random() * 6
//     const x = Math.sin(angle) * radius
//     const z = Math.cos(angle) *  radius

//     const grave = new THREE.Mesh(graveGeometry, graveMaterial)
//     grave.position.set(x, 0.3, z)
//     grave.rotation.y = (Math.random() - 0.5) *  0.4
//     grave.rotation.z = (Math.random() - 0.5) *  0.4
//     grave.castShadow = true
//     graves.add(grave)

// }


// // Floor
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(20, 20),
//     new THREE.MeshStandardMaterial({
//         map: grassColorTexture,
//         aoMap: grassAmbientOcclusionTexture,
//         normalMap: grassNormalTexture,
//         roughnessMap: grassRoughnessTexture
//      })
// )
// floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
// floor.rotation.x = - Math.PI * 0.5
// floor.position.y = 0
// scene.add(floor)

// /**
//  * Lights
//  */
// // Ambient light
// const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
// scene.add(ambientLight)

// // Directional light
// const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
// moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
// scene.add(moonLight)

// //door light
// const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
// doorLight.position.set(0, 2.2, 2.7)
// house.add(doorLight)

// //Ghosts

// const ghost1 = new THREE.PointLight('#ff00ff', 2,3)
// ghost1.add(ghostForm1)
// scene.add(ghost1)

// const ghost2 = new THREE.PointLight('#00ffff', 2,3)
// ghost2.add(ghostForm2)
// scene.add(ghost2)

// const ghost3 = new THREE.PointLight('#ffff00', 2,3)
// ghost3.add(ghostForm3)
// scene.add(ghost3)


// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 4
// camera.position.y = 2
// camera.position.z = 5
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor('#262837')

// //Shadows
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

// moonLight.castShadow = true
// doorLight.castShadow = true
// ghost1.castShadow = true
// ghost2.castShadow = true
// ghost3.castShadow = true

// walls.castShadow = true
// bush1.castShadow = true
// bush2.castShadow = true
// bush3.castShadow = true
// bush4.castShadow = true

// floor.receiveShadow = true


// doorLight.shadow.mapSize.width = 256
// doorLight.shadow.mapSize.height = 256
// doorLight.shadow.camera.far = 7

// ghost1.shadow.mapSize.width = 256
// ghost1.shadow.mapSize.height = 256
// ghost1.shadow.camera.far = 7

// ghost2.shadow.mapSize.width = 256
// ghost2.shadow.mapSize.height = 256
// ghost2.shadow.camera.far = 7

// ghost3.shadow.mapSize.width = 256
// ghost3.shadow.mapSize.height = 256
// ghost3.shadow.camera.far = 7

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     //Update Ghosts
//     const ghost1Angle = elapsedTime * 0.5
//     ghost1.position.x = Math.cos(ghost1Angle) * 4
//     ghost1.position.z = Math.sin(ghost1Angle)  * 4
//     ghost1.position.y = Math.sin(elapsedTime) * 3

//     const ghost2Angle = - elapsedTime * 0.32
//     ghost2.position.x = Math.cos(ghost2Angle) * 5
//     ghost2.position.z = Math.sin(ghost2Angle)  * 5
//     ghost2.position.y = Math.sin(elapsedTime) * 3 + Math.sin(elapsedTime * 0.25)

//     const ghost3Angle = - elapsedTime * 0.18
//     ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
//     ghost3.position.z = Math.sin(ghost3Angle)  * (7 + Math.sin(elapsedTime * 0.5))
//     ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()