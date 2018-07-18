# Replayify

> Replay your Spotify favorites!

![](docs/replayify.png)

This application uses Spotify Web API to discover users most listened tracks and artists from Spotify. User can also create playlist from their favorite tracks and artists.

[Try out replayify.com](https://replayify.com)

## Spotify API

Application uses followig parts of Spotify Web API

- [Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)
- [Get users Top Tracks and Artists](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/)
- [Get Top Tracks for Artist](https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/)
- [Get Recently played tracks for user](https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/)
- [Creating playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/)
- [Adding tracks to playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/)

## Development

- `npm install`
- `cp src/env.example.js src/env.js` and fill `SPOTIFY_CLIENT_ID`
- `npm start`

Application is based on [create-react-app](https://github.com/facebook/create-react-app)

## License

MIT
