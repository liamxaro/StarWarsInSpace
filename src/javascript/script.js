import '../styles/style.css'
import '../styles/menustyle.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import * as dat from 'dat.gui'
import Stats from 'stats.js'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import vertexShader from '/static/shaders/test/vertex.glsl'
import fragmentShader from '/static/shaders/test/fragment.glsl'


/**
 * Loaders
 */
 /**
 * Loaders
 */

const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1,})

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
        //console.log(progressRatio) 
        
    }
)
const gltfLoader = new GLTFLoader(loadingManager)

const cubeTextureLoader= new THREE.CubeTextureLoader(loadingManager)

const textureLoader = new THREE.TextureLoader(loadingManager)

const listener = new THREE.AudioListener()
const fontLoader = new THREE.FontLoader(loadingManager)
const audioLoader = new THREE.AudioLoader(loadingManager)


 




/**
 * Base
 */
// Debug
//  const gui = new dat.GUI()
const debugObject = {}

 //Stats
//  const stats = new Stats()
//  stats.showPanel(0)
//  document.body.appendChild(stats.dom)

// Canvas
const canvas = document.querySelector('canvas.webgl-menu')


// Scene
const scene = new THREE.Scene()

//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper )

/**
 * Overlay
 */

 const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
 const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
     uniforms:
     {
         uAlpha: { value : 1 }
     },
     vertexShader: `
         void main()
         {
             gl_Position = vec4(position, 1.0);
         }
     `,
     fragmentShader: `
         uniform float uAlpha;
 
         void main()
         {
             gl_FragColor = vec4( 0.0, 0.0, 0.0, uAlpha);
         }
     `
 
 })
 const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
 scene.add(overlay)


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
 
 //Audio
const backgroundSound = new THREE.Audio(listener)
var tieFighterShotSound = new THREE.Audio(listener)
var tieFighterFlightSound0 = new THREE.PositionalAudio(listener)
var tieFighterFlightSound1 = new THREE.PositionalAudio(listener)
var starDestoyerOutHyperSpaceSound = new THREE.PositionalAudio(listener)

audioLoader.load( 'sounds/music/BattleInTheSnowTrimmed.mp3', function( buffer ) {
	backgroundSound.setBuffer( buffer )
	backgroundSound.setLoop(true)
	backgroundSound.setVolume(0.5)
})

audioLoader.load('sounds/TIE fighter fire 1.mp3', function( buffer ) {
    tieFighterShotSound.setBuffer( buffer )
    tieFighterShotSound.setLoop(false)
    tieFighterShotSound.setVolume(0.6)
})

audioLoader.load('sounds/SOUND EFFECT_ Star Wars - TIE-Fighter Flying.mp3', function( buffer ) {
    tieFighterFlightSound0.setBuffer( buffer )
    tieFighterFlightSound0.setLoop(true)
    tieFighterFlightSound0.setVolume(0.6)
    tieFighterFlightSound0.setRefDistance(0.75)
})

audioLoader.load('sounds/SOUND EFFECT_ Star Wars - TIE-Fighter Flying.mp3', function( buffer ) {
    tieFighterFlightSound1.setBuffer( buffer )
    tieFighterFlightSound1.setLoop(true)
    tieFighterFlightSound1.setVolume(0.6)
    tieFighterFlightSound1.setRefDistance(0.75)
})

audioLoader.load('sounds/ComeOutOfHyperSpace.mp3', function( buffer ) {
    starDestoyerOutHyperSpaceSound.setBuffer( buffer )
    starDestoyerOutHyperSpaceSound.setLoop(false)
    starDestoyerOutHyperSpaceSound.setVolume(2)
    starDestoyerOutHyperSpaceSound.setRefDistance(8)
})


//console.log(tieFighterFlightSound.getRefDistance())

const newGameButton = document.querySelector('button.newGame')
newGameButton.addEventListener('click', () =>
{
    window.open('spacebattlescript.js')
})

const musicButton = document.querySelector('button.noise')

musicButton.addEventListener('click', () =>
{
    if (backgroundSound.isPlaying == true)
    {
        backgroundSound.stop()
    }
    else
    {
        backgroundSound.play()
    } 

})

