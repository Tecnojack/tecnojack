/**
 * Developer profile shown on /portfolio/sobre-mi when the "Perfil desarrollador" view is selected.
 * Source: Jackson Palacios' resume (Senior Frontend Engineer). Bilingual: every copy has `es` and `en`.
 * Contact details (phone, personal email) are intentionally not published here.
 */
export type Bilingual = { es: string; en: string };

export type DevStat = { value: number; suffix: string; label: Bilingual; detail: Bilingual };

export type DevExperience = {
	id: string;
	company: string;
	role: Bilingual;
	period: Bilingual;
	current: boolean;
	freelance?: boolean;
	summary: Bilingual;
	highlights: Bilingual[];
	stack: string[];
};

export type DevSkillGroup = { id: string; label: Bilingual; items: string[] };

export type DevArchitectureNode = { id: string; label: string; kind: 'shell' | 'remote'; detail: Bilingual };

/**
 * Work references. Fill only with people who agreed to be contacted.
 * `contactUrl` should be a public channel they chose (e.g. LinkedIn); never a private phone or email without consent.
 */
export type DevReference = {
	name: string;
	role: Bilingual;
	company: string;
	relationship: Bilingual;
	quote?: Bilingual;
	contactLabel?: string;
	contactUrl?: string;
};

export const DEV_LINKEDIN_URL = 'https://www.linkedin.com/in/tecnojack';

export const DEV_HEADLINE = {
	eyebrow: { es: 'Ingeniero de sistemas · Desarrollador de software', en: 'Systems engineer · Software developer' },
	title: { es: 'Construyo software empresarial que escala.', en: 'I build enterprise software that scales.' },
	lead: {
		es: 'Senior Frontend Engineer, Frontend Architect y Tech Lead con más de 6 años creando, escalando y liderando aplicaciones web para banca, gestión de vuelos, gestión de riesgos, agritech y sector público. Especialista en Angular, React, TypeScript y arquitecturas Micro Frontend.',
		en: 'Senior Frontend Engineer, Frontend Architect and Tech Lead with 6+ years building, scaling and leading web applications for banking, flight management, risk management, agritech and the public sector. Specialist in Angular, React, TypeScript and Micro Frontend architectures.',
	},
	roles: ['Senior Frontend Engineer', 'Frontend Architect', 'Tech Lead', 'Full Stack Freelance'],
} as const;

export const DEV_STATS: DevStat[] = [
	{
		value: 6,
		suffix: '+',
		label: { es: 'años', en: 'years' },
		detail: { es: 'Software empresarial desde 2019', en: 'Enterprise software since 2019' },
	},
	{
		value: 4,
		suffix: '',
		label: { es: 'empresas', en: 'companies' },
		detail: { es: 'Trabajando con Micro Frontends', en: 'Working with Micro Frontends' },
	},
	{
		value: 2,
		suffix: '',
		label: { es: 'bancos', en: 'banks' },
		detail: { es: 'Banco BAM (Grupo Bancolombia) e Itaú', en: 'Banco BAM (Grupo Bancolombia) and Itaú' },
	},
	{
		value: 1,
		suffix: '',
		label: { es: 'plataforma liderada', en: 'platform led' },
		detail: { es: 'Triidy V2, como Tech Lead', en: 'Triidy V2, as Tech Lead' },
	},
];

/** Two ways to work together: as part of a company team, or as a freelance end-to-end partner. */
export const DEV_MODES = {
	company: {
		label: { es: 'Para empresas', en: 'For companies' },
		title: { es: 'Me sumo a tu equipo', en: 'I join your team' },
		text: {
			es: 'Arquitectura frontend, Micro Frontends, migraciones de Angular a React y liderazgo técnico para equipos que necesitan escalar sin frenar las entregas.',
			en: 'Frontend architecture, Micro Frontends, Angular-to-React migrations and technical leadership for teams that need to scale without slowing delivery.',
		},
		points: [
			{ es: 'Arquitectura Shell + remotes con Module Federation y Single-SPA', en: 'Shell + remotes architecture with Module Federation and Single-SPA' },
			{ es: 'Migraciones y modularización con despliegues independientes', en: 'Migrations and modularization with independent deployments' },
			{ es: 'Code review, mentoría y estándares de calidad', en: 'Code review, mentoring and quality standards' },
		],
	},
	freelance: {
		label: { es: 'Freelance · TECNOJACK', en: 'Freelance · TECNOJACK' },
		title: { es: 'Construyo tu producto de punta a punta', en: 'I build your product end to end' },
		text: {
			es: 'Aplicaciones web Full Stack para negocios: levantamiento de requisitos, arquitectura, frontend, backend, despliegue y soporte, con trato directo.',
			en: 'Full Stack web applications for businesses: requirements, architecture, frontend, backend, deployment and support, working with you directly.',
		},
		points: [
			{ es: 'Angular, React y TypeScript en el frontend', en: 'Angular, React and TypeScript on the frontend' },
			{ es: 'APIs REST con Node.js y Java Spring Boot', en: 'REST APIs with Node.js and Java Spring Boot' },
			{ es: 'Alcance, estimación y entregas iterativas', en: 'Scope, estimation and iterative delivery' },
		],
	},
};

