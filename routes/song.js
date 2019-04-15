const { Router } = require('express');
const path = require('path');
const db = require('../db');

const router = Router();
const SONG_FILES_DIR = path.resolve(__dirname, '../data/audio-files');

router.get('/', async (req, res) => {
  let paginatedSongsData;

  try {
    const page = req.query.page || 1;
    paginatedSongsData = await db.getAllSongsByPage(page);
  } catch (error) {
    return res.status(500).send('Error loading song list from database.');
  }

  return res.json(paginatedSongsData);
});

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
