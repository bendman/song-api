const fs = require('fs');
const path = require('path');
const util = require('util');

// Create a promise, async/await compatible file reader
const readFile = util.promisify(fs.readFile);

const AUDIO_LIST_PATH = path.resolve(__dirname, './data/audio-list.json');

module.exports = {

  // Return a list of all songs in the database
  async getAllSongs() {
    const audioListRaw = await readFile(AUDIO_LIST_PATH);
    const audioList = JSON.parse(audioListRaw);
    return audioList.data;
  },

};
