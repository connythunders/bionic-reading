const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.warn('SMTP inte konfigurerat. E-postnotiser är inaktiverade.');
      return null;
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }
  return transporter;
}

function buildDocumentList(documents) {
  return documents.map(doc => {
    const party = doc.party ? ` (${doc.party})` : '';
    const summary = doc.summary
      ? `\n      ${doc.summary.substring(0, 120)}${doc.summary.length > 120 ? '...' : ''}`
      : '';
    return `<li style="margin-bottom:16px;">
      <strong>[${doc.type}]</strong>${party} ${doc.title} <span style="color:#888;">(${doc.date})</span>
      ${summary ? `<br><span style="color:#555;font-size:14px;">${summary}</span>` : ''}
      <br><a href="${doc.url}" style="color:#1a5276;">Läs mer på riksdagen.se &rarr;</a>
    </li>`;
  }).join('\n');
}

async function sendNotification(subscriber, documents) {
  const t = getTransporter();
  if (!t) return false;

  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${subscriber.unsubscribe_token}`;

  const count = documents.length;
  const subject = `📚 ${count} ${count === 1 ? 'nytt riksdagsdokument' : 'nya riksdagsdokument'} om skola`;

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:600px; margin:0 auto; padding:20px; color:#333;">
  <div style="background:#1a3a5c; color:white; padding:20px; border-radius:8px 8px 0 0; text-align:center;">
    <h1 style="margin:0; font-size:20px;">📚 Riksdagsbevakaren</h1>
    <p style="margin:4px 0 0; opacity:0.8; font-size:14px;">Skola &amp; Utbildning</p>
  </div>

  <div style="background:#f8f9fa; padding:20px; border:1px solid #e0e0e0;">
    <p>Hej!</p>
    <p>Sedan senast har det tillkommit <strong>${count}</strong> ${count === 1 ? 'nytt dokument' : 'nya dokument'} om skola och utbildning i riksdagen:</p>

    <ul style="list-style:none; padding:0;">
      ${buildDocumentList(documents)}
    </ul>

    <p style="font-size:13px; color:#888; margin-top:24px;">
      Källa: <a href="https://www.riksdagen.se" style="color:#1a5276;">Sveriges riksdag</a>
    </p>
  </div>

  <div style="text-align:center; padding:16px; font-size:12px; color:#999;">
    <p>Du får detta mejl för att du prenumererar på Riksdagsbevakaren.</p>
    <p><a href="${unsubscribeUrl}" style="color:#999;">Avprenumerera</a></p>
  </div>
</body>
</html>`;

  try {
    await t.sendMail({
      from: fromEmail,
      to: subscriber.email,
      subject,
      html
    });
    return true;
  } catch (err) {
    console.error(`Kunde inte skicka mejl till ${subscriber.email}:`, err.message);
    return false;
  }
}

async function sendConfirmation(subscriber) {
  const t = getTransporter();
  if (!t) return false;

  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const confirmUrl = `${baseUrl}/api/confirm/${subscriber.confirmToken}`;

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:600px; margin:0 auto; padding:20px; color:#333;">
  <div style="background:#1a3a5c; color:white; padding:20px; border-radius:8px 8px 0 0; text-align:center;">
    <h1 style="margin:0; font-size:20px;">📚 Riksdagsbevakaren</h1>
  </div>

  <div style="background:#f8f9fa; padding:20px; border:1px solid #e0e0e0;">
    <p>Hej!</p>
    <p>Tack för att du vill prenumerera på Riksdagsbevakaren. Bekräfta din e-postadress genom att klicka på knappen nedan:</p>

    <div style="text-align:center; margin:24px 0;">
      <a href="${confirmUrl}" style="background:#1a3a5c; color:white; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
        Bekräfta prenumeration
      </a>
    </div>

    <p style="font-size:13px; color:#888;">Om du inte har registrerat dig kan du ignorera detta mejl.</p>
  </div>
</body>
</html>`;

  try {
    await t.sendMail({
      from: fromEmail,
      to: subscriber.email,
      subject: '📚 Bekräfta din prenumeration - Riksdagsbevakaren',
      html
    });
    return true;
  } catch (err) {
    console.error(`Kunde inte skicka bekräftelsemejl till ${subscriber.email}:`, err.message);
    return false;
  }
}

async function sendNotifications(subscribers, documents) {
  let sent = 0;
  for (const sub of subscribers) {
    const ok = await sendNotification(sub, documents);
    if (ok) sent++;
  }
  return sent;
}

module.exports = {
  sendNotification,
  sendConfirmation,
  sendNotifications,
  getTransporter
};
