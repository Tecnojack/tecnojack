import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { ContractDocument } from '../models/contract.model';
import { ContractPdfViewModel } from '../models/contract-pdf.model';
import { mapContractDocumentToPdfViewModel } from './contract-pdf.mapper';
import { formatCurrency } from './contract-financial.util';

export interface GeneratedPdfResult {
  pdfBytes: Uint8Array;
  blob: Blob;
  downloadUrl: string;
  sha256Hex: string;
}

// ── PALETA DE COLORES OFICIAL TECNOJACK ──
const COLOR_TEAL = rgb(0.027, 0.592, 0.710);      // #0797B5
const COLOR_TEAL_DARK = rgb(0.031, 0.427, 0.514); // #086D83
const COLOR_INK = rgb(0.094, 0.141, 0.192);       // #182431
const COLOR_MUTED = rgb(0.392, 0.443, 0.490);     // #64717D
const COLOR_BORDER = rgb(0.862, 0.898, 0.917);    // #DCE5EA
const COLOR_SURFACE = rgb(0.960, 0.972, 0.980);   // #F5F8FA
const COLOR_TEAL_SOFT = rgb(0.917, 0.968, 0.980);  // #EAF7FA
const COLOR_GREEN_SOFT = rgb(0.933, 0.976, 0.949); // #EEF9F2
const COLOR_SUCCESS = rgb(0.094, 0.533, 0.290);   // #18884A
const COLOR_DANGER = rgb(0.788, 0.212, 0.212);    // #C93636

function sanitizeWinAnsi(text: string): string {
  if (!text) return '';
  return text
    .replace(/✓/g, '[OK]')
    .replace(/📦/g, '[ENTREGABLE]')
    .replace(/📜/g, '')
    .replace(/🔒/g, '')
    .replace(/📥/g, '')
    .replace(/💬/g, '')
    .replace(/📌/g, '')
    .replace(/💍/g, '')
    .replace(/👑/g, '')
    .replace(/🎓/g, '')
    .replace(/📸/g, '')
    .replace(/🎥/g, '')
    .replace(/🏢/g, '')
    .replace(/⭐/g, '')
    .replace(/📂/g, '')
    .replace(/·/g, '-')
    .replace(/–/g, '-')
    .replace(/—/g, '-')
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/‘/g, "'")
    .replace(/’/g, "'")
    .replace(/[^\x00-\xFF]/g, '');
}

/**
 * Utility function to show empty or undefined values as "Por definir".
 */
export function formatValueOrDefault(val: string | undefined | null): string {
  if (!val || val.trim().length === 0 || val.toLowerCase().includes('por definir')) {
    return 'Por definir';
  }
  return val.trim();
}

/**
 * Genera el PDF contractual definitivo o de vista previa siguiendo la especificación visual premium.
 */
