import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static game HTML files
app.use('/games', express.static('C:/Users/Gabriel Vereda/Downloads/Game_Station/src/pages'));

// Load gamesData dynamically
let gamesData = [];
try {
  const dataPath = path.resolve(__dirname, '../src/data/gamesData.js');
  // Use ESM import - read file content and evaluate
  const module = await import(dataPath);
  gamesData = module.gamesData || [];
} catch (e) {
  console.error('Failed to load gamesData:', e);
}

app.get('/api/games', (req, res) => {
  res.json(gamesData);
});

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const FAVORITES_FILE = path.join(DATA_DIR, 'favorites.json');
const RATINGS_FILE = path.join(DATA_DIR, 'ratings.json');

function readJson(file) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; } }
function writeJson(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8'); }

app.get('/api/favorites', (req, res) => res.json(readJson(FAVORITES_FILE)));
app.post('/api/favorites', (req, res) => { const { gameId } = req.body; const fav = readJson(FAVORITES_FILE); if (!fav.includes(gameId)) fav.push(gameId); writeJson(FAVORITES_FILE, fav); res.json({ success:true }); });
app.delete('/api/favorites/:gameId', (req, res) => { const { gameId } = req.params; let fav = readJson(FAVORITES_FILE); fav = fav.filter(id=>id!==gameId); writeJson(FAVORITES_FILE, fav); res.json({ success:true }); });

app.get('/api/ratings/:gameId', (req, res) => { const { gameId } = req.params; const ratings = readJson(RATINGS_FILE).filter(r=>r.gameId===gameId); res.json(ratings); });
app.post('/api/ratings', (req, res) => { const { gameId, rating, comment } = req.body; const all = readJson(RATINGS_FILE); all.push({ gameId, rating, comment, date:new Date().toISOString() }); writeJson(RATINGS_FILE, all); res.json({ success:true }); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
