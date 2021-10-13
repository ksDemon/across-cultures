import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

//AMBIENT SETUP
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
});

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene,camera);

function resizeAmbient(){
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.render(scene, camera);

}
document.body.onresize = resizeAmbient


//TORUS
const geometry = new THREE.TorusGeometry(1, 0.4, 20, 20);
var material = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  wireframe: true
});

const torus = new THREE.Mesh(geometry, material);
torus.position.setX(2)
torus.position.setZ(20)
scene.add(torus)

//LIGHTS
const pointLight = new THREE.PointLight(0xFFFFFF)
const ambientLight = new THREE.AmbientLight(0xaaaaaa)
pointLight.position.set(-1,-1,0)
scene.add(ambientLight, pointLight)

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200,50)
//scene.add(gridHelper)

const controls  = new OrbitControls(camera, renderer.domElement);

//ENGLISH TITLE
const loader = new FontLoader();
loader.load( 'foundry.json', function ( font ) {

	const geometry = new TextGeometry( 'ENGLISH ACROSS', {
		font: font,
		size: 2,
		height: 0,
		curveSegments: 8,
		bevelEnabled: true,
		bevelThickness: 0.125,
		bevelSize: 0,
		bevelOffset: 0,
		bevelSegments: 8
	} );
  const geometry2 = new TextGeometry( 'CULTURES', {
		font: font,
		size: 2,
		height: 0,
		curveSegments: 8,
		bevelEnabled: true,
		bevelThickness: 0.125,
		bevelSize: 0,
		bevelOffset: 0,
		bevelSegments: 8
	} );


  const material = new THREE.MeshPhongMaterial({color: 0xaaaaaa, flatShading:true})
  const title1 = new THREE.Mesh(geometry, material)
  title1.position.setZ(-11)
  title1.position.setX(-12.5)
  title1.position.setY(-0)
  const title2 = new THREE.Mesh(geometry2, material)
  title2.position.setZ(-11)
  title2.position.setX(-7.5)
  title2.position.setY(-3)
  scene.add(title1,title2)

} );

//STARS
function addStar(){
  const geometry = new THREE.OctahedronGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

//HEAD
const GLTFloader = new GLTFLoader();


GLTFloader.load( './files/3d/scene.gltf',function (gltf) {
  const face = gltf.scene;
  material = new THREE.MeshNormalMaterial({
    flatShading: true,
  });
  face.position.set(3,1,35)
  face.rotateY(599*3.14/8)
  
  setMaterialsOnGLTF(face)
  scene.add(face);
});

function setMaterialsOnGLTF(object3D) {
  if (object3D.material) {
    object3D.material = material;
  }
  if (!object3D.children) {
    return;
  }
  for (let i = 0; i < object3D.children.length; i++) {
    setMaterialsOnGLTF(object3D.children[i]);
  }
}

//BACKGROUND
const spaceTexture = new THREE.TextureLoader().load('./files/space.jpg')
//scene.background = spaceTexture

//AVATAR
const avatarTexture = new THREE.TextureLoader().load('./files/avatar2.png')
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshBasicMaterial({map:avatarTexture})
)
avatar.position.setX(3)
avatar.position.setZ(10)
scene.add(avatar)

//EARTH
const earthTexture = new THREE.TextureLoader().load('./files/earth.jpg')
const earthNormal = new THREE.TextureLoader().load('./files/earth.tif')
const earth = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.2, 10),
  new THREE.MeshStandardMaterial({map:earthTexture, normalMap:earthNormal})
)
earth.position.setX(-2)
earth.position.setZ(56)
scene.add(earth)

//KAABA
const kaabaTexture = new THREE.TextureLoader().load('./files/kaaba.jpg')
const kaaba = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({map:kaabaTexture})
)
kaaba.position.setX(-2)
kaaba.position.setZ(62)
scene.add(kaaba)

//GAME LOOP
function animate(){
  requestAnimationFrame(animate);

  torus.rotateX(0.002)
  torus.rotateZ(0.005)
  torus.rotateY(0.002)
  avatar.rotateY(0.005)
  kaaba.rotateY(0.005)
  avatar.rotateX(0.005)

  earth.rotateY(0.002)

  //controls.update();

  renderer.render(scene, camera);
}

//CAMERA MOVEMENT
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  //const unk = document.getElementById("header").getBoundingClientRect().top;
  //console.log(unk)
  //console.log(t)

  torus.rotateX(0.01)
  torus.rotateY(0.015)
  torus.rotateZ(0.01)
  avatar.rotateY(0.02)
  earth.rotateY(0.02)
  pointLight.position.z = t * -0.01 - 2

  camera.position.z = t * -0.01
  //if (t<=-700 && t>=-1200){
  //  camera.rotation.x = ((t + 700) / 500) * 1.5708
  //}
  
  //camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

//ANIMATION
animate()