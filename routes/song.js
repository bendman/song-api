const { Router } = require('express');
const path = require('path');
const db = require('../db');

const router = Router();
const SONG_FILES_DIR = path.resolve(__dirname, '../data/audio-files');

// Return a sanitized song object with a relative link to the file endpoint
const sanitizeSong = baseUrl => ({ id, title }) => ({
  id,
  title,
  link: `${baseUrl}/${id}/file.mp3`,
});

// Endpoint to list all songs, paginated with ?page
router.get('/', async (req, res) => {
  try {
    const { data, pagination } = await db.getAllSongsByPage(req.query.page);
    const sanitizedData = data.map(sanitizeSong(req.baseUrl));
    return res.json({ data: sanitizedData, pagination });
  } catch (error) {
    return res.status(500).send('Error loading song list from database.');
  }
});

// Endpoint to serve a single song by ID as a static file
router.get('/:id/file.mp3', async (req, res) => {
  // Get data for the specific song
  const songId = req.params.id;
  const songData = await db.getSongById(songId);

  // Handle when song isn't found
  if (!songData) {
    return res.status(404).send(`Song with id=${songId} not found.`);
  }

  // Determine the absolute path to the song file and serve
  const absolutePath = path.resolve(SONG_FILES_DIR, songData.file);
  return res.sendFile(absolutePath);
});

module.exports = router;
