const { Router } = require('express');
const db = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  let data = [];

  try {
    const allSongs = await db.getAllSongs();
    data = allSongs;
  } catch (error) {
    return res.status(500).send('Error loading song list from database.');
  }

  return res.json({ data });
});

module.exports = router;
