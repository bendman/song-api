const fs = require('fs');
const path = require('path');
const util = require('util');

const PAGE_SIZE = 2;
const AUDIO_LIST_PATH = path.resolve(__dirname, './data/audio-list.json');

// Create a promise, async/await compatible file reader
const readFile = util.promisify(fs.readFile);

// Restricts a number between min and max
const clamp = (min, max, n) => Math.min(max, Math.max(min, n));

// Internal function to return a list of all songs in the database
const getAllSongs = async () => {
  const audioListRaw = await readFile(AUDIO_LIST_PATH);
  const audioList = JSON.parse(audioListRaw);
  return audioList.data;
};

/**
 * Exposed Database Methods
 */
module.exports = {

  // Return paginated songs, one-indexed
  async getAllSongsByPage(page = 1) {
    // Get all songs
    const audioListRaw = await readFile(AUDIO_LIST_PATH);
    const audioList = JSON.parse(audioListRaw).data;

    // Sanitize the page parameter
    const totalPages = Math.ceil(audioList.length / PAGE_SIZE);
    const currentPage = clamp(1, totalPages, page);

    // Slice the requested portion of songs into a page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageOfSongs = audioList.slice(startIndex, endIndex);

    return {
      data: pageOfSongs,
      pagination: {
        currentPage,
        totalPages,
      },
    };
  },

  // Return a single song's data by ID
  async getSongById(id) {
    const audioList = await getAllSongs();
    const songData = audioList.find(song => song.id === id);

    // Handle if the ID doesn't exist
    if (!songData) {
      return null;
    }

    // Return path to found song
    return songData;
  },

};