const closeButton = document.querySelector('button.close')
closeButton.addEventListener('click', () =>
{
    window.close()
    
})

/**
 * MODELS!
 */

//ASTEROIDS
// var asteroids = []
// for(let i = 0; i < 50; i++)
// {
//  gltfLoader.load(
//     '/models/asteroids/meteor__space__lowpoly/scene.gltf',
//     (gltf) =>
//     {

//         //gltf.scene.scale.set(0.025, 0.025, 0.025)
//         //gltf.scene.position.set(0 + i, 0, 0)
//         gltf.scene.position.x = (Math.random() * (12 - -12) + -12)
//         gltf.scene.position.y  = (Math.random() * (12 - -12) + -12)
//         gltf.scene.position.z = (Math.random() * (10 - 30) + 30) * -1 // randomly generated numbers between -5 and -30
//         // donut.position.y = (Math.random() - 0.5) * -10
//         // donut.position.z = (Math.random() - 0.5) * -10

//         const scale = Math.random() * (0.03 - 0.005) + 0.005
//         //console.log(scale)
//         gltf.scene.scale.set(scale,scale,scale)

//         //gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)
//         //console.log(gltf.scene)

//         //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')
//         //gui.add(gltf.scene.scale, 'scale').min(0).max(10).step(0.10).name('DeathStarSize')
//         asteroids.push(gltf.scene)
//         //console.log(deathStar)

//         updateAllMaterials()
//     }
// )
// }

for (let i =0; i < 3; i++)
{
    gltfLoader.load(
        '/models/capitalships/star_destroyer/scene.gltf',
        (gltf) =>
        {
            gltf.scene.scale.set(1.2, 1.2, 1.2)
           
            switch (i)
            {
                case 0: gltf.scene.position.set(0, 8.2, -55)
                scene.add(gltf.scene)
                gsap.to(gltf.scene.position, {z: -6.5, duration:0.15, delay: 6, onComplete: function(){starDestoyerOutHyperSpaceSound.play()}})
                break

                case 1:  gltf.scene.position.set(18.5, 8.2, -55)
                scene.add(gltf.scene)
                gsap.to(gltf.scene.position, {z: -15, duration:0.15, delay: 6.5, onComplete: function(){starDestoyerOutHyperSpaceSound.play()}})
                break

                case 2: gltf.scene.position.set(-18.5, 8.2, -55)
                scene.add(gltf.scene)
                gsap.to(gltf.scene.position, {z: -15, duration:0.15, delay: 6.75,onComplete: function(){starDestoyerOutHyperSpaceSound.play()}})
                break
            }
            //starDestroyer.push(gltf.scene)
            
            //gltf.scene.position.set(0, 8.2, -90)
            gltf.scene.rotation.y = Math.PI
            //scene.add(gltf.scene)

            // gui.add(gltf.scene.position, 'x').min(-30).max(30).step(0.01).name('S' + String(i) + 'Xaxis')
            // gui.add(gltf.scene.position, 'y').min(5).max(30).step(0.01).name('S' + String(i) + 'Yaxis')
            // gui.add(gltf.scene.position, 'z').min(-40).max(30).step(0.01).name('S' + String(i) + 'Zaxis')
            // //starDestroyer.push(gltf.scene)

            updateAllMaterials()
        }
    )
}




