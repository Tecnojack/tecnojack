import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as crypto from 'crypto';

export interface GeneratePdfOptions {
  contractNumber: string;
  clientName: string;
  clientDocument: string;
  contractText: string;
  totalAmountText: string;
  paidAmountText: string;
  remainingAmountText: string;
  signatureDataUrl?: string;
  signedAt: string;
  isWatermarkPreview?: boolean;
}

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

export async function generateContractPdf(options: GeneratePdfOptions): Promise<{ pdfBytes: Uint8Array; sha256: string }> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const fontSizeTitle = 13;
  const fontSizeHeading = 10;
  const fontSizeBody = 8.5;
  const margin = 40;

  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  let y = height - margin;
  const safeText = (t: string) => sanitizeWinAnsi(t);

  // Header
  page.drawText(safeText('TECNOJACK - PRODUCCION AUDIOVISUAL'), {
    x: margin,
    y: y - 10,
    size: 9,
    font: fontBold,
    color: rgb(0, 0.59, 0.7),
  });

  page.drawText(safeText(`CONTRATO N ${options.contractNumber}`), {
    x: width - margin - 150,
    y: y - 10,
    size: 10,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= 30;

  if (options.isWatermarkPreview) {
    page.drawText(safeText('VISTA PREVIA - DOCUMENTO NO DEFINITIVO'), {
      x: margin + 30,
      y: height / 2,
      size: 24,
      font: fontBold,
      color: rgb(0.8, 0.2, 0.2),
      opacity: 0.35,
      rotate: { type: 'degrees', angle: 45 },
    });
  }

  // Draw title
  page.drawText(safeText('CONTRATO DE PRESTACION DE SERVICIOS AUDIOVISUALES'), {
    x: margin,
    y,
    size: fontSizeTitle,
    font: fontBold,
    color: rgb(0.05, 0.05, 0.05),
  });

  y -= 25;

  // Wrap lines for body text
  const paragraphs = options.contractText.split('\n');
  const maxWidth = width - margin * 2;

  for (const para of paragraphs) {
    const cleanPara = safeText(para.trim());
    if (!cleanPara) {
      y -= 8;
      continue;
    }

    const isHeading = /^\d+\.\s+[A-Z]/.test(cleanPara) || /^CONTRATO N:/.test(cleanPara);
    const font = isHeading ? fontBold : fontRegular;
    const size = isHeading ? fontSizeHeading : fontSizeBody;

    const words = cleanPara.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, size);

      if (textWidth > maxWidth) {
        if (y < margin + 40) {
          page = pdfDoc.addPage([595.28, 841.89]);
          y = height - margin;
        }

        page.drawText(currentLine, { x: margin, y, size, font, color: rgb(0.15, 0.15, 0.15) });
        y -= size + 4;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      if (y < margin + 40) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin;
      }
      page.drawText(currentLine, { x: margin, y, size, font, color: rgb(0.15, 0.15, 0.15) });
      y -= size + 6;
    }
  }

  // Signature Block
  if (y < margin + 120) {
    page = pdfDoc.addPage([595.28, 841.89]);
    y = height - margin;
  }

  y -= 20;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 25;
  page.drawText(safeText('FIRMA DEL CLIENTE CONTRATANTE:'), {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(safeText(`Nombre: ${options.clientName}`), {
    x: margin,
    y: y - 18,
    size: 8.5,
    font: fontRegular,
  });

  page.drawText(safeText(`Identificación: ${options.clientDocument}`), {
    x: margin,
    y: y - 32,
    size: 8.5,
    font: fontRegular,
  });

  page.drawText(safeText(`Fecha y Hora de Firma: ${new Date(options.signedAt).toLocaleString('es-CO')}`), {
    x: margin,
    y: y - 46,
    size: 8.5,
    font: fontRegular,
  });

  if (options.signatureDataUrl && options.signatureDataUrl.startsWith('data:image/png;base64,')) {
    try {
      const base64Data = options.signatureDataUrl.replace('data:image/png;base64,', '');
      const imageBytes = Uint8Array.from(Buffer.from(base64Data, 'base64'));
      const pngImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(pngImage, {
        x: width - margin - 150,
        y: y - 50,
        width: 140,
        height: 60,
      });
    } catch (e) {
      console.warn('Error dibujando firma en PDF de functions:', e);
    }
  }

  const pdfBytes = await pdfDoc.save();
  const sha256 = crypto.createHash('sha256').update(pdfBytes).digest('hex');

  return { pdfBytes, sha256 };
}
