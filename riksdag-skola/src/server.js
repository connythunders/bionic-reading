require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const routes = require('./routes');
const scheduler = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use(routes);

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Initialize database
db.initTables();

// Start server
app.listen(PORT, () => {
  console.log(`Riksdagsbevakaren startad på http://localhost:${PORT}`);
  console.log(`RSS-flöde: http://localhost:${PORT}/feed.xml`);

  // Start scheduler
  scheduler.startScheduler();

  // Do an initial fetch if database is empty
  const stats = db.getStats();
  if (stats.totalDocuments === 0) {
    console.log('Databasen är tom. Startar initial hämtning...');
    scheduler.refreshDocuments().then(result => {
      console.log('Initial hämtning klar:', result);
    }).catch(err => {
      console.error('Fel vid initial hämtning:', err.message);
    });
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStänger ner...');
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  db.close();
  process.exit(0);
});
