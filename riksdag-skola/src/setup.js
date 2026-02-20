/**
 * Setup-skript: Initialiserar databasen och verifierar konfiguration.
 * Kör med: npm run setup
 */
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const db = require('./db');

console.log('=== Riksdagsbevakaren – Setup ===\n');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Skapade data/-katalog.');
}

// Initialize database
console.log('Initialiserar databas...');
db.initTables();
console.log('Databastabeller skapade.\n');

// Check .env
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('OBS: Ingen .env-fil hittades.');
  console.log('Kopiera .env.example till .env och fyll i dina SMTP-uppgifter:');
  console.log('  cp .env.example .env\n');
} else {
  console.log('.env-fil hittad.');

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log('OBS: SMTP-konfiguration saknas. E-postnotiser är inaktiverade.');
  } else {
    console.log('SMTP-konfiguration: OK');
  }
}

const stats = db.getStats();
console.log(`\nDatabas: ${stats.totalDocuments} dokument, ${stats.activeSubscribers} prenumeranter.`);
console.log('\nSetup klar! Starta appen med: npm start');

db.close();
