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

export async function generateContractPdf(options: GeneratePdfOptions): Promise<{ pdfBytes: Uint8Array; sha256: string }> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const fontSizeTitle = 14;
  const fontSizeHeading = 11;
  const fontSizeBody = 9;
  const margin = 45;

  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  let y = height - margin;

  // Header
  page.drawText('TECNOJACK · PRODUCCIÓN AUDIOVISUAL', {
    x: margin,
    y: y - 10,
    size: 9,
    font: fontBold,
    color: rgb(0, 0.59, 0.7),
  });

  page.drawText(`CONTRATO N° ${options.contractNumber}`, {
    x: width - margin - 150,
    y: y - 10,
    size: 10,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= 30;

  if (options.isWatermarkPreview) {
    page.drawText('VISTA PREVIA — DOCUMENTO NO DEFINITIVO', {
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
  page.drawText('CONTRATO DE PRESTACIÓN DE SERVICIOS AUDIOVISUALES', {
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
    const cleanPara = para.trim();
    if (!cleanPara) {
      y -= 10;
      continue;
    }

    const isHeading = /^\d+\.\s+[A-Z]/.test(cleanPara) || /^CONTRATO N°:/.test(cleanPara);
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

  y -= 20;

  page.drawText('FIRMA Y ACEPTACIÓN DEL CLIENTE', {
    x: margin,
    y,
    size: 10,
    font: fontBold,
    color: rgb(0, 0.59, 0.7),
  });

  y -= 16;
  page.drawText(`Nombre: ${options.clientName}`, { x: margin, y, size: 9, font: fontRegular });
  y -= 14;
  page.drawText(`Documento: ${options.clientDocument}`, { x: margin, y, size: 9, font: fontRegular });
  y -= 14;
  page.drawText(`Fecha y hora de firma: ${options.signedAt}`, { x: margin, y, size: 9, font: fontRegular });

  if (options.signatureDataUrl && options.signatureDataUrl.startsWith('data:image/')) {
    try {
      const base64Data = options.signatureDataUrl.replace(/^data:image\/\w+;base64,/, '');
      const imageBytes = Buffer.from(base64Data, 'base64');
      const embeddedImg = options.signatureDataUrl.includes('png')
        ? await pdfDoc.embedPng(imageBytes)
        : await pdfDoc.embedJpg(imageBytes);

      page.drawImage(embeddedImg, {
        x: width - margin - 160,
        y: y - 10,
        width: 140,
        height: 50,
      });
    } catch (err) {
      console.error('Error al incrustar la imagen de la firma en el PDF:', err);
    }
  }

  const pdfBytes = await pdfDoc.save();
  const sha256 = crypto.createHash('sha256').update(pdfBytes).digest('hex');

  return { pdfBytes, sha256 };
}