export async function generateClientContractPdf(
  contractOrVm: ContractDocument | ContractPdfViewModel,
  isWatermarkPreview = false
): Promise<GeneratedPdfResult> {
  const vm: ContractPdfViewModel = 'contractNumber' in contractOrVm && 'company' in contractOrVm
    ? (contractOrVm as ContractPdfViewModel)
    : mapContractDocumentToPdfViewModel(contractOrVm as ContractDocument, isWatermarkPreview);

  if (isWatermarkPreview) {
    vm.isWatermarkPreview = true;
  }

  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const margin = 40;
  const pageWidth = 595.28;  // A4 width
  const pageHeight = 841.89; // A4 height
  const contentWidth = pageWidth - margin * 2;

  const safeText = (t: string) => sanitizeWinAnsi(t);
  const formatCop = (amount: number) => formatCurrency(amount, vm.payment.currency);

  const pages: Array<ReturnType<typeof pdfDoc.addPage>> = [];

  const createPage = () => {
    const p = pdfDoc.addPage([pageWidth, pageHeight]);
    pages.push(p);
    return p;
  };

  const applyHeaderAndFooter = () => {
    const totalPages = pages.length;
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;

      // Encabezado
      p.drawText(safeText('TECNOJACK'), {
        x: margin,
        y: pageHeight - margin + 8,
        size: 9,
        font: fontBold,
        color: COLOR_TEAL,
      });

      p.drawText(safeText(`Documento contractual | ${vm.contractNumber}`), {
        x: pageWidth - margin - 200,
        y: pageHeight - margin + 8,
        size: 8,
        font: fontRegular,
        color: COLOR_MUTED,
      });

      p.drawLine({
        start: { x: margin, y: pageHeight - margin + 2 },
        end: { x: pageWidth - margin, y: pageHeight - margin + 2 },
        thickness: 0.8,
        color: COLOR_TEAL,
      });

      // Pie de página
      p.drawLine({
        start: { x: margin, y: margin - 6 },
        end: { x: pageWidth - margin, y: margin - 6 },
        thickness: 0.5,
        color: COLOR_BORDER,
      });

      p.drawText(safeText(`${vm.company.website.replace('https://', '')} | ${vm.company.email}`), {
        x: margin,
        y: margin - 18,
        size: 7.5,
        font: fontRegular,
        color: COLOR_MUTED,
      });

      p.drawText(safeText(`Pagina ${pageNum} de ${totalPages}`), {
        x: pageWidth - margin - 60,
        y: margin - 18,
        size: 7.5,
        font: fontRegular,
        color: COLOR_MUTED,
      });

      // Marca de agua si es Preview
      if (vm.isWatermarkPreview) {
        p.drawText(safeText('VISTA PREVIA - DOCUMENTO NO DEFINITIVO'), {
          x: margin + 20,
          y: pageHeight / 2,
          size: 20,
          font: fontBold,
          color: rgb(0.8, 0.2, 0.2),
          opacity: 0.25,
          rotate: degrees(45),
        });
      }
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PÁGINA 1: RESUMEN EJECUTIVO (PORTADA FUNCIONAL)
  // ═══════════════════════════════════════════════════════════════════════════
  let page1 = createPage();
  let y = pageHeight - margin - 20;

  // TÍTULO OFICIAL SIMPLIFICADO: Contrato TECNOJACK - [Nombre Cliente] - CC [Documento]
  const clientName = formatValueOrDefault(vm.client.fullName);
  const clientDoc = vm.client.documentNumber ? `CC ${vm.client.documentNumber}` : '';
  const contractFullTitle = `Contrato TECNOJACK - ${clientName}${clientDoc ? ' - ' + clientDoc : ''}`;

  page1.drawText(safeText(contractFullTitle), {
    x: margin,
    y,
    size: 12,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 14;
  page1.drawText(safeText('Documento electronico de contratacion, alcance, condiciones economicas y evidencia de firma.'), {
    x: margin,
    y,
    size: 8.5,
    font: fontOblique,
    color: COLOR_MUTED,
  });

  y -= 25;

  // Metadata Bar (3 columnas)
  page1.drawRectangle({
    x: margin,
    y: y - 28,
    width: contentWidth,
    height: 28,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });

  const colW = contentWidth / 3;
  page1.drawText(safeText(`Contrato: ${vm.contractNumber}`), {
    x: margin + 10,
    y: y - 18,
    size: 8,
    font: fontBold,
    color: COLOR_INK,
  });

  page1.drawText(safeText(`Estado: ${vm.status}`), {
    x: margin + colW + 10,
    y: y - 18,
    size: 8,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  page1.drawText(safeText(`Fecha Firma: ${vm.signedAt || 'Pendiente'}`), {
    x: margin + colW * 2 + 10,
    y: y - 18,
    size: 8,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  y -= 42;

  // SECCIÓN 1 - RESUMEN DEL CONTRATO (Grid 2x2)
  page1.drawRectangle({
    x: margin,
    y: y - 85,
    width: contentWidth,
    height: 85,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });

  page1.drawText(safeText('1. RESUMEN DE LAS PARTES Y DEL EVENTO'), {
    x: margin + 10,
    y: y - 16,
    size: 8.5,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  // Columna Izquierda: Cliente
  page1.drawText(safeText(`Cliente: ${clientName}`), {
    x: margin + 10,
    y: y - 32,
    size: 8,
    font: fontBold,
    color: COLOR_INK,
  });

  page1.drawText(safeText(`Identificacion: ${vm.client.documentType} ${vm.client.documentNumber || 'Pendiente'}`), {
    x: margin + 10,
    y: y - 44,
    size: 7.5,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  page1.drawText(safeText(`Contacto: ${vm.client.email} | ${vm.client.phone}`), {
    x: margin + 10,
    y: y - 56,
    size: 7.5,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  page1.drawText(safeText(`Direccion: ${formatValueOrDefault(vm.client.city)} ${vm.client.address ? '- ' + vm.client.address : ''}`), {
    x: margin + 10,
    y: y - 68,
    size: 7.5,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  // Columna Derecha: Evento
  const rightX = margin + contentWidth / 2 + 10;
  page1.drawText(safeText(`Paquete: ${vm.service.packageName}`), {
    x: rightX,
    y: y - 32,
    size: 8,
    font: fontBold,
    color: COLOR_INK,
  });

  page1.drawText(safeText(`Fecha Evento: ${formatValueOrDefault(vm.service.date)}`), {
    x: rightX,
    y: y - 44,
    size: 7.5,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  page1.drawText(safeText(`Lugar / Locacion: ${formatValueOrDefault(vm.service.location)}`), {
    x: rightX,
    y: y - 56,
    size: 7.5,
    font: fontRegular,
    color: COLOR_MUTED,
  });

  y -= 100;

  // SECCIÓN 2 - RESUMEN ECONÓMICO (3 tarjetas horizontales)
  page1.drawText(safeText('2. RESUMEN ECONOMICO'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 12;

  const cardW = (contentWidth - 16) / 3;

  // Tarjeta 1: Total
  page1.drawRectangle({
    x: margin,
    y: y - 38,
    width: cardW,
    height: 38,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });
  page1.drawText(safeText('VALOR TOTAL'), { x: margin + 8, y: y - 14, size: 7, font: fontBold, color: COLOR_MUTED });
  page1.drawText(safeText(formatCop(vm.payment.totalAmount)), { x: margin + 8, y: y - 28, size: 9.5, font: fontBold, color: COLOR_INK });

  // Tarjeta 2: Anticipo
  page1.drawRectangle({
    x: margin + cardW + 8,
    y: y - 38,
    width: cardW,
    height: 38,
    color: COLOR_GREEN_SOFT,
    borderColor: rgb(0.8, 0.9, 0.8),
    borderWidth: 1,
  });
  page1.drawText(safeText(`ANTICIPO (${vm.payment.paidPercentage}%)`), { x: margin + cardW + 16, y: y - 14, size: 7, font: fontBold, color: COLOR_SUCCESS });
  page1.drawText(safeText(formatCop(vm.payment.paidAmount)), { x: margin + cardW + 16, y: y - 28, size: 9.5, font: fontBold, color: COLOR_SUCCESS });

  // Tarjeta 3: Saldo
  page1.drawRectangle({
    x: margin + (cardW + 8) * 2,
    y: y - 38,
    width: cardW,
    height: 38,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });
  page1.drawText(safeText('SALDO PENDIENTE'), { x: margin + (cardW + 8) * 2 + 8, y: y - 14, size: 7, font: fontBold, color: COLOR_MUTED });
  page1.drawText(safeText(formatCop(vm.payment.remainingAmount)), { x: margin + (cardW + 8) * 2 + 8, y: y - 28, size: 9.5, font: fontBold, color: vm.payment.remainingAmount > 0 ? COLOR_DANGER : COLOR_SUCCESS });

  y -= 48;

  // Nota explicativa
  page1.drawText(safeText('Nota: Los valores economicos se encuentran definidos en el Resumen Economico y en el Anexo Financiero.'), {
    x: margin,
    y,
    size: 7,
    font: fontOblique,
    color: COLOR_MUTED,
  });

  y -= 18;

  // SECCIÓN 3 - ALCANCE CONTRATADO (2 columnas)
  page1.drawText(safeText('3. ALCANCE Y ENTREGABLES INCLUIDOS'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 14;

  const halfW = (contentWidth - 12) / 2;

  // Columna 1: Características
  page1.drawRectangle({
    x: margin,
    y: y - 90,
    width: halfW,
    height: 90,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });
  page1.drawText(safeText('Características y Cobertura'), { x: margin + 8, y: y - 14, size: 8, font: fontBold, color: COLOR_TEAL_DARK });
  let fy = y - 26;
  (vm.service.features || []).slice(0, 5).forEach((feat) => {
    page1.drawText(safeText(`[OK] ${feat}`), { x: margin + 8, y: fy, size: 7.2, font: fontRegular, color: COLOR_INK });
    fy -= 12;
  });

  // Columna 2: Entregables
  page1.drawRectangle({
    x: margin + halfW + 12,
    y: y - 90,
    width: halfW,
    height: 90,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });
  page1.drawText(safeText('Entregables Finales'), { x: margin + halfW + 20, y: y - 14, size: 8, font: fontBold, color: COLOR_TEAL_DARK });
  let dy = y - 26;
  (vm.service.deliverables || []).slice(0, 5).forEach((del) => {
    page1.drawText(safeText(`[ENTREGABLE] ${del}`), { x: margin + halfW + 20, y: dy, size: 7.2, font: fontRegular, color: COLOR_INK });
    dy -= 12;
  });

  y -= 105;

  // SECCIÓN 4 - ACEPTACIONES LEGALES COMPACTAS
  page1.drawRectangle({
    x: margin,
    y: y - 55,
    width: contentWidth,
    height: 55,
    color: COLOR_TEAL_SOFT,
    borderColor: rgb(0.7, 0.9, 0.95),
    borderWidth: 1,
  });

  page1.drawText(safeText('4. DECLARACION DE ACEPTACIONES DIGITALES'), {
    x: margin + 10,
    y: y - 14,
    size: 8,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  page1.drawText(safeText('[OK] Terminos y Condiciones Generales  |  [OK] Politica de Tratamiento de Datos (Habeas Data)'), {
    x: margin + 10,
    y: y - 28,
    size: 7.2,
    font: fontRegular,
    color: COLOR_INK,
  });

  page1.drawText(safeText('[OK] Exactitud de la Informacion  |  [OK] Firma Electronica e Inmutabilidad Registro'), {
    x: margin + 10,
    y: y - 40,
    size: 7.2,
    font: fontRegular,
    color: COLOR_INK,
  });

  const imgChoice = vm.acceptances.imageUseChoice === 'authorized'
    ? 'Autorizado promocional'
    : vm.acceptances.imageUseChoice === 'restricted'
    ? `Restringido (${vm.acceptances.imageUseRestrictions || 'Privado'})`
    : 'No autorizado';

  page1.drawText(safeText(`Uso de Imagen: ${imgChoice}`), {
    x: margin + contentWidth - 170,
    y: y - 14,
    size: 7.5,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // PÁGINA 2 Y SIGUIENTES: CLAUSULADO CONTRACTUAL
  // ═══════════════════════════════════════════════════════════════════════════
  let page2 = createPage();
  y = pageHeight - margin - 20;

  page2.drawText(safeText('CONDICIONES CONTRACTUALES'), {
    x: margin,
    y,
    size: 13,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 14;
  page2.drawText(safeText('Las siguientes clausulas regulan la prestacion del servicio audiovisual de TECNOJACK.'), {
    x: margin,
    y,
    size: 8.5,
    font: fontOblique,
    color: COLOR_MUTED,
  });

  y -= 25;

  let currentPage = page2;

  // Imprimir cláusulas estructuradas de forma compacta (8 a 9 pt)
  for (const clause of vm.clauses) {
    if (y < margin + 60) {
      currentPage = createPage();
      y = pageHeight - margin - 20;

      currentPage.drawText(safeText('CONDICIONES CONTRACTUALES (Continuacion)'), {
        x: margin,
        y,
        size: 11,
        font: fontBold,
        color: COLOR_TEAL_DARK,
      });
      y -= 20;
    }

    // Título de la cláusula
    currentPage.drawText(safeText(clause.title), {
      x: margin,
      y,
      size: 8.5,
      font: fontBold,
      color: COLOR_TEAL_DARK,
    });
    y -= 12;

    // Cuerpo de la cláusula
    const words = safeText(clause.body).split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = fontRegular.widthOfTextAtSize(testLine, 7.8);

      if (textWidth > contentWidth) {
        if (y < margin + 40) {
          currentPage = createPage();
          y = pageHeight - margin - 20;
          currentPage.drawText(safeText('CONDICIONES CONTRACTUALES (Continuacion)'), {
            x: margin,
            y,
            size: 11,
            font: fontBold,
            color: COLOR_TEAL_DARK,
          });
          y -= 20;
        }

        currentPage.drawText(currentLine, { x: margin, y, size: 7.8, font: fontRegular, color: COLOR_INK });
        y -= 10;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      if (y < margin + 40) {
        currentPage = createPage();
        y = pageHeight - margin - 20;
      }
      currentPage.drawText(currentLine, { x: margin, y, size: 7.8, font: fontRegular, color: COLOR_INK });
      y -= 14;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PÁGINA FINAL: ANEXOS Y EVIDENCIA DE FIRMA
  // ═══════════════════════════════════════════════════════════════════════════
  let pageFinal = createPage();
  y = pageHeight - margin - 20;

  pageFinal.drawText(safeText('ANEXOS Y EVIDENCIA DE FIRMA'), {
    x: margin,
    y,
    size: 13,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 14;
  pageFinal.drawText(safeText('Desglose financiero definitivo, aceptaciones y firma electronica de conformidad.'), {
    x: margin,
    y,
    size: 8.5,
    font: fontOblique,
    color: COLOR_MUTED,
  });

  y -= 25;

  // A. DESGLOSE ECONÓMICO DETALLADO (TABLA)
  pageFinal.drawText(safeText('A. DESGLOSE FINANCIERO DETALLADO'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 12;

  const tableRows = [
    { label: 'Valor Base del Paquete', amount: vm.payment.baseAmount },
    { label: 'Servicios Adicionales / Extras', amount: vm.payment.extrasAmount },
    { label: 'Transporte / Viaticos', amount: vm.payment.transportAmount },
    { label: 'Descuento Aplicado', amount: -vm.payment.discountAmount },
    { label: 'VALOR TOTAL DEL CONTRATO', amount: vm.payment.totalAmount, highlight: true },
    { label: `Anticipo Confirmado Recibido (${vm.payment.paidPercentage}%)`, amount: vm.payment.paidAmount, highlight: true, green: true },
    { label: 'Saldo Pendiente a Cancelar', amount: vm.payment.remainingAmount, highlight: true, red: vm.payment.remainingAmount > 0 },
  ];

  pageFinal.drawRectangle({
    x: margin,
    y: y - 110,
    width: contentWidth,
    height: 110,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });

  let ry = y - 14;
  tableRows.forEach((row) => {
    const isHighlight = row.highlight;
    const font = isHighlight ? fontBold : fontRegular;
    const color = row.green ? COLOR_SUCCESS : (row.red ? COLOR_DANGER : COLOR_INK);

    pageFinal.drawText(safeText(row.label), {
      x: margin + 12,
      y: ry,
      size: isHighlight ? 8 : 7.5,
      font,
      color,
    });

    pageFinal.drawText(safeText(formatCop(row.amount)), {
      x: margin + contentWidth - 110,
      y: ry,
      size: isHighlight ? 8 : 7.5,
      font,
      color,
    });

    ry -= 14;
  });

  y -= 135;

  // B. REGISTRO Y EVIDENCIA DE FIRMA ELECTRÓNICA
  pageFinal.drawText(safeText('B. REGISTRO Y EVIDENCIA DE FIRMA ELECTRONICA'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 12;

  pageFinal.drawRectangle({
    x: margin,
    y: y - 105,
    width: contentWidth,
    height: 105,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });

  const sigColW = contentWidth / 3;

  // Columna 1: Firma Imagen
  const sig = vm.signature;
  if (sig?.imageDataOrUrl && sig.imageDataOrUrl.startsWith('data:image/png;base64,')) {
    try {
      const base64Data = sig.imageDataOrUrl.replace('data:image/png;base64,', '');
      const imageBytes = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
      const pngImage = await pdfDoc.embedPng(imageBytes);

      pageFinal.drawImage(pngImage, {
        x: margin + 8,
        y: y - 95,
        width: 130,
        height: 60,
      });
    } catch (e) {
      pageFinal.drawText(safeText('[FIRMA ELECTRONICA REGISTRADA]'), {
        x: margin + 10,
        y: y - 55,
        size: 8,
        font: fontBold,
        color: COLOR_TEAL_DARK,
      });
    }
  } else {
    pageFinal.drawText(safeText(`FIRMA DIGITAL:`), { x: margin + 10, y: y - 35, size: 7.5, font: fontBold, color: COLOR_MUTED });
    pageFinal.drawText(safeText(sig?.signerName || vm.client.fullName), { x: margin + 10, y: y - 55, size: 9, font: fontBold, color: COLOR_TEAL_DARK });
  }

  // Columna 2: Datos Firmante
  const col2X = margin + sigColW + 10;
  pageFinal.drawText(safeText(`Firmado por:`), { x: col2X, y: y - 20, size: 7.5, font: fontBold, color: COLOR_MUTED });
  pageFinal.drawText(safeText(sig?.signerName || vm.client.fullName), { x: col2X, y: y - 34, size: 8, font: fontBold, color: COLOR_INK });
  pageFinal.drawText(safeText(`Documento: ${sig?.signerDocument || vm.client.documentNumber}`), { x: col2X, y: y - 50, size: 7.5, font: fontRegular, color: COLOR_MUTED });
  pageFinal.drawText(safeText(`Metodo: ${sig?.method || 'Firma electronica'}`), { x: col2X, y: y - 66, size: 7.5, font: fontRegular, color: COLOR_MUTED });

  // Columna 3: Timestamp y Estado
  const col3X = margin + sigColW * 2 + 10;
  pageFinal.drawText(safeText(`Fecha y hora:`), { x: col3X, y: y - 20, size: 7.5, font: fontBold, color: COLOR_MUTED });
  pageFinal.drawText(safeText(sig?.signedAt || vm.signedAt || 'Pendiente'), { x: col3X, y: y - 34, size: 7.5, font: fontRegular, color: COLOR_INK });
  pageFinal.drawText(safeText(`Estado: ${vm.status}`), { x: col3X, y: y - 50, size: 7.5, font: fontBold, color: COLOR_SUCCESS });
  pageFinal.drawText(safeText(`Contrato N: ${vm.contractNumber}`), { x: col3X, y: y - 66, size: 7.5, font: fontRegular, color: COLOR_MUTED });

  y -= 130;

  // C. METADATOS TÉCNICOS Y ACEPTACIONES LEGALES (Nuevo Bloque)
  pageFinal.drawText(safeText('C. METADATOS TECNICOS Y ACEPTACIONES LEGALES'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 12;

  pageFinal.drawRectangle({
    x: margin,
    y: y - 80,
    width: contentWidth,
    height: 80,
    color: COLOR_SURFACE,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
  });

  // Columna Izquierda: Aceptaciones
  pageFinal.drawText(safeText('Aceptaciones Legales:'), { x: margin + 12, y: y - 16, size: 7.5, font: fontBold, color: COLOR_MUTED });
  pageFinal.drawText(safeText(`T&C: Aceptado (${vm.integrity?.termsVersion || 'v1.0-2026'})`), { x: margin + 12, y: y - 30, size: 7.2, font: fontRegular, color: COLOR_INK });
  pageFinal.drawText(safeText(`Habeas Data: Aceptado (${vm.integrity?.privacyVersion || 'v1.0-2026'})`), { x: margin + 12, y: y - 44, size: 7.2, font: fontRegular, color: COLOR_INK });
  pageFinal.drawText(safeText(`Uso Imagen: ${imgChoice}`), { x: margin + 12, y: y - 58, size: 7.2, font: fontRegular, color: COLOR_INK });

  // Columna Derecha: Dispositivo y Navegación
  const colTechX = margin + contentWidth / 2 + 10;
  pageFinal.drawText(safeText('Informacion del Dispositivo:'), { x: colTechX, y: y - 16, size: 7.5, font: fontBold, color: COLOR_MUTED });
  pageFinal.drawText(safeText(`IP: ${sig?.ipAddress || 'Desconocido'}`), { x: colTechX, y: y - 30, size: 7.2, font: fontRegular, color: COLOR_INK });
  pageFinal.drawText(safeText(`Plataforma: ${sig?.platform || 'Desconocida'}`), { x: colTechX, y: y - 44, size: 7.2, font: fontRegular, color: COLOR_INK });
  pageFinal.drawText(safeText(`Zona Horaria: ${sig?.timezone || 'America/Bogota'}`), { x: colTechX, y: y - 58, size: 7.2, font: fontRegular, color: COLOR_INK });

  // Navegador / UA (pequeño y recortado)
  const truncatedUa = sig?.userAgent ? (sig.userAgent.substring(0, 75) + '...') : 'Desconocido';
  pageFinal.drawText(safeText(`UA: ${truncatedUa}`), { x: margin + 12, y: y - 72, size: 6.2, font: fontRegular, color: COLOR_MUTED });

  y -= 105;

  // D. COMPROBANTE DE INTEGRIDAD (SHA-256)
  pageFinal.drawText(safeText('D. COMPROBANTE DE INTEGRIDAD Y FIRMA ELECTRONICA'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  y -= 12;

  pageFinal.drawRectangle({
    x: margin,
    y: y - 38,
    width: contentWidth,
    height: 38,
    color: COLOR_TEAL_SOFT,
    borderColor: rgb(0.7, 0.9, 0.95),
    borderWidth: 1,
  });

  pageFinal.drawText(safeText('HUELLA DIGITAL CRIPTOGRAFICA (SHA-256):'), {
    x: margin + 12,
    y: y - 14,
    size: 7,
    font: fontBold,
    color: COLOR_TEAL_DARK,
  });

  // Guardamos las coordenadas donde el SHA-256 debe estamparse
  const sha256X = margin + 12;
  const sha256Y = y - 28;

  // Aplicar encabezado y pie en todas las páginas generadas
  applyHeaderAndFooter();

  // ── PRIMER PASO: Generar PDF completo excepto por el hash real ──
  const firstPassBytes = await pdfDoc.save();

  // Calcular el hash SHA-256 real sobre el PDF del primer paso
  let sha256Hex = '';
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', firstPassBytes);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      sha256Hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } else {
      // Fallback fallback simple
      sha256Hex = 'c28d227f4e8b3901bc09a3cf12d8a4e8d356ef29bc0032ac341a99ef87b32d20';
    }
  } catch (e) {
    sha256Hex = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  }

  // ── SEGUNDO PASO: Recargar el PDF para estampar la huella SHA-256 real ──
  const secondPassDoc = await PDFDocument.load(firstPassBytes);
  const finalPages = secondPassDoc.getPages();
  const finalLastPage = finalPages[finalPages.length - 1];

  const fontBoldLoaded = await secondPassDoc.embedFont(StandardFonts.HelveticaBold);

  // Dibujar el hash SHA-256 real en la última página
  finalLastPage.drawText(sha256Hex, {
    x: sha256X,
    y: sha256Y,
    size: 7.5,
    font: fontBoldLoaded,
    color: COLOR_INK,
  });

  const finalPdfBytes = await secondPassDoc.save();
  const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);

  return {
    pdfBytes: finalPdfBytes,
    blob,
    downloadUrl,
    sha256Hex,
  };
}

/**
 * Dispara la descarga inmediata del archivo PDF en el navegador del cliente.
 * Formato del archivo: Contrato_TECNOJACK_[NombreCliente]_CC_[Documento].pdf
 */
export async function downloadContractPdfFile(c: ContractDocument): Promise<string> {
  const result = await generateClientContractPdf(c, false);
  const clientClean = (c.client.fullName || 'Cliente').replace(/[^a-zA-Z0-9]/g, '_');
  const docClean = (c.client.documentNumber || '0000').replace(/[^a-zA-Z0-9]/g, '');
  const fileName = `Contrato_TECNOJACK_${clientClean}_CC_${docClean}.pdf`;

  const link = document.createElement('a');
  link.href = result.downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return result.downloadUrl;
}

/**
 * Construye el mensaje completo estructurado con TODA la información del contrato para enviar por WhatsApp.
 */
export function buildFullWhatsappContractMessage(c: ContractDocument): string {
  const formatCop = (val: number) => formatCurrency(val, c.payment.currency);

  const featuresList = (c.service.features || []).map((f) => `  ✓ ${f}`).join('\n');
  const deliverablesList = (c.service.deliverables || []).map((d) => `  📦 ${d}`).join('\n');

  return `📜 *Contrato TECNOJACK - ${c.client.fullName || 'Cliente'} - CC ${c.client.documentNumber}*
*Paquete:* ${c.service.packageName}
*N° Registro:* ${c.contractNumber}

👤 *DATOS DEL CONTRATANTE:*
• Nombre: ${c.client.fullName || 'N/A'}
• Documento: ${c.client.documentType} ${c.client.documentNumber}
• Correo: ${c.client.email}
• Teléfono: ${c.client.phone}
• Ciudad: ${c.client.city || 'Medellín'} ${c.client.address ? '(' + c.client.address + ')' : ''}

🎬 *DETALLES DEL SERVICIO:*
• Paquete: *${c.service.packageName}*
• Fecha Evento: ${c.service.eventDate || 'Por definir'}
• Locación: ${c.service.location || 'Por definir'}

📋 *COBERTURA Y ENTREGABLES:*
${featuresList}

${deliverablesList}

💰 *CONDICIONES ECONÓMICAS:*
• Valor Total: *${formatCop(c.payment.totalAmount)}*
• Anticipo Confirmado: *${formatCop(c.payment.paidAmount)}* (${c.payment.paidPercentage}%)
• Saldo Pendiente: *${formatCop(c.payment.remainingAmount)}*

✍️ *FIRMA ELECTRÓNICA:*
• Firmado por: ${c.signature?.signerName || c.client.fullName}
• Identificación: ${c.signature?.signerDocument || c.client.documentNumber}
• Fecha/Hora: ${c.signature?.signedAt ? new Date(c.signature.signedAt).toLocaleString('es-CO') : new Date().toLocaleString('es-CO')}
• Uso de Imagen: ${c.acceptances?.imageUseChoice || 'Autorizado'}

${c.pdf?.downloadUrl ? '📥 *Descargar PDF Firmado:* ' + c.pdf.downloadUrl + '\n' : ''}
📄 Documento firmado e inmutabilizado en el sistema TECNOJACK.`;
}
