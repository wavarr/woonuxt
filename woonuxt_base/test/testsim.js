// A basic 3D simulation using Three.js to represent multiversal bubbles and observer pathing on edge membranes

import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from './node_modules/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from './node_modules/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from './node_modules/three/examples/jsm/lines/LineGeometry.js';
import { ShaderMaterial } from './node_modules/three/build/three.module.js';
import { CatmullRomCurve3 } from './node_modules/three/build/three.module.js'; // Import Curve

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000); // Increased far plane for background
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Better resolution on high DPI screens
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better color grading
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 50;

// --- Starry Background ---
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_px.jpg',
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_nx.jpg',
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_py.jpg',
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_ny.jpg',
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_pz.jpg',
    'https://threejs.org/examples/textures/cube/MilkyWay/dark-s_nz.jpg',
]);
scene.background = texture;

// Lighting - Refined for PBR materials
scene.remove(scene.getObjectByName('AmbientLight')); // Remove previous basic light
scene.remove(scene.getObjectByName('PointLight'));   // Remove previous basic light

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Softer ambient
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Add a subtle backlight
const backlight = new THREE.DirectionalLight(0xffaaaa, 0.2);
backlight.position.set(-5, -10, -7.5);
scene.add(backlight);


// Bubble (Universe) Generator - Enhanced Material
function createBubble(radius, position, color = 0x4444ff, metalness = 0.1, roughness = 0.2, transmission = 0.9) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64); // Increased detail
    const material = new THREE.MeshStandardMaterial({
        color,
        metalness: metalness,
        roughness: roughness,
        transmission: transmission, // For glass/bubble effect
        transparent: true,
        opacity: 0.6, // Slightly less opaque
        side: THREE.DoubleSide,
        envMap: scene.background, // Reflect the background
        envMapIntensity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    scene.add(sphere);
    return sphere;
}

// Create multiple bubbles with varied properties
const bubbleData = [
    { radius: 5, pos: new THREE.Vector3(-6, 2, -3), color: 0xff6666, metal: 0.2, rough: 0.3, trans: 0.85 },
    { radius: 6, pos: new THREE.Vector3(7, -1, 2), color: 0x66ff66, metal: 0.1, rough: 0.1, trans: 0.9 },
    { radius: 4, pos: new THREE.Vector3(0, 6, 4), color: 0x6666ff, metal: 0.3, rough: 0.4, trans: 0.8 },
    { radius: 4.5, pos: new THREE.Vector3(-3, -5, -5), color: 0xffff66, metal: 0.15, rough: 0.2, trans: 0.92 },
    { radius: 5.5, pos: new THREE.Vector3(5, 4, -6), color: 0xff66ff, metal: 0.25, rough: 0.3, trans: 0.88 },
];

const bubbles = bubbleData.map(data =>
    createBubble(data.radius, data.pos, data.color, data.metal, data.rough, data.trans)
);

// Observer - Enhanced Appearance + Trail
const observerGeometry = new THREE.SphereGeometry(0.3, 32, 32); // Slightly larger
const observerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00, // Make it glow
    emissiveIntensity: 1.5,
    metalness: 0.8,
    roughness: 0.1,
    envMap: scene.background,
    envMapIntensity: 0.7
});
const observer = new THREE.Mesh(observerGeometry, observerMaterial);
scene.add(observer);

// --- Define Observer Path --- 
const pathPoints = [];
const pathSegments = 500; // Number of points defining the curve smoothness
const pathDuration = 20; // Time in seconds to complete one loop of the path

// Generate points for the path using the Lissajous formula
for (let i = 0; i <= pathSegments; i++) {
    const t = (i / pathSegments) * Math.PI * 2; // Parameter for one full loop (adjust as needed for formula)

    // Lissajous parameters (same as before for consistency)
    const curveRadiusX = 8;
    const curveRadiusZ = 6;
    const freqX = 1;
    const freqZ = 1.3;
    const phaseX = Math.PI / 2;
    const phaseZ = 0;
    const verticalFreq = 2.5;
    const verticalAmp = 2;

    // Map t to the time parameter expected by the formula (may need adjustment based on freq)
    // We want one visual loop over pathDuration. Let the highest frequency guide this.
    const simulationT = t * Math.max(freqX, freqZ, verticalFreq) / (Math.PI * 2);

    const x = curveRadiusX * Math.sin(freqX * simulationT * (Math.PI*2/pathDuration) + phaseX);
    const z = curveRadiusZ * Math.cos(freqZ * simulationT * (Math.PI*2/pathDuration) + phaseZ);
    const y = verticalAmp * Math.sin(verticalFreq * simulationT * (Math.PI*2/pathDuration));

    pathPoints.push(new THREE.Vector3(x, y, z));
}

