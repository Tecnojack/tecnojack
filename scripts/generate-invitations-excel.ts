import * as fs from 'fs';
import * as path from 'path';
import { XV_GUEST_GROUPS, XV_EVENT_CONFIG } from '../src/app/core/data/xv-invitation-data';

const PROD_BASE = 'https://tecnojack.co/xv/isabella-bermudez';

// 1. GENERAR ARCHIVO CSV CON BOM UTF-8 (Compatible directo con Microsoft Excel)
let csvContent = '\uFEFF'; // BOM
csvContent += 'No.,Tipo,Cupos,Nombre Principal / Grupo,Invitados Detallados,Nota Especial,Enlace Directo de Invitación\r\n';

XV_GUEST_GROUPS.forEach((g, index) => {
  const num = index + 1;
  const tipo = g.guestCount === 1 ? 'Individual' : 'Grupal';
  const cupos = g.guestCount;
  const principal = g.guests[0];
  const detallados = `"${g.guests.join(' | ')}"`;
  const nota = g.note ? `"${g.note}"` : '""';
  const prodLink = `${PROD_BASE}/${g.slug}/${g.guestCount}`;

  csvContent += `${num},${tipo},${cupos},"${principal}",${detallados},${nota},"${prodLink}"\r\n`;
});

const csvPath = path.join(__dirname, '../docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.csv');
fs.writeFileSync(csvPath, csvContent, 'utf-8');
console.log(`CSV cliente generado exitosamente en: ${csvPath}`);

// 2. GENERAR EXCEL WORKBOOK CLIENT-READY (.xls compatible nativo con estilos y links)
let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
  </Style>
  <Style ss:ID="HeaderTitle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="15" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#384C32" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="HeaderCol">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#4E6646" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#C5A467"/>
   </Borders>
  </Style>
  <Style ss:ID="RowIndividual">
   <Alignment ss:Vertical="Center"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="RowGrupal">
   <Alignment ss:Vertical="Center"/>
   <Interior ss:Color="#F4F7F2" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="CenterCell">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="CuposCell">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1" ss:Color="#384C32"/>
  </Style>
  <Style ss:ID="LinkCell">
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1D4ED8" ss:Underline="Single"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Invitaciones XV Isabella">
  <Table ss:ExpandedColumnCount="7" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="24">
   <Column ss:Width="40"/>
   <Column ss:Width="80"/>
   <Column ss:Width="50"/>
   <Column ss:Width="170"/>
   <Column ss:Width="280"/>
   <Column ss:Width="140"/>
   <Column ss:Width="360"/>

   <Row ss:Height="40">
    <Cell ss:MergeAcross="6" ss:StyleID="HeaderTitle"><Data ss:Type="String">LISTA OFICIAL DE INVITACIONES — 15 AÑOS ISABELLA BERMÚDEZ (Total: 98 Pases)</Data></Cell>
   </Row>

   <Row ss:Height="28">
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">No.</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Tipo</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Cupos</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Nombre Principal / Grupo</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Invitados Detallados</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Nota Especial</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Enlace Directo de la Invitación Web</Data></Cell>
   </Row>
`;

XV_GUEST_GROUPS.forEach((g, index) => {
  const num = index + 1;
  const isInd = g.guestCount === 1;
  const rowStyle = isInd ? 'RowIndividual' : 'RowGrupal';
  const prodLink = `${PROD_BASE}/${g.slug}/${g.guestCount}`;

  xmlContent += `   <Row ss:Height="24">
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${num}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${isInd ? 'Individual' : 'Grupal'}</Data></Cell>
    <Cell ss:StyleID="CuposCell"><Data ss:Type="Number">${g.guestCount}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.guests[0]}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.guests.join(', ')}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.note || '-'}</Data></Cell>
    <Cell ss:StyleID="LinkCell" ss:HRef="${prodLink}"><Data ss:Type="String">${prodLink}</Data></Cell>
   </Row>
`;
});

xmlContent += `  </Table>
 </Worksheet>
</Workbook>`;

const xlsPath = path.join(__dirname, '../docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.xls');
fs.writeFileSync(xlsPath, xmlContent, 'utf-8');
console.log(`Excel cliente generado exitosamente en: ${xlsPath}`);

// 3. GENERAR DOCUMENTO MARKDOWN CON MENSAJES DE WHATSAPP LISTOS PARA ENVIAR
function formatGuestNamesForGreeting(guests: string[]): string {
  if (!guests || guests.length === 0) return '';
  if (guests.length === 1) return guests[0];
  if (guests.length === 2) return `${guests[0]} y ${guests[1]}`;
  const initial = guests.slice(0, guests.length - 1).join(', ');
  const last = guests[guests.length - 1];
  return `${initial} y ${last}`;
}

let wspContent = `# MENSAJES DE WHATSAPP LISTOS PARA ENVIAR
### 👑 15 Años de Isabella Bermúdez — 4 de Octubre de 2026
*Total de invitaciones:* 55  
*Total de cupos:* 98  

