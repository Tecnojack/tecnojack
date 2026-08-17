import { XvEventConfig, XvGuestGroup } from '../models/xv-invitation.model';

export const XV_EVENT_CONFIG: XvEventConfig = {
  eventType: 'Celebración de 15 años',
  celebrantName: 'Isabella Bermúdez',
  dateText: '4 de octubre de 2026',
  dateDayName: 'Domingo',
  timeText: '07:00 PM',
  targetDateTime: '2026-10-04T19:00:00-05:00',
  venueName: 'Aves de Jerusalen',
  venueAddress: 'Aves de Jerusalen',
  mapCoordinates: {
    lat: 6.2442,
    lng: -75.5812
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aves+de+Jerusalen',
  rsvpDeadlineText: '10 de septiembre de 2026',
  whatsappNumber: '3017477950',
  whatsappIntlNumber: '+57 301 747 7950',
  reservedColors: [
    { name: 'Verde', hex: '#2D5A27', description: 'Tono reservado para la celebración' },
    { name: 'Azul', hex: '#1D4ED8', description: 'Tono reservado para la celebración' },
    { name: 'Beige', hex: '#D8CAB8', description: 'Tono reservado para la celebración' }
  ],
  giftMessage:
    'Tu presencia es el regalo más hermoso y valioso que puedo recibir en mis 15 años. Si deseas hacerme un presente, he elegido la modalidad de lluvia de sobres, que recibiré con todo mi corazón y gratitud.',
  quoteMessage:
    'Hay momentos en la vida que son inolvidables, y compartirlos con quienes más quiero los hace realmente mágicos. Te espero para celebrar juntos mi noche de 15 años.',
  coverImage: 'assets/images/fotos/quinceanera.jpg'
};

export const XV_GUEST_GROUPS: XvGuestGroup[] = [
  {
    id: 'inv-001',
    slug: 'fiorella-alvarez-noa-zambrano',
    guests: ['Fiorella Alvarez', 'Noa Zambrano'],
    guestCount: 2
  },
  {
    id: 'inv-002',
    slug: 'elizabeth-villada',
    guests: ['Elizabeth Villada'],
    guestCount: 1
  },
  {
    id: 'inv-003',
    slug: 'valentina-ruiz',
    guests: ['Valentina Ruiz'],
    guestCount: 1
  },
  {
    id: 'inv-004',
    slug: 'sofia-fernandez-emely-fernandez',
    guests: ['Sofia Fernandez', 'Emely Fernandez'],
    guestCount: 2
  },
  {
    id: 'inv-005',
    slug: 'valeria-requena',
    guests: ['Valeria Requena'],
    guestCount: 1
  },
  {
    id: 'inv-006',
    slug: 'alina-gutierrez',
    guests: ['Alina Gutierrez'],
    guestCount: 1
  },
  {
    id: 'inv-007',
    slug: 'ana-isabel-giraldo',
    guests: ['Ana Isabel Giraldo'],
    guestCount: 1
  },
  {
    id: 'inv-008',
    slug: 'mailen-feria',
    guests: ['Mailen Feria'],
    guestCount: 1
  },
  {
    id: 'inv-009',
    slug: 'maria-fernanda-quintero',
    guests: ['Maria Fernanda Quintero'],
    guestCount: 1
  },
  {
    id: 'inv-010',
    slug: 'santiago-deossa',
    guests: ['Santiago Deossa'],
    guestCount: 1
  },
  {
    id: 'inv-011',
    slug: 'juanes-diaz',
    guests: ['Juanes Diaz'],
    guestCount: 1
  },
  {
    id: 'inv-012',
    slug: 'lina-soler',
    guests: ['Lina Soler'],
    guestCount: 1
  },
  {
    id: 'inv-013',
    slug: 'mariana-osorio',
    guests: ['Mariana Osorio'],
    guestCount: 1
  },
  {
    id: 'inv-014',
    slug: 'juanita-torres',
    guests: ['Juanita Torres'],
    guestCount: 1
  },
  {
    id: 'inv-015',
    slug: 'juan-bocanegra',
    guests: ['Juan Bocanegra'],
    guestCount: 1
  },
  {
    id: 'inv-016',
    slug: 'juan-camilo-baquero',
    guests: ['Juan Camilo Baquero'],
    guestCount: 1
  },
  {
    id: 'inv-017',
    slug: 'juanes-millan-dana-millan',
    guests: ['Juanes Millan', 'Dana Millan'],
    guestCount: 2
  },
  {
    id: 'inv-018',
    slug: 'sandra-yepes',
    guests: [
      'Sandra Yepes',
      'John Jairo Bermudez',
      'Samuel Bermudez',
      'Eliana Bermudez'
    ],
    guestCount: 4
  },
  {
    id: 'inv-019',
    slug: 'mariana-garzon-matias-holguin-wilson-gomez',
    guests: ['Mariana Garzon', 'Matias Holguin', 'Wilson Gómez'],
    guestCount: 3
  },
  {
    id: 'inv-020',
    slug: 'elvia-elena-yepes-mateo-garzon',
    guests: ['Elvia Elena Yepes', 'Mateo Garzón'],
    guestCount: 2
  },
  {
    id: 'inv-021',
    slug: 'felipe-garzon-valentina-martinez',
    guests: ['Felipe Garzón', 'Valentina Martinez'],
    guestCount: 2
  },
  {
    id: 'inv-022',
    slug: 'arelis-molina-elkin-barros-santiago-barros',
    guests: ['Arelis Molina', 'Elkin Barros', 'Santiago Barros'],
    guestCount: 3
  },
  {
    id: 'inv-023',
    slug: 'carolina-arrubla-diana-rios',
    guests: ['Carolina Arrubla', 'Diana Rios'],
    guestCount: 2
  },
  {
    id: 'inv-024',
    slug: 'elizabeth-cano-fany-mejia-dario-ospina',
    guests: ['Elizabeth Cano', 'Fany Mejia', 'Dario Ospina'],
    guestCount: 3
  },
  {
    id: 'inv-025',
    slug: 'diana-ospina-bernabe-bustamante',
    guests: ['Diana Ospina', 'Bernabe Bustamante'],
    guestCount: 2
  },
  {
    id: 'inv-026',
    slug: 'natalia-ospina',
    guests: ['Natalia Ospina'],
    guestCount: 1
  },
  {
    id: 'inv-027',
    slug: 'daniel-ospina',
    guests: [
      'Daniel Ospina',
      'Doria Arrieta',
      'Juan Pablo Ospina',
      'Andres Felie Ospina'
    ],
    guestCount: 4
  },
  {
    id: 'inv-028',
    slug: 'socorro-bermudez-jhon-jairo-giraldo',
    guests: ['Socorro Bermudez', 'Jhon Jairo Giraldo'],
    guestCount: 2
  },
  {
    id: 'inv-029',
    slug: 'mauricio-giraldo-joan-torres',
    guests: ['Mauricio Giraldo', 'Joan Torres'],
    guestCount: 2
  },
  {
    id: 'inv-030',
    slug: 'arlen-restrepo',
    guests: [
      'Arlen Restrepo',
      'Tatian Aleman',
      'Jose David Restrepo',
      'Manuela Restrepo'
    ],
    guestCount: 4
  },
  {
    id: 'inv-031',
    slug: 'jose-bermudez',
    guests: ['Jose Bermudez'],
    guestCount: 1
  },
  {
    id: 'inv-032',
    slug: 'saul-bermudez-dexcy-coromoto',
    guests: ['Saul Bermudez', 'Dexcy Coromoto'],
    guestCount: 2
  },
  {
    id: 'inv-033',
    slug: 'duvan-bermudez-leidy-zapata',
    guests: ['Duvan Bermudez', 'Leidy Zapata'],
    guestCount: 2
  },
  {
    id: 'inv-034',
    slug: 'robinson-bermudez',
    guests: [
      'Robinson Bermudez',
      'Sandra Castaño',
      'Miguel Angel Bermudez'
    ],
    guestCount: 3
  },
  {
    id: 'inv-035',
    slug: 'arley-bermudez',
    guests: ['Arley Bermudez'],
    guestCount: 1
  },
  {
    id: 'inv-036',
    slug: 'solangel-londono',
    guests: [
      'Solangel Londoño',
      'Luz Adriana Bermudez',
      'Jhon Alexander Bermudez'
    ],
    guestCount: 3
  },
  {
    id: 'inv-037',
    slug: 'lina-garcia-luciana-galeano',
    guests: ['Lina Garcia', 'Luciana Galeano'],
    guestCount: 2
  },
  {
    id: 'inv-038',
    slug: 'carlos-bermudez',
    guests: ['Carlos Bermudez', 'Elcy Quiroz', 'Johana Bermudez'],
    guestCount: 3
  },
  {
    id: 'inv-039',
    slug: 'xiomara-bermudez',
    guests: [
      'Xiomara Bermudez',
      'Elkin Angel',
      'Julian Angel',
      'Veronica Angel',
      'Martin Angel'
    ],
    guestCount: 5
  },
  {
    id: 'inv-040',
    slug: 'kedwin-gonzalez',
    guests: ['Kedwin Gonzalez'],
    guestCount: 1
  },
  {
    id: 'inv-041',
    slug: 'sara-garcia-brian-garcia',
    guests: ['Sara Garcia', 'Brian Garcia'],
    guestCount: 2
  },
  {
    id: 'inv-042',
    slug: 'sara-zapata',
    guests: ['Sara Zapata', 'Jeferson Orozco'],
    guestCount: 2,
    note: 'Sara Zapata + (baby)'
  },
  {
    id: 'inv-043',
    slug: 'maria-fernanda-horta-nicolas-useche',
    guests: ['Maria Fernanda Horta', 'Nicolas Useche'],
    guestCount: 2
  },
  {
    id: 'inv-044',
    slug: 'sindy-giraldo',
    guests: ['Sindy Giraldo', 'David Rodriguez', 'Nicolas Castrillon'],
    guestCount: 3
  },
  {
    id: 'inv-045',
    slug: 'yesenia-gomez',
    guests: ['Yesenia Gomez'],
    guestCount: 1
  },
  {
    id: 'inv-046',
    slug: 'valentina-aristizabal',
    guests: ['Valentina Aristizabal'],
    guestCount: 1
  },
  {
    id: 'inv-047',
    slug: 'camila-arbelaez',
    guests: ['Camila Arbelaez'],
    guestCount: 1
  },
  {
    id: 'inv-048',
    slug: 'michel-rodas',
    guests: ['Michel Rodas'],
    guestCount: 1
  },
  {
    id: 'inv-049',
    slug: 'isabel-sierra',
    guests: ['Isabel Sierra'],
    guestCount: 1
  },
  {
    id: 'inv-050',
    slug: 'rosa-gomez',
    guests: ['Rosa Gomez'],
    guestCount: 1
  },
  {
    id: 'inv-051',
    slug: 'catalina-londono',
    guests: ['Catalina Londoño'],
    guestCount: 1
  },
  {
    id: 'inv-052',
    slug: 'edwar-ospina',
    guests: ['Edwar Ospina'],
    guestCount: 1
  },
  {
    id: 'inv-053',
    slug: 'marlon-duque',
    guests: ['Marlon Duque'],
    guestCount: 1
  },
  {
    id: 'inv-054',
    slug: 'daniela-quintero',
    guests: ['Daniela Quintero'],
    guestCount: 1
  },
  {
    id: 'inv-055',
    slug: 'nancy-rueda-alejandro-echeverri',
    guests: ['Nancy Rueda', 'Alejandro Echeverri'],
    guestCount: 2
  }
];
