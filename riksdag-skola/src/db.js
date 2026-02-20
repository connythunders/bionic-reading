const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'riksdag.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initTables();
  }
  return db;
}

function initTables() {
  const d = getDb();

  d.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      type TEXT,
      date TEXT,
      url TEXT,
      summary TEXT,
      party TEXT,
      notified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      active INTEGER DEFAULT 1,
      confirmed INTEGER DEFAULT 0,
      confirm_token TEXT UNIQUE,
      frequency TEXT DEFAULT 'immediate',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      unsubscribe_token TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_documents_date ON documents(date DESC);
    CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
    CREATE INDEX IF NOT EXISTS idx_documents_notified ON documents(notified);
    CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(active);
  `);
}

// --- Document operations ---

function insertDocument(doc) {
  const d = getDb();
  const stmt = d.prepare(`
    INSERT OR IGNORE INTO documents (id, title, subtitle, type, date, url, summary, party)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    doc.id,
    doc.title,
    doc.subtitle || null,
    doc.type || null,
    doc.date || null,
    doc.url || null,
    doc.summary || null,
    doc.party || null
  );
  return result.changes > 0;
}

function insertDocuments(docs) {
  const d = getDb();
  const insert = d.prepare(`
    INSERT OR IGNORE INTO documents (id, title, subtitle, type, date, url, summary, party)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = d.transaction((documents) => {
    let inserted = 0;
    for (const doc of documents) {
      const result = insert.run(
        doc.id,
        doc.title,
        doc.subtitle || null,
        doc.type || null,
        doc.date || null,
        doc.url || null,
        doc.summary || null,
        doc.party || null
      );
      if (result.changes > 0) inserted++;
    }
    return inserted;
  });

  return insertMany(docs);
}

function getDocuments({ page = 1, limit = 20, type = null, year = null } = {}) {
  const d = getDb();
  const offset = (page - 1) * limit;
  let where = [];
  let params = [];

  if (type) {
    where.push('type = ?');
    params.push(type);
  }
  if (year) {
    where.push("date LIKE ?");
    params.push(`${year}%`);
  }

  const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';

  const countStmt = d.prepare(`SELECT COUNT(*) as total FROM documents ${whereClause}`);
  const { total } = countStmt.get(...params);

  const stmt = d.prepare(`
    SELECT * FROM documents ${whereClause}
    ORDER BY date DESC
    LIMIT ? OFFSET ?
  `);
  const documents = stmt.all(...params, limit, offset);

  return {
    documents,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

function getDocumentById(id) {
  const d = getDb();
  return d.prepare('SELECT * FROM documents WHERE id = ?').get(id);
}

function getUnnotifiedDocuments() {
  const d = getDb();
  return d.prepare('SELECT * FROM documents WHERE notified = 0 ORDER BY date DESC').all();
}

function markDocumentsNotified(ids) {
  const d = getDb();
  const stmt = d.prepare('UPDATE documents SET notified = 1 WHERE id = ?');
  const markMany = d.transaction((docIds) => {
    for (const id of docIds) {
      stmt.run(id);
    }
  });
  markMany(ids);
}

// --- Subscriber operations ---

function addSubscriber(email, frequency = 'immediate') {
  const d = getDb();
  const unsubscribeToken = uuidv4();
  const confirmToken = uuidv4();

  try {
    const stmt = d.prepare(`
      INSERT INTO subscribers (email, unsubscribe_token, confirm_token, frequency, confirmed, active)
      VALUES (?, ?, ?, ?, 0, 1)
    `);
    stmt.run(email, unsubscribeToken, confirmToken, frequency);
    return { success: true, confirmToken, unsubscribeToken };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      // Re-activate if previously unsubscribed
      const existing = d.prepare('SELECT * FROM subscribers WHERE email = ?').get(email);
      if (existing && !existing.active) {
        const newUnsubToken = uuidv4();
        const newConfirmToken = uuidv4();
        d.prepare('UPDATE subscribers SET active = 1, confirmed = 0, confirm_token = ?, unsubscribe_token = ?, frequency = ? WHERE email = ?')
          .run(newConfirmToken, newUnsubToken, frequency, email);
        return { success: true, confirmToken: newConfirmToken, unsubscribeToken: newUnsubToken, reactivated: true };
      }
      return { success: false, error: 'E-postadressen finns redan registrerad.' };
    }
    throw err;
  }
}

function confirmSubscriber(token) {
  const d = getDb();
  const result = d.prepare('UPDATE subscribers SET confirmed = 1 WHERE confirm_token = ? AND active = 1').run(token);
  return result.changes > 0;
}

function unsubscribe(token) {
  const d = getDb();
  const result = d.prepare('UPDATE subscribers SET active = 0 WHERE unsubscribe_token = ?').run(token);
  return result.changes > 0;
}

function getActiveSubscribers() {
  const d = getDb();
  return d.prepare('SELECT * FROM subscribers WHERE active = 1 AND confirmed = 1').all();
}

// --- Settings operations ---

function getSetting(key) {
  const d = getDb();
  const row = d.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : null;
}

function setSetting(key, value) {
  const d = getDb();
  d.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
}

// --- Stats ---

function getStats() {
  const d = getDb();
  const { total } = d.prepare('SELECT COUNT(*) as total FROM documents').get();
  const { subscribers } = d.prepare('SELECT COUNT(*) as subscribers FROM subscribers WHERE active = 1 AND confirmed = 1').get();
  const latest = d.prepare('SELECT date FROM documents ORDER BY date DESC LIMIT 1').get();
  const lastUpdate = getSetting('last_update');

  return {
    totalDocuments: total,
    activeSubscribers: subscribers,
    latestDocumentDate: latest ? latest.date : null,
    lastUpdate
  };
}

function close() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = {
  getDb,
  initTables,
  insertDocument,
  insertDocuments,
  getDocuments,
  getDocumentById,
  getUnnotifiedDocuments,
  markDocumentsNotified,
  addSubscriber,
  confirmSubscriber,
  unsubscribe,
  getActiveSubscribers,
  getSetting,
  setSetting,
  getStats,
  close
};
