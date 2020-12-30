// import * as THREE from '../build/three.module.js';
// import Stats from './jsm/libs/stats.module.js';
const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

// let container, stats;
let camera, scene, renderer;
let particles, count = 0;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
    container = document.getElementById('three_waves');
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 500, 10000);
    camera.position.y = 600;
    camera.position.z = 2000;
    scene = new THREE.Scene();

    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
            scales[j] = 1;
            i += 3;
            j++;
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color('rgb(90,90,90)') },
        },
        vertexShader: `attribute float scale;
			void main() {
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = scale * ( 100.0 / - mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}`,
        fragmentShader: `uniform vec3 color;
            void main() {
                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
                gl_FragColor = vec4( color, 1.0 );
            }`
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    //
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    // stats = new Stats();
    // container.appendChild( stats.dom );
    container.style.touchAction = 'none';
    container.parentElement.addEventListener('pointermove', onPointerMove, false);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function onPointerMove(event) {
    if (event.isPrimary === false) return;
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    // stats.update();
}
function render() {
    camera.position.x += (mouseX - camera.position.x - 800) * .05;
    camera.position.y += (- mouseY - camera.position.y + 400) * .05;
    camera.lookAt(scene.position);
    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;
    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) +
                (Math.sin((iy + count) * 0.5) * 50);
            scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 20 +
                (Math.sin((iy + count) * 0.5) + 1) * 20;
            i += 3;
            j++;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.1;

}