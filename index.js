const express = require('express');
const songRouter = require('./routes/song');

const PORT = process.env.PORT || 3000;

const app = express();

// Attach server routes
app.use('/song', songRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