> **Instrucciones:** Copia y pega el mensaje correspondiente a cada invitado o familia directamente en su chat de WhatsApp.

---

`;

XV_GUEST_GROUPS.forEach((g, index) => {
  const num = index + 1;
  const isSingle = g.guestCount === 1;
  const greetingNames = formatGuestNamesForGreeting(g.guests);
  const link = `${PROD_BASE}/${g.slug}/${g.guestCount}`;
  const pasesText = isSingle ? '1 Pase Reservado' : `${g.guestCount} Pases Reservados`;
  const saludo = isSingle ? `¡Hola ${g.guests[0]}! ✨` : `¡Hola ${greetingNames}! ✨`;
  const cuerpo = isSingle
    ? 'Hay momentos en la vida que son inolvidables, y compartirlos con quienes más quiero los hace realmente mágicos. Con mucha alegría te invito a celebrar mi noche de 15 años.'
    : 'Hay momentos en la vida que son inolvidables, y compartirlos con quienes más quiero los hace realmente mágicos. Con mucha alegría los invito a celebrar mi noche de 15 años.';
  const despedida = isSingle
    ? '¡Espero verte para celebrar juntos esta noche mágica! 🌸'
    : '¡Espero verlos para celebrar juntos esta noche mágica! 🌸';

  wspContent += `### ${num}. ${g.guests.join(', ')} (${pasesText})
\`\`\`text
👑 *MIS 15 AÑOS — ISABELLA BERMÚDEZ* 👑

${saludo}

${cuerpo}

💌 *Tu invitación personalizada (${pasesText}):*
${link}

${despedida}
\`\`\`

---

`;
});

const wspPath = path.join(__dirname, '../docs/MENSAJES_WHATSAPP_INVITADOS_ISABELLA.md');
fs.writeFileSync(wspPath, wspContent, 'utf-8');
console.log(`Documento de mensajes de WhatsApp generado exitosamente en: ${wspPath}`);

// 4. ACTUALIZAR LISTA MARKDOWN PRINCIPAL
let mdContent = `# LISTA OFICIAL DE INVITACIONES — 15 AÑOS ISABELLA BERMÚDEZ
**Total de invitaciones:** 55  
**Total de cupos / pases:** 98  
**Fecha:** Domingo, 4 de Octubre de 2026 — 7:00 PM  
**Lugar:** Aves de Jerusalén Eventos, San Jerónimo, Antioquia  

### Archivos descargables:
- 📊 **Excel Workbook (.xls):** [\`LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.xls\`](file:///d:/TECNOJACK/docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.xls)
- 📄 **Archivo CSV (.csv):** [\`LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.csv\`](file:///d:/TECNOJACK/docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.csv)
- 💬 **Mensajes de WhatsApp listos:** [\`MENSAJES_WHATSAPP_INVITADOS_ISABELLA.md\`](file:///d:/TECNOJACK/docs/MENSAJES_WHATSAPP_INVITADOS_ISABELLA.md)

---

## 1. INVITACIONES INDIVIDUALES (1 Pase) — 28 Invitados

| No. | Invitado | Cupos | Enlace Directo de Invitación |
|:---:|---|:---:|---|
`;

XV_GUEST_GROUPS.filter((g) => g.guestCount === 1).forEach((g, i) => {
  const num = i + 1;
  const link = `${PROD_BASE}/${g.slug}/${g.guestCount}`;
  mdContent += `| ${num} | ${g.guests[0]} | 1 | [${link}](${link}) |\n`;
});

mdContent += `
---

## 2. INVITACIONES GRUPALES (2 a 5 Pases) — 27 Invitaciones (70 Pases)

| No. | Grupo / Familia | Cupos | Invitados Detallados | Enlace Directo de Invitación |
|:---:|---|:---:|---|---|
`;

XV_GUEST_GROUPS.filter((g) => g.guestCount > 1).forEach((g, i) => {
  const num = i + 29;
  const link = `${PROD_BASE}/${g.slug}/${g.guestCount}`;
  const note = g.note ? ` (${g.note})` : '';
  mdContent += `| ${num} | ${g.guests[0]} y Familia | ${g.guestCount} | ${g.guests.join(', ')}${note} | [${link}](${link}) |\n`;
});

const mainMdPath = path.join(__dirname, '../docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.md');
fs.writeFileSync(mainMdPath, mdContent, 'utf-8');
console.log(`Markdown principal generado exitosamente en: ${mainMdPath}`);