export const DEV_EXPERIENCE: DevExperience[] = [
	{
		id: 'softgic',
		company: 'Softgic',
		role: { es: 'Frontend Developer Engineer', en: 'Frontend Developer Engineer' },
		period: { es: 'Jun 2025 – Actual', en: 'Jun 2025 – Present' },
		current: true,
		summary: {
			es: 'Soluciones frontend empresariales de alta complejidad, desde la definición técnica hasta el despliegue, en ecosistemas distribuidos con Micro Frontends.',
			en: 'High-complexity enterprise frontend solutions, from technical definition to deployment, in distributed Micro Frontend ecosystems.',
		},
		highlights: [
			{ es: 'Migración de aplicaciones de Angular a React, mejorando arquitectura, rendimiento y experiencia de usuario.', en: 'Migrating applications from Angular to React, improving architecture, performance and user experience.' },
			{ es: 'Arquitecturas Shell + remotes con React, Vite y Module Federation para productos de gestión de servicios, vuelos y riesgos.', en: 'Shell + remote architectures with React, Vite and Module Federation for service, flight and risk management products.' },
			{ es: 'Integración de seguridad con Keycloak y Duo, observabilidad con Grafana y tiempo real con SignalR y Kafka.', en: 'Security with Keycloak and Duo, observability with Grafana and real-time communication with SignalR and Kafka.' },
			{ es: 'Dashboards, mapas, reportes y módulos CRUD con roles, filtros y paginación, con pruebas unitarias en Jest.', en: 'Dashboards, maps, reports and CRUD modules with roles, filters and pagination, unit tested with Jest.' },
		],
		stack: ['Angular 17', 'React', 'TypeScript', 'Vite', 'Module Federation', 'RxJS', 'Jest', 'Keycloak', 'Grafana'],
	},
	{
		id: 'tecnojack',
		company: 'TECNOJACK',
		role: { es: 'Desarrollador Full Stack freelance', en: 'Freelance Full Stack Developer' },
		period: { es: 'Actual', en: 'Present' },
		current: true,
		freelance: true,
		summary: {
			es: 'Desarrollo de software a la medida para clientes bajo la marca TECNOJACK.',
			en: 'Custom software development for clients under the TECNOJACK brand.',
		},
		highlights: [
			{ es: 'Aplicaciones web Full Stack de punta a punta: requisitos, arquitectura, frontend, backend, despliegue y soporte.', en: 'End-to-end Full Stack web applications: requirements, architecture, frontend, backend, deployment and support.' },
			{ es: 'Interfaces modernas y responsive con Angular, React y TypeScript, y APIs REST con Node.js y Java Spring Boot.', en: 'Modern, responsive interfaces with Angular, React and TypeScript, plus REST APIs with Node.js and Java Spring Boot.' },
			{ es: 'Relación directa con el cliente: alcance, estimación, priorización y entregas iterativas.', en: 'Direct client relationship: scope, estimation, prioritization and iterative delivery.' },
		],
		stack: ['Angular', 'React', 'TypeScript', 'Node.js', 'Java Spring Boot', 'REST APIs', 'CI/CD'],
	},
	{
		id: 'triidy',
		company: 'Triidy',
		role: { es: 'Web Application Developer · Tech Lead', en: 'Web Application Developer · Tech Lead' },
		period: { es: 'Abr 2023 – Mar 2025', en: 'Apr 2023 – Mar 2025' },
		current: false,
		summary: {
			es: 'Líder técnico del área frontend: arquitectura, code review, desbloqueo del equipo y entrega de funcionalidades estratégicas.',
			en: 'Technical lead of the frontend area: architecture, code review, unblocking the team and delivering strategic features.',
		},
		highlights: [
			{ es: 'Construí la plataforma Triidy V2 de punta a punta y su migración de Angular a una arquitectura por módulos.', en: 'Built the Triidy V2 platform end to end and migrated it to a module-based Angular architecture.' },
			{ es: 'Modularización y despliegues independientes que mejoraron rendimiento, estabilidad y evolución.', en: 'Modularization and independent deployments that improved performance, stability and evolvability.' },
			{ es: 'Subí el estándar de calidad del equipo con code reviews, buenas prácticas y mentoría.', en: 'Raised the team’s quality standards through code reviews, best practices and mentoring.' },
			{ es: 'Coordinación técnica con producto, diseño y backend para alinear arquitectura y negocio.', en: 'Technical coordination with product, design and backend to align architecture with business goals.' },
		],
		stack: ['Angular', 'TypeScript', 'RxJS', 'Micro Frontends', 'CI/CD', 'GitHub', 'Jira'],
	},
	{
		id: 'agrodatai',
		company: 'AgrodatAi',
		role: { es: 'Frontend Development Engineer', en: 'Frontend Development Engineer' },
		period: { es: 'Sep 2022 – Feb 2023', en: 'Sep 2022 – Feb 2023' },
		current: false,
		summary: {
			es: 'Producto Don Tulio: investigación y análisis de datos para el sector agrícola.',
			en: 'Don Tulio product: research and data analysis for the agricultural sector.',
		},
		highlights: [
			{ es: 'Construí desde cero la arquitectura Micro Frontend con Single-SPA y Module Federation.', en: 'Built the Micro Frontend architecture from scratch with Single-SPA and Module Federation.' },
			{ es: 'Integración de APIs REST y microservicios con interfaces responsive.', en: 'Integrated REST APIs and microservices with responsive interfaces.' },
			{ es: 'Calidad con pruebas unitarias en Jest y documentación técnica para la continuidad del producto.', en: 'Quality through Jest unit tests and technical documentation for product continuity.' },
		],
		stack: ['Angular', 'TypeScript', 'Jest', 'Single-SPA', 'Module Federation', 'REST APIs'],
	},
	{
		id: 'accenture',
		company: 'Accenture',
		role: { es: 'Web Application Developer', en: 'Web Application Developer' },
		period: { es: 'May 2021 – Sep 2022', en: 'May 2021 – Sep 2022' },
		current: false,
		summary: {
			es: 'Desarrollo frontend para banca en entornos empresariales de alta exigencia.',
			en: 'Frontend development for banking in highly demanding enterprise environments.',
		},
		highlights: [
			{ es: 'Implementación de Micro Frontends para Banco BAM (Grupo Bancolombia, Guatemala), réplica de la plataforma de Bancolombia.', en: 'Micro Frontends for Banco BAM (Grupo Bancolombia, Guatemala), a replica of the Bancolombia platform.' },
			{ es: 'Pasarela de pagos y flujos de solicitud de crédito rotativo y de libre inversión para Banco Itaú.', en: 'Payment gateway and revolving and personal loan application flows for Banco Itaú.' },
			{ es: 'Pruebas unitarias, catalogación, integración continua con Jenkins y despliegues.', en: 'Unit testing, cataloging, continuous integration with Jenkins and deployments.' },
		],
		stack: ['Angular', 'TypeScript', 'Micro Frontends', 'REST APIs', 'Jenkins', 'GitHub'],
	},
	{
		id: 'enequipo',
		company: 'Enequipo S.A.S.',
		role: { es: 'Analista de desarrollo', en: 'Development Analyst' },
		period: { es: 'Oct 2019 – Jul 2020', en: 'Oct 2019 – Jul 2020' },
		current: false,
		summary: {
			es: 'Ciclo completo de desarrollo, en contacto directo con clientes.',
			en: 'Full development lifecycle, working directly with clients.',
		},
		highlights: [
			{ es: 'Levantamiento de requisitos, historias de usuario, prototipado, desarrollo en Angular, QA y documentación.', en: 'Requirements, user stories, prototyping, Angular development, QA and documentation.' },
			{ es: 'Formularios de registro de asistentes para los eventos de Inexmoda.', en: 'Attendee registration forms for Inexmoda events.' },
		],
		stack: ['Angular', 'JavaScript', 'HTML/CSS', 'Prototipado', 'QA'],
	},
];

