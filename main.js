// main.js
let scene, camera, renderer;
let blocks = [];
let textureLoader = new THREE.TextureLoader();

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // sky blue

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("game") });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 0.5).normalize();
  scene.add(light);

  generateTerrain();

  // Controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'w') camera.position.z -= 1;
    if (e.key === 's') camera.position.z += 1;
    if (e.key === 'a') camera.position.x -= 1;
    if (e.key === 'd') camera.position.x += 1;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function generateTerrain() {
  const size = 20;

  const grassTexture = textureLoader.load('textures/grass.png');
  grassTexture.magFilter = THREE.NearestFilter;

  for (let x = -size; x < size; x++) {
    for (let z = -size; z < size; z++) {
      const height = Math.floor(Math.random() * 3) + 1;

      for (let y = 0; y < height; y++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({ map: grassTexture });
        const block = new THREE.Mesh(geometry, material);
        block.position.set(x, y, z);
        scene.add(block);
        blocks.push(block);
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
