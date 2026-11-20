import type * as THREE_NS from 'three';

type Three = typeof THREE_NS;

export interface LensScene {
	/** 0 = iris closed in front of the lens, 1 = iris open and camera through the barrel. */
	setProgress(progress: number): void;
	setPointer(x: number, y: number): void;
	setActive(active: boolean): void;
	resize(): void;
	dispose(): void;
}

const BLADES = 9;
const RING_RADIUS = 2.05;
const BRAND_CYAN = 0x00a3c4;
const BRAND_GOLD = 0xe5b842;

/**
 * Real-time camera iris: nine extruded metal blades inside a lens housing. Scroll opens the
 * diaphragm and dollies the camera through the barrel, revealing the photograph behind the canvas.
 * Renders on demand only (state change or pointer drift), never in a free-running loop.
 */
export function createLensScene(THREE: Three, canvas: HTMLCanvasElement): LensScene {
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
	renderer.setClearColor(0x000000, 0);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 60);
	const world = new THREE.Group();
	scene.add(world);

	// ── Lights: cool key, warm rim, low ambient. Metal reads through highlights, not flat colour.
	scene.add(new THREE.AmbientLight(0xffffff, 0.35));
	const key = new THREE.DirectionalLight(0xffffff, 2.2);
	key.position.set(-3, 4, 6);
	scene.add(key);
	const rimCyan = new THREE.PointLight(BRAND_CYAN, 18, 14, 1.6);
	rimCyan.position.set(3.2, -1.6, 2.2);
	scene.add(rimCyan);
	const rimGold = new THREE.PointLight(BRAND_GOLD, 10, 14, 1.6);
	rimGold.position.set(-3.4, 2.4, 1.6);
	scene.add(rimGold);
	// Soft fill inside the barrel so the blade overlaps read as brushed metal.
	const barrelFill = new THREE.PointLight(0xdfe8f0, 9, 6, 1.4);
	barrelFill.position.set(0.7, 0.9, 1.4);
	scene.add(barrelFill);

	// ── Lens housing: a matte face plate with a circular port, plus a polished bezel.
	const housingShape = new THREE.Shape();
	housingShape.absarc(0, 0, 40, 0, Math.PI * 2, false);
	const port = new THREE.Path();
	port.absarc(0, 0, RING_RADIUS, 0, Math.PI * 2, true);
	housingShape.holes.push(port);
	const housingGeo = new THREE.ShapeGeometry(housingShape, 96);
	const housingMat = new THREE.MeshStandardMaterial({ color: 0x07080a, roughness: 0.92, metalness: 0.2 });
	const housing = new THREE.Mesh(housingGeo, housingMat);
	housing.position.z = 0.02;
	world.add(housing);

	const bezelGeo = new THREE.TorusGeometry(RING_RADIUS + 0.04, 0.085, 32, 180);
	const bezelMat = new THREE.MeshStandardMaterial({ color: 0x9aa3ad, roughness: 0.22, metalness: 1 });
	const bezel = new THREE.Mesh(bezelGeo, bezelMat);
	bezel.position.z = 0.06;
	world.add(bezel);

	const innerRingGeo = new THREE.TorusGeometry(RING_RADIUS - 0.16, 0.025, 16, 180);
	const innerRingMat = new THREE.MeshStandardMaterial({ color: BRAND_CYAN, emissive: BRAND_CYAN, emissiveIntensity: 0.55, roughness: 0.4, metalness: 0.6 });
	const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
	innerRing.position.z = -0.02;
	world.add(innerRing);

	// ── Iris blades: curved plates pivoting on the ring. Local +y points toward the optical axis.
	const bladeShape = new THREE.Shape();
	bladeShape.moveTo(0, -0.05);
	bladeShape.quadraticCurveTo(1.45, 0.25, 2.75, -0.05);
	bladeShape.lineTo(2.75, 1.1);
	bladeShape.quadraticCurveTo(1.35, 2.55, -0.05, RING_RADIUS + 0.55);
	bladeShape.closePath();
	const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
		depth: 0.018,
		bevelEnabled: true,
		bevelThickness: 0.008,
		bevelSize: 0.012,
		bevelSegments: 2,
		curveSegments: 24,
	});
	const bladeMat = new THREE.MeshStandardMaterial({ color: 0x2b3138, roughness: 0.3, metalness: 0.85 });

	const blades: THREE_NS.Group[] = [];
	for (let i = 0; i < BLADES; i += 1) {
		const angle = (i / BLADES) * Math.PI * 2;
		const pivot = new THREE.Group();
		pivot.position.set(Math.cos(angle) * RING_RADIUS, Math.sin(angle) * RING_RADIUS, -0.32 - i * 0.014);
		pivot.userData['base'] = angle + Math.PI / 2;
		const blade = new THREE.Mesh(bladeGeo, bladeMat);
		blade.rotation.x = 0.03; // slight pitch so overlapping plates catch light differently
		pivot.add(blade);
		world.add(pivot);
		blades.push(pivot);
	}

	// ── Dust in the beam: sparse points drifting inside the barrel.
	const dustCount = 220;
	const dustPositions = new Float32Array(dustCount * 3);
	for (let i = 0; i < dustCount; i += 1) {
		const r = Math.sqrt(Math.random()) * RING_RADIUS * 0.95;
		const a = Math.random() * Math.PI * 2;
		dustPositions[i * 3] = Math.cos(a) * r;
		dustPositions[i * 3 + 1] = Math.sin(a) * r;
		dustPositions[i * 3 + 2] = -0.6 + Math.random() * 6;
	}
	const dustGeo = new THREE.BufferGeometry();
	dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
	const dustMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.0, depthWrite: false, sizeAttenuation: true });
	const dust = new THREE.Points(dustGeo, dustMat);
	world.add(dust);

	// ── State
	let progress = 0;
	let pointerX = 0;
	let pointerY = 0;
	let tiltX = 0;
	let tiltY = 0;
	let active = false;
	let frame = 0;

	const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
	const ease = (t: number) => 1 - Math.pow(1 - t, 3);

	const apply = () => {
		// Iris opens over 8%–72% of the scene; camera dolly through the port over 62%–100%.
		const open = ease(clamp01((progress - 0.08) / 0.64));
		const dolly = ease(clamp01((progress - 0.62) / 0.38));

		for (const pivot of blades) {
			pivot.rotation.z = (pivot.userData['base'] as number) - open * 1.18;
		}
		innerRingMat.emissiveIntensity = 0.35 + open * 0.9;
		dustMat.opacity = 0.15 + open * 0.45 - dolly * 0.4;

		camera.position.set(tiltX * 0.6 * (1 - dolly), tiltY * 0.4 * (1 - dolly), 9.2 - dolly * 9.0);
		camera.lookAt(0, 0, -1);
		world.rotation.z = -open * 0.35;
	};

	const render = () => {
		frame = 0;
		// Smooth pointer drift; keep requesting frames only while it is still settling.
		tiltX += (pointerX - tiltX) * 0.08;
		tiltY += (pointerY - tiltY) * 0.08;
		apply();
		renderer.render(scene, camera);
		if (active && (Math.abs(pointerX - tiltX) > 0.001 || Math.abs(pointerY - tiltY) > 0.001)) {
			request();
		}
	};

	const request = () => {
		if (!frame) frame = requestAnimationFrame(render);
	};

	const resize = () => {
		const width = canvas.clientWidth || 1;
		const height = canvas.clientHeight || 1;
		const dprCap = width < 768 ? 1.5 : 2;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		// Keep the port a similar share of the frame on portrait screens.
		camera.fov = camera.aspect < 0.8 ? 52 : 34;
		camera.updateProjectionMatrix();
		request();
	};

	resize();

	return {
		setProgress(value: number) {
			progress = clamp01(value);
			request();
		},
		setPointer(x: number, y: number) {
			pointerX = x;
			pointerY = y;
			request();
		},
		setActive(value: boolean) {
			active = value;
			if (value) request();
		},
		resize,
		dispose() {
			if (frame) cancelAnimationFrame(frame);
			[housingGeo, bezelGeo, innerRingGeo, bladeGeo, dustGeo].forEach((g) => g.dispose());
			[housingMat, bezelMat, innerRingMat, bladeMat, dustMat].forEach((m) => m.dispose());
			renderer.dispose();
		},
	};
}
