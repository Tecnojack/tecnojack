import { XV_GUEST_GROUPS, XV_EVENT_CONFIG } from './src/app/core/data/xv-invitation-data';

function formatGuestNamesList(guests: string[]): string {
  if (!guests || guests.length === 0) return '';
  if (guests.length === 1) return guests[0];
  if (guests.length === 2) return `${guests[0]} y ${guests[1]}`;

  const initial = guests.slice(0, guests.length - 1).join(', ');
  const last = guests[guests.length - 1];
  return `${initial} y ${last}`;
}

function getWhatsAppLink(group: typeof XV_GUEST_GROUPS[0]): string {
  const cleanPhone = XV_EVENT_CONFIG.whatsappNumber.replace(/\D/g, '');
  const fullPhone = `57${cleanPhone}`;

  let message = '';

  if (group.guestCount === 1) {
    const name = group.guests[0] || 'Invitado';
    message = `Hola, confirmo mi asistencia a la celebración de 15 años del ${XV_EVENT_CONFIG.dateText}. Soy ${name}.`;
  } else {
    const namesFormatted = formatGuestNamesList(group.guests);
    message = `Hola, confirmamos nuestra asistencia a la celebración de 15 años del ${XV_EVENT_CONFIG.dateText}. Esta invitación corresponde a ${namesFormatted}, para ${group.guestCount} personas.`;
  }

  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}

console.log('=== VALIDACIÓN PROGRAMÁTICA Y AUDITORÍA DE DATO DE INVITACIONES 15 AÑOS ===');
console.log(`Número total de invitaciones/bloques: ${XV_GUEST_GROUPS.length}`);

const totalGuests = XV_GUEST_GROUPS.reduce((acc, g) => acc + g.guestCount, 0);
console.log(`Suma programática total de guestCount: ${totalGuests}`);

console.log('\n--- VERIFICACIÓN DE EJEMPLOS REPRESENTATIVOS ---');

const testSlugs = [
  'elizabeth-villada',
  'fiorella-alvarez-noa-zambrano',
  'mariana-garzon-matias-holguin-wilson-gomez',
  'sandra-yepes',
  'xiomara-bermudez',
  'sara-zapata'
];

testSlugs.forEach(slug => {
  const g = XV_GUEST_GROUPS.find(item => item.slug === slug);
  if (g) {
    console.log(`\nSlug: ${g.slug}`);
    console.log(`Invitados (${g.guestCount} cupos):`, g.guests.join(' | '));
    if (g.note) console.log(`Nota especial:`, g.note);
    console.log(`Link WhatsApp:`, getWhatsAppLink(g));
  }
});