for (let i =0; i < 2; i++)
{
    gltfLoader.load(
        '/models/starfighters/tie-fighter_from_star_wars/scene.gltf',
        (gltf) =>
        {
            gltf.scene.scale.set(0.004, 0.004, 0.004)
            
            //gltf.scene.position.set(-18.5 + (-0.7 *i), 7.83, -12.83) //group two position
            //gltf.scene.position.set(18.5 + (0.7 *i), 7.83, -12.83) //group three position
            gltf.scene.rotation.y = Math.PI * 2
            
            
            if (i == 0)
            {
                gsap.to(gltf.scene.position, {x:-0.81, y: 7.45, z:-3.73, delay: 6.2, onComplete: function() {scene.add(gltf.scene)}})
                gltf.scene.add(tieFighterFlightSound0)
                let tl1 = gsap.timeline({
                    paused: false,
                    repeat: -1,
                    delay: 6
                })
                tl1.set(gltf.scene.position,  //load tiefighter in the hangar
                        {x:-0.81, y: 7.45, z:-3.73, delay: 3.7})
                tl1.to(gltf.scene.position, 
                    {y: 7.45 - 3, 
                    x: gltf.scene.position.x -1,
                    duration:1,
                    onStart: function()
                    {
                        gltf.scene.lookAt(camera.position)
                        tieFighterFlightSound0.play()
                    },
                    onComplete: function()
                    {
                        // gltf.scene.lookAt(camera.position)
                    }}) //the y-axis is being buggy, hardcode it // add delay when finished
                
                tl1.to(gltf.scene.position, //launch tiefighter towards camera
                {x: camera.position.x - 0.8, 
                    y: camera.position.y - 2, 
                    z: camera.position.z +10, 
                    duration:2,
                    onComplete: function() 
                    {
                    tieFighterFlightSound0.stop()
                    }
                })


                tl1.set(gltf.scene.position ,{x:-19.2, y: 7.83, z:-12.83}) //reset for second star destroyer
                
                tl1.to(gltf.scene.position, 
                    {y: 7.83 - 3,
                    x: -19.2 -1,
                    duration:1.5,
                    onStart: function()
                    {
                        gltf.scene.lookAt(camera.position)
                        tieFighterFlightSound0.play()
                    },
                    onComplete: function()
                    {
                        //gltf.scene.lookAt(camera.position)
                    }}) //the y-axis is being buggy, hardcode it //release tiefighters from destroyer
                tl1.to(gltf.scene.position, //launch tiefighter towards camera
                    {x: camera.position.x + 2.8, 
                     y: camera.position.y - 2, 
                     z: camera.position.z +10, 
                     duration:1.5,
                    onComplete: function()
                    {
                        tieFighterFlightSound0.stop()
                    }})
                
                
                tl1.set(gltf.scene.position ,{x:19.2, y: 7.83, z:-12.83}) //reset for third star destroyer
                    
                tl1.to(gltf.scene.position, 
                    {y: 7.83 - 3,
                    x: 19.2 +1,
                    duration:1.5,
                    onStart: function()
                    {
                        gltf.scene.lookAt(camera.position)
                        tieFighterFlightSound0.play()
                        
                    }}) //the y-axis is being buggy, hardcode it //release tiefighters from destroyer
                
                tl1.to(gltf.scene.position, //launch tiefighter towards camera
                    {x: camera.position.x - 3.8, 
                    y: camera.position.y - 2, 
                     z: camera.position.z +10, 
                    duration:1.5,
                    onComplete: function()
                    {
                        tieFighterFlightSound0.stop()
                    }})
                    
            }

            if (i ==  1)
            {
                
                gsap.to(gltf.scene.position, {x:-0.21, y: 7.45, z:-3.73, delay: 6.2, onComplete: function() {scene.add(gltf.scene)}})
                let tl2 = gsap.timeline({
                    paused: false,
                    repeat: -1,
                    delay: 6
                })
                gltf.scene.add(tieFighterFlightSound1)

                tl2.set(gltf.scene.position,  //set in the first star destroyer
                    {x:-0.21, y: 7.45, z:-3.73, delay: 3.7})

                
                tl2.to(gltf.scene.position, // release from the star destoyer
                    {y: 7.45 - 3,
                    x: gltf.scene.position.x +1,
                    duration:1,
                    onStart: function()
                    {
                        gltf.scene.lookAt(camera.position)
                        tieFighterFlightSound1.play()
                    }}) 
                

                tl2.to(gltf.scene.position, // launch towards the camera
                    {x: camera.position.x + 0.8, 
                     y: camera.position.y - 2, 
                     z: camera.position.z +10, 
                     duration:1.2, 
                     onUpdate: function()
                     {
                        
                        
                     },
                     onComplete: function() 
                     {
                        tieFighterFlightSound1.stop()
                     }
                    })

                tl2.set(gltf.scene.position ,{x:-18.5, y: 7.83, z:-12.83})

                
                tl2.to(gltf.scene.position,  //release from the star destroyer
                    {y: 7.83 - 3, 
                    x: -18.5 +1,
                    duration:1.5,
                    onStart: function()
                    {
                        gltf.scene.lookAt(camera.position)
                        tieFighterFlightSound1.play()
                    }}) 
                
                tl2.to(gltf.scene.position, // launch towards the camera
                    {x: camera.position.x + 3.6, 
                    y: camera.position.y - 2, 
                    z: camera.position.z +10, 
                    duration:2,
                    onComplete: function()
                {
                    tieFighterFlightSound1.stop()
                }})

                tl2.set(gltf.scene.position ,{x:18.5, y: 7.83, z:-12.83}) //set the tieFighter in the third star destroyer

                tl2.to(gltf.scene.position, 
                    {y: 7.83 - 3, 
                    x: 18.5 -1,
                    duration:1.5,
                    onStart: function()
                    {
                        tieFighterFlightSound1.play()
                        gltf.scene.lookAt(camera.position)
                    }}) 

                
                tl2.to(gltf.scene.position, 
                    {x: camera.position.x - 4.6, 
                    y: camera.position.y - 2, 
                    z: camera.position.z +10, 
                    duration:2,
                    onComplete: function()
                    {
                        tieFighterFlightSound1.stop()
                    }})
                

            }
            

            // gui.add(gltf.scene.position, 'x').min(-30).max(30).step(0.01).name('T1' + String(i) +'Xaxis')
            // gui.add(gltf.scene.position, 'y').min(-5).max(30).step(0.01).name('T1' + String(i) +'Yaxis')
            // gui.add(gltf.scene.position, 'z').min(-40).max(30).step(0.01).name('T1' + String(i) +'Zaxis')
            //tieFighters.push(gltf.scene)
        
            
            updateAllMaterials()

        }
    
    )

}





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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 75)
camera.position.x = 0.2179359756006145// was 0
camera.position.y = -2.256277005574377
camera.position.z = 33.280632222112416 // was 5
scene.add(camera)
camera.lookAt(origin)
camera.add(listener) // this is for sound