export const DEV_SKILLS: DevSkillGroup[] = [
	{ id: 'frontend', label: { es: 'Frontend', en: 'Frontend' }, items: ['Angular (8–20)', 'React', 'TypeScript', 'JavaScript ES6+', 'RxJS', 'NgRx', 'Angular Material', 'HTML5', 'CSS3 / SCSS', 'Bootstrap'] },
	{ id: 'architecture', label: { es: 'Arquitectura', en: 'Architecture' }, items: ['Micro Frontends', 'Module Federation', 'Single-SPA', 'Shell / Remotes', 'Domain-Driven Frontend', 'Design Systems', 'Nx'] },
	{ id: 'backend', label: { es: 'Backend', en: 'Backend' }, items: ['Node.js', 'Java Spring Boot', 'REST APIs', 'Microservicios'] },
	{ id: 'quality', label: { es: 'Calidad', en: 'Quality' }, items: ['Jest', 'Jasmine', 'Karma', 'ESLint', 'Prettier', 'Code review', 'Web performance'] },
	{ id: 'devops', label: { es: 'DevOps', en: 'DevOps' }, items: ['Git', 'GitHub Actions', 'GitLab', 'Jenkins', 'Azure DevOps', 'NGINX', 'AWS (básico)'] },
	{ id: 'integration', label: { es: 'Integración', en: 'Integration' }, items: ['Keycloak', 'Duo', 'SignalR', 'Kafka', 'Grafana'] },
	{ id: 'tools', label: { es: 'Herramientas', en: 'Tools' }, items: ['Vite', 'Figma', 'Adobe XD', 'Jira', 'Postman', 'Chrome DevTools'] },
];

