// ================= SCENE SETUP =================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 6;
const messages = [
  "विकास",
  "समृद्धि",
  "फागुन २१ मा\nसूर्य चिन्हमा मतदान"
];
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ================= TEXTURE =================
const loader = new THREE.TextureLoader();

// 👉 Put your Yemale logo image path here
const logoTexture = loader.load("Flag_of_CPN_(UML).svg");

// ================= MESSAGES =================


let messageIndex = 0;
const messageDiv = document.getElementById("message");

// ================= LOGO PLANE =================
const logoMaterial = new THREE.MeshBasicMaterial({
  map: logoTexture,
  transparent: true
});

const logoGeometry = new THREE.PlaneGeometry(3.2, 3.2);
const logo = new THREE.Mesh(logoGeometry, logoMaterial);
scene.add(logo);

// ================= RAYCASTER =================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const hit = raycaster.intersectObject(logo);
  if (hit.length > 0) {
    showMessage();
  }
});

// ================= MESSAGE FUNCTION =================
function showMessage() {
  messageDiv.innerText = messages[messageIndex];
  messageDiv.style.opacity = 1;

  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 2200);

  messageIndex = (messageIndex + 1) % messages.length;
}

// ================= SOFT GLOW =================
const glowTexture = loader.load(
  "https://threejs.org/examples/textures/sprites/glow.png"
);

const glowMaterial = new THREE.SpriteMaterial({
  map: glowTexture,
  color: 0xffcc66,
  transparent: true,
  blending: THREE.AdditiveBlending
});

const glow = new THREE.Sprite(glowMaterial);
glow.scale.set(6, 6, 1);
logo.add(glow);

// ================= ANIMATION =================
function animate() {
  requestAnimationFrame(animate);

  logo.rotation.y += 0.003;
  glow.material.opacity = 0.6 + Math.sin(Date.now() * 0.002) * 0.2;

  renderer.render(scene, camera);
}
animate();

// ================= RESPONSIVE =================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
