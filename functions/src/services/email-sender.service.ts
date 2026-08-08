import * as nodemailer from 'nodemailer';

export interface SendContractEmailOptions {
  toEmail: string;
  clientName: string;
  contractNumber: string;
  packageName: string;
  totalAmountText: string;
  paidAmountText: string;
  remainingAmountText: string;
  signedAt: string;
  pdfBytes: Uint8Array;
}

export async function sendContractSignedEmails(options: SendContractEmailOptions): Promise<void> {
  const adminEmail = 'tecnojack.films@gmail.com';

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER || adminEmail;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    console.warn('[EMAIL_SERVICE] SMTP_PASS no configurado. Se omite envío real por correo y se loguea evento.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subject = `Contrato Firmado N° ${options.contractNumber} - TECNOJACK (${options.clientName})`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #0097b2;">TECNOJACK · Contrato Firmado</h2>
      <p>Hola <strong>${options.clientName}</strong>,</p>
      <p>Confirmamos que tu contrato de prestación de servicios audiovisuales ha sido <strong>firmado correctamente</strong>.</p>

      <div style="background: #f4f8fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Contrato N°:</strong> ${options.contractNumber}</p>
        <p style="margin: 4px 0;"><strong>Servicio:</strong> ${options.packageName}</p>
        <p style="margin: 4px 0;"><strong>Valor Total:</strong> ${options.totalAmountText}</p>
        <p style="margin: 4px 0;"><strong>Anticipo Confirmado:</strong> ${options.paidAmountText}</p>
        <p style="margin: 4px 0;"><strong>Saldo Pendiente:</strong> ${options.remainingAmountText}</p>
        <p style="margin: 4px 0;"><strong>Fecha de Firma:</strong> ${options.signedAt}</p>
      </div>

      <p>Adjunto a este correo encontrarás la copia oficial e inmutable en formato PDF con la evidencia digital de la firma.</p>
      <p>Si tienes preguntas o requieres asistencia adicional, puedes contactarnos por WhatsApp o respondiendo a este correo.</p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="font-size: 12px; color: #777;">TECNOJACK · Medellín, Colombia · <a href="https://tecnojack.co">https://tecnojack.co</a></p>
    </div>
  `;

  const pdfBuffer = Buffer.from(options.pdfBytes);

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"TECNOJACK" <${smtpUser}>`,
    to: [options.toEmail, adminEmail].join(', '),
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: `Contrato-${options.contractNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`[EMAIL_SERVICE] Correo de contrato firmado enviado a ${options.toEmail} y ${adminEmail}`);
}