/** Interactive "how a Micro Frontend platform fits together" diagram. */
export const DEV_ARCHITECTURE: DevArchitectureNode[] = [
	{
		id: 'shell',
		label: 'Shell',
		kind: 'shell',
		detail: {
			es: 'La aplicación anfitriona: autenticación, navegación y diseño compartido. Carga cada módulo en tiempo de ejecución.',
			en: 'The host app: authentication, navigation and shared design. It loads every module at runtime.',
		},
	},
	{
		id: 'payments',
		label: 'Pagos',
		kind: 'remote',
		detail: {
			es: 'Un equipo lo despliega por su cuenta, sin esperar al resto. Así trabajé la pasarela de pagos de Itaú.',
			en: 'One team deploys it on its own, without waiting for the rest. This is how I worked on Itaú’s payment gateway.',
		},
	},
	{
		id: 'dashboards',
		label: 'Dashboards',
		kind: 'remote',
		detail: {
			es: 'Reportes, mapas y métricas en tiempo real (SignalR, Kafka) como un remoto independiente.',
			en: 'Reports, maps and real-time metrics (SignalR, Kafka) as an independent remote.',
		},
	},
	{
		id: 'auth',
		label: 'Seguridad',
		kind: 'remote',
		detail: {
			es: 'Inicio de sesión y roles con Keycloak y Duo, compartidos por todos los módulos.',
			en: 'Sign-in and roles with Keycloak and Duo, shared by every module.',
		},
	},
	{
		id: 'legacy',
		label: 'Legado → React',
		kind: 'remote',
		detail: {
			es: 'Migración gradual: un módulo en Angular se reemplaza por uno en React sin detener la plataforma.',
			en: 'Gradual migration: an Angular module is replaced with a React one without stopping the platform.',
		},
	},
];

export const DEV_EDUCATION = {
	degrees: [
		{ title: { es: 'Ingeniería de Sistemas', en: 'B.S. in Systems Engineering' }, place: 'Corporación Universitaria Adventista (UNAC) · Medellín' },
		{ title: { es: 'Técnico en Electrónica', en: 'Technical High School Diploma in Electronics' }, place: 'I.E. San Pablo Industrial · Istmina, Chocó' },
	],
	certifications: [
		'LinkedIn Learning · Leadership and Teamwork (2024)',
		'LinkedIn Learning · Advanced JavaScript (2023)',
		'LinkedIn Learning · Software Architecture: Essential Patterns (2023)',
		'LinkedIn Learning · GitHub for Programmers (2023)',
		'Udemy · Angular: Tips and Tricks (2022)',
		'Udemy · Angular from Zero to Expert (2021)',
	],
	languages: [
		{ es: 'Español · nativo', en: 'Spanish · native' },
		{ es: 'Inglés · B1', en: 'English · B1' },
		{ es: 'Lengua de Señas Colombiana · básico', en: 'Colombian Sign Language · basic' },
	],
};

/** Work references: add people as they authorize it. Empty → the section shows "available on request". */
export const DEV_REFERENCES: DevReference[] = [];
