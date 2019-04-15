# Song API Example

An example of a simple song API in Node with Express.

## Getting Started

1. Clone the repo
2. Install dependencies (`npm install`)
3. Start the server (`npm start`)

## Endpoints

### GET /song

Returns a paginated list of songs.

GET Parameters: `page=$x` where `$x` is the page to request (starting at 1)

Example Response:
```json
{
  "data": [{
    "id": "a",
    "title": "First Song",
    "link": "/song/a/file.mp3"
  }, {
    "id": "b",
    "title": "Second Song",
    "link": "/song/b/file.mp3"
  }],
  "pagination": {
    "currentPage": 1,
    "totalPages": 4
  }
}
```

### GET /song/:id/file.mp3

URL Parameters: `id`, which must match a valid ID of a song.

Example Response: Binary MP3 File

## Suggested Improvements

- Unit testing, preferably end-to-end
- An actual database to store the audio list
- Memoization of full list data (if not using a real database)
- Return full links (http://.../song/:id/file.mp3)
- Return links to first, previous, next, and last pages in pagination block
- Move song object definition/sanitization into another directory for data sanitization