// Create a smooth curve from the points
const pathCurve = new CatmullRomCurve3(pathPoints, true); // true makes it a closed loop

// --- Observer Path Visualization (using the defined path points) ---
const pathGeometry = new LineGeometry();
const pathPositions = pathCurve.getPoints(pathSegments * 3).flatMap(p => [p.x, p.y, p.z]); // Get points from curve for line
pathGeometry.setPositions(pathPositions);

// Calculate line distances for the shader based on the predefined path
const distances = [];
let currentDist = 0;
distances.push(currentDist);
for (let i = 1; i < pathPoints.length; i++) { // Use original generated points for distance calc
    currentDist += pathPoints[i-1].distanceTo(pathPoints[i]);
    distances.push(currentDist);
}
const totalDist = currentDist > 0 ? currentDist : 1;
const normalizedDistances = distances.map(d => d / totalDist);

// We need to interpolate normalized distances for the vertices generated by getPoints()
// This is approximate but usually good enough for visualization.
// A more precise way involves knowing exactly which original points map to the LineGeometry vertices.
const distanceAttributeArray = [];
const numLineVertices = pathPositions.length / 3;
for(let i = 0; i < numLineVertices; i++){
    const curveT = i / (numLineVertices - 1); // Progress along the *curve points used by LineGeometry*
    // Find where curveT falls in the original normalizedDistances
    const index = Math.floor(curveT * (normalizedDistances.length - 1));
    const nextIndex = Math.min(index + 1, normalizedDistances.length - 1);
    const segmentT = (curveT * (normalizedDistances.length - 1)) - index;
    // Interpolate
    const interpolatedDist = normalizedDistances[index] * (1 - segmentT) + normalizedDistances[nextIndex] * segmentT;
    distanceAttributeArray.push(interpolatedDist);

}
// Duplicate for LineGeometry requirement (start/end of segment attribute)
const finalDistanceArray = [];
for(let i = 0; i < distanceAttributeArray.length -1; i++){
    finalDistanceArray.push(distanceAttributeArray[i], distanceAttributeArray[i+1]);
}

pathGeometry.setAttribute('lineDistance', new THREE.Float32BufferAttribute(finalDistanceArray, 1));


// Custom Shader Material for Path (remains the same as before)
const pathVertexShader = `
    attribute vec3 instanceStart; // Added by LineGeometry
    attribute vec3 instanceEnd;   // Added by LineGeometry
    attribute float lineDistance; // Custom attribute: distance along the line
    varying float vLineDistance;  // Pass distance to fragment shader

    #include <common>
    #include <uv_pars_vertex>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>

    uniform float linewidth;
    uniform vec2 resolution;
    varying vec2 vUv;

    void main() {
        vLineDistance = lineDistance; // Pass the calculated distance
        vUv = uv;

        // From LineMaterial shader
        float aspect = resolution.x / resolution.y;
        vec4 start = projectionMatrix * modelViewMatrix * vec4( instanceStart, 1.0 );
        vec4 end = projectionMatrix * modelViewMatrix * vec4( instanceEnd, 1.0 );

        vec2 screenPos = vec2( position.x, position.y );
        vec4 clipPos = vec4( ( vec3( screenPos, 0.0 ) + vec3( 0.0, 0.0, position.z ) ) * start.w, start.w );
        vec4 cpos = projectionMatrix * modelViewMatrix * vec4( position.xyz, 1.0 );

        // Adjust position based on linewidth and screen orientation
        vec2 dir = end.xy * start.w - start.xy * end.w; // Unprojected line direction
        dir.y *= aspect; // Correct for aspect ratio
        dir = normalize( dir );

        vec2 offset = vec2( dir.y, - dir.x ) * linewidth * 0.5 * cpos.w; // Calculate offset perpendicular to line
        cpos.xy += offset * (position.x > 0.0 ? 1.0 : -1.0); // Apply offset based on side (-1 or 1)

        gl_Position = cpos;

        #include <logdepthbuf_vertex>
	    #include <clipping_planes_vertex>
        #include <fog_vertex>
    }
`;

const pathFragmentShader = `
    uniform vec3 diffuse; // Base color
    uniform float opacity;
    uniform float time;   // Time for animation
    uniform float pulseSpeed;
    uniform float pulseLength;
    uniform vec3 pulseColor;
    varying float vLineDistance; // Distance along the line from vertex shader

    #include <common>
    #include <color_pars_fragment>
    #include <uv_pars_fragment>
    #include <map_pars_fragment>
    #include <fog_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>

    void main() {
        #include <clipping_planes_fragment>

        // Calculate pulsing effect
        float timeScaled = time * pulseSpeed;
        float pulsePosition = fract(vLineDistance - timeScaled); // Pulse moves along vLineDistance
        float pulseValue = smoothstep(0.0, pulseLength * 0.5, pulsePosition) - smoothstep(pulseLength * 0.5, pulseLength, pulsePosition);
        pulseValue = pow(pulseValue, 2.0); // Sharpen the pulse peak

        vec3 baseColor = diffuse;
        vec3 finalColor = mix(baseColor, pulseColor, pulseValue); // Mix base color with pulse color
        float finalOpacity = opacity * (0.5 + pulseValue * 0.8); // Base opacity + pulse makes it brighter

        gl_FragColor = vec4( finalColor, finalOpacity );

        #include <logdepthbuf_fragment>
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
        #include <premultiplied_alpha_fragment>
    }
`;

// Create the ShaderMaterial
const pathMaterial = new ShaderMaterial({
    uniforms: {
        diffuse: { value: new THREE.Color(0x0088ff) }, // Base blue color
        opacity: { value: 0.6 },
        linewidth: { value: 3 }, // in pixels
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        pulseSpeed: { value: 0.8 }, // How fast the pulse travels
        pulseLength: { value: 0.15 }, // How long the pulse is (0 to 1, normalized path length)
        pulseColor: { value: new THREE.Color(0xffffff) } // White pulse color
    },
    vertexShader: pathVertexShader,
    fragmentShader: pathFragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: false, // Often needed for transparent lines
    blending: THREE.AdditiveBlending // Brighter where pulses overlap
});

const pathLine = new Line2(pathGeometry, pathMaterial);
scene.add(pathLine);

// Observer animation path - MOVED TO FOLLOW THE CURVE
// function updateObserverPosition(delta) { ... } // DELETE OR COMMENT OUT OLD FUNCTION

// Camera setup (remains the same)
camera.position.set(0, 5, 25);
controls.target.set(0, 0, 0);

// Render loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.elapsedTime;

    // --- Update Observer Position ALONG THE CURVE ---
    const loopTime = elapsedTime % pathDuration; // Time within one path loop
    const pathProgress = loopTime / pathDuration; // Normalized progress (0 to 1)
    const currentPosition = pathCurve.getPointAt(pathProgress); // Get position from curve
    observer.position.copy(currentPosition);

    // Optional: Make observer look ahead on the path
    const lookAheadProgress = (pathProgress + 0.01) % 1.0; // Look slightly ahead
    const lookAtPosition = pathCurve.getPointAt(lookAheadProgress);
    observer.lookAt(lookAtPosition);
    // --- End Observer Position Update ---

    controls.update(); // Required if enableDamping is true

    // Update shader time uniform for pulsing effect on the visualized path
    pathMaterial.uniforms.time.value = elapsedTime;

    // Bubble animation (remains the same)
    bubbles.forEach((bubble, index) => {
        bubble.rotation.y += delta * 0.05 * (index % 2 === 0 ? 1 : -1);
        const scale = 1.0 + Math.sin(elapsedTime * 0.5 + index) * 0.03;
        bubble.scale.set(scale, scale, scale);
    });

    renderer.render(scene, camera);
}

animate();

// Resize handler (remains the same, including pathMaterial update)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Update pixel ratio on resize
    pathMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
});

// UI Overlay (update description)
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '10px';
overlay.style.left = '10px';
overlay.style.padding = '10px';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
overlay.style.color = 'white';
overlay.style.fontFamily = 'Arial, sans-serif';
overlay.style.borderRadius = '5px';
overlay.style.maxWidth = '300px';
overlay.innerHTML = `
    <h3>Multiverse Simulation</h3>
    <p>Universe bubbles visualized with varying properties.</p>
    <p>The observer (yellow) is constrained to travel along the defined path.</p>
    <p>The path has a pulsing tracer effect.</p>
    <p>The background is a dynamic starfield.</p>
    <p>Use mouse to rotate/pan, scroll to zoom.</p>
`;
document.body.appendChild(overlay);
