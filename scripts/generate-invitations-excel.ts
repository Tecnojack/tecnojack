import * as fs from 'fs';
import * as path from 'path';
import { XV_GUEST_GROUPS, XV_EVENT_CONFIG } from '../src/app/core/data/xv-invitation-data';

const PROD_BASE = 'https://tecnojack.co/xv/isabella-bermudez';
const LOCAL_BASE = 'http://localhost:4205/xv/isabella-bermudez';

// 1. GENERAR ARCHIVO CSV CON BOM UTF-8 (Compatible directo con Excel)
let csvContent = '\uFEFF'; // BOM
csvContent += 'No.,Tipo,Cupos,Nombre Principal / Grupo,Invitados Detallados,Nota Especial,Enlace Producción (tecnojack.co),Enlace Local (localhost:4205)\r\n';

XV_GUEST_GROUPS.forEach((g, index) => {
  const num = index + 1;
  const tipo = g.guestCount === 1 ? 'Individual' : 'Grupal';
  const cupos = g.guestCount;
  const principal = g.guests[0];
  const detallados = `"${g.guests.join(' | ')}"`;
  const nota = g.note ? `"${g.note}"` : '""';
  const prodLink = `${PROD_BASE}/${g.slug}/${g.guestCount}`;
  const localLink = `${LOCAL_BASE}/${g.slug}/${g.guestCount}`;

  csvContent += `${num},${tipo},${cupos},"${principal}",${detallados},${nota},"${prodLink}","${localLink}"\r\n`;
});

const csvPath = path.join(__dirname, '../docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.csv');
fs.writeFileSync(csvPath, csvContent, 'utf-8');
console.log(`CSV generado exitosamente en: ${csvPath}`);

// 2. GENERAR EXCEL XML WORKBOOK (.xls / .xlsx compatible nativo con estilos y links)
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
   <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#FFFFFF"/>
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
  <Table ss:ExpandedColumnCount="8" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="24">
   <Column ss:Width="40"/>
   <Column ss:Width="80"/>
   <Column ss:Width="50"/>
   <Column ss:Width="160"/>
   <Column ss:Width="260"/>
   <Column ss:Width="130"/>
   <Column ss:Width="300"/>
   <Column ss:Width="280"/>

   <Row ss:Height="40">
    <Cell ss:MergeAcross="7" ss:StyleID="HeaderTitle"><Data ss:Type="String">LISTA OFICIAL DE INVITADOS — 15 AÑOS ISABELLA BERMÚDEZ (Total: 98 Pases)</Data></Cell>
   </Row>

   <Row ss:Height="28">
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">No.</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Tipo</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Cupos</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Nombre Principal / Grupo</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Invitados Detallados</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Nota Especial</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Enlace de Invitación (Producción)</Data></Cell>
    <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">Enlace Local de Prueba</Data></Cell>
   </Row>
`;

XV_GUEST_GROUPS.forEach((g, index) => {
  const num = index + 1;
  const isInd = g.guestCount === 1;
  const rowStyle = isInd ? 'RowIndividual' : 'RowGrupal';
  const prodLink = `${PROD_BASE}/${g.slug}/${g.guestCount}`;
  const localLink = `${LOCAL_BASE}/${g.slug}/${g.guestCount}`;

  xmlContent += `   <Row ss:Height="24">
    <Cell ss:StyleID="CenterCell"><Data ss:Type="Number">${num}</Data></Cell>
    <Cell ss:StyleID="CenterCell"><Data ss:Type="String">${isInd ? 'Individual' : 'Grupal'}</Data></Cell>
    <Cell ss:StyleID="CuposCell"><Data ss:Type="Number">${g.guestCount}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.guests[0]}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.guests.join(', ')}</Data></Cell>
    <Cell ss:StyleID="${rowStyle}"><Data ss:Type="String">${g.note || '-'}</Data></Cell>
    <Cell ss:StyleID="LinkCell" ss:HRef="${prodLink}"><Data ss:Type="String">${prodLink}</Data></Cell>
    <Cell ss:StyleID="LinkCell" ss:HRef="${localLink}"><Data ss:Type="String">${localLink}</Data></Cell>
   </Row>
`;
});

xmlContent += `  </Table>
 </Worksheet>
</Workbook>`;

const xlsPath = path.join(__dirname, '../docs/LISTA_INVITADOS_15_ANOS_ISABELLA_BERMUDEZ.xls');
fs.writeFileSync(xlsPath, xmlContent, 'utf-8');
console.log(`Excel generado exitosamente en: ${xlsPath}`);