/**
 * Lights
 */

const lightAtDeathStar = new THREE.PointLight(0xffffff, 38)
//  lightAtDeathStar.castShadow = true
//  lightAtDeathStar.shadow.mapSize.set(1024, 1024)
lightAtDeathStar.position.set(0, 21.5, 29.7)


//  const lightAtPlanet = new THREE.HemisphereLight(0xffffff, 0.6)

  scene.add(lightAtDeathStar)
//  const helper = new THREE.HemisphereLightHelper( lightAtDeathStar, 5 );
//  scene.add( helper );


fontLoader.load('/Fonts/STARWARS_Regular.json',
 (font) => 
 {
     const textGeometry = new THREE.TextBufferGeometry(
          'STAR WARS',
          {
              font: font,
              size: 4,
              height: 0.2,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments:4
          }
     )

     textGeometry.center()

    const material = new THREE.MeshPhongMaterial() //{matcap:matcapTexture}
    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)
    text.lookAt(camera.position)
    text.position.y = 20
    text.rotation.x = -6
    //text.receiveLight = false
    // gui.add(text.rotation, 'x').min(-10).max(10).step(0.1).name('Text Rotation')
    // gui.add(text.position, 'y').min(0).max(45).step(0.1).name('Text Height')
        }
 )
//test object 
// const mesh = new THREE.Mesh( new THREE.SphereBufferGeometry(10,10,10), new THREE.MeshStandardMaterial())
// scene.add(mesh)
/**
 * GEOMETRY
 */
 const icePlanetTexture = textureLoader.load('/textures/planets/iceTEADoctored2.jpg')
 const icePlanetCloudsTexture = textureLoader.load('/textures/planets/earthclouds2k.png')
 
const icePlanetGeometry = new THREE.SphereBufferGeometry(60,60,60)
const icePlanetGeometryCloud = new THREE.SphereBufferGeometry(60.1, 60, 60)
const icePlanetMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: 
		{ 
			"c":   { type: "f", value: 1.76 },
			"p":   { type: "f", value: 1.06 },
			glowColor: { type: "c", value: new THREE.Color('#212171') },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );



const icePlanetStruct = new THREE.MeshPhongMaterial({map: icePlanetTexture })
const icePlanetCloud = new THREE.MeshPhongMaterial({ 
    map: icePlanetCloudsTexture,
    side: THREE.DoubleSide,
    opacity: 0.4,
    transparent: true,
    depthWrite: false })

const icePlanetAtmosphere = new THREE.Mesh(icePlanetGeometryCloud, icePlanetMaterial)
icePlanetAtmosphere.scale.multiplyScalar(1.004)
const icePlanet = new THREE.Mesh( icePlanetGeometry, icePlanetStruct)
const icePlanetClouds = new THREE.Mesh(icePlanetGeometryCloud, icePlanetCloud)
scene.add(icePlanet)
icePlanet.position.z = -35
icePlanet.position.y = -60
icePlanet.add(icePlanetClouds)
icePlanetClouds.add(icePlanetAtmosphere)






//Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true //Allows for smoother edges on models
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

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
//gui.add(debugObject, 'envMapIntensity').min(0).max(100).step(0.001).onChange(updateAllMaterials)

// gui.add(lightAtDeathStar.position, 'x').min(-100).max(100).step(0.1).name("lightAtDeathStarX")
// gui.add(lightAtDeathStar.position, 'y').min(-100).max(100).step(0.1).name("lightAtDeathStarY")
// gui.add(lightAtDeathStar.position, 'z').min(-100).max(100).step(0.1).name("lightAtDeathStarZ")
// gui.add(lightAtDeathStar, 'intensity').min(-100).max(100).step(0.1).name("lightAtDeathStarBright")
// gui.add(icePlanetAtmosphere.scale, 'x').min(0).max(100).step(0.1).name('AScale Planet X')
// gui.add(icePlanetAtmosphere.scale, 'y').min(0).max(100).step(0.1).name('AScale Planet Y')
// gui.add(icePlanetAtmosphere.scale, 'z').min(0).max(100).step(0.1).name('AScale Planet Z')
// gui.add(icePlanetAtmosphere.position, 'x').min(-100).max(100).step(0.1).name('APosition Planet X')
// gui.add(icePlanetAtmosphere.position, 'y').min(-100).max(100).step(0.1).name('APosition Planet Y')
// gui.add(icePlanetAtmosphere.position, 'z').min(-100).max(100).step(0.1).name('APosition Planet Z')
// gui.add(lightAtDeathStar.position, 'x').min(-100).max(100).step(0.1).name("lightAtDeathStarX")
// gui.add(lightAtDeathStar.position, 'y').min(-100).max(100).step(0.1).name("lightAtDeathStarY")
// gui.add(lightAtDeathStar.position, 'z').min(-100).max(100).step(0.1).name("lightAtDeathStarZ")
// gui.add(lightAtDeathStar, 'intensity').min(-100).max(100).step(0.1).name("lightAtDeathStarBright")
// gui.add(lightAtDeathStar.rotation, 'y').min(-10).max(10).step(0.01).name("lightAtDeathStarAngle")
// // gui.add(lavaPlanet.position, 'x').min(0).max(100).step(0.1).name('Position Planet X')
// // gui.add(lavaPlanet.position, 'y').min(0).max(100).step(0.1).name('Position Planet Y')
// // gui.add(lavaPlanet.position, 'z').min(0).max(100).step(0.1).name('Position Planet Z')
// gui.add(icePlanetAtmosphere.material.uniforms.c, 'value').min(-3).max(3).step(0.01).name('c')
// gui.add(icePlanetAtmosphere.material.uniforms.p, 'value').min(-3).max(3).step(0.01).name('p')
// gui.addColor(icePlanetAtmosphere.material.uniforms.glowColor, 'value').name('Glow Color')

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     //stats.begin()
     const elapsedTime = clock.getElapsedTime()

     /**
      * UPDATE OBJECTS
      */
     //Planet Geometry
     icePlanetClouds.rotation.y = elapsedTime / 200
     icePlanet.rotation.y = elapsedTime / 125



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    //stats.end()
}

tick()
