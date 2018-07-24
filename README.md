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

### Create Spotify App

Go to https://developer.spotify.com/dashboard/, log in and create a new App.

Add `localhost:3000/callback` as _Redirect URI_ in your Spotify App Settings.

Grab the _Client Id_ that will be added to env.js.

## Development

- `npm install`
- `cp src/env.example.js src/env.js` and fill `SPOTIFY_CLIENT_ID`
- `npm start`

Application is based on [create-react-app](https://github.com/facebook/create-react-app)

## Photo Credits

**Pink headphones**
Photo by [Icons8 team](https://unsplash.com/photos/7LNatQYMzm4) on [Unsplash](https://unsplash.com/)

**Top Artists**
Photo by [Joshua Fuller](https://unsplash.com/photos/ta7rN3NcWyM) on [Unsplash](https://unsplash.com/)

**Top Tracks**
Photo by [Feliphe Schiarolli](https://unsplash.com/photos/WJ4kTDv8lyg) on [Unsplash](https://unsplash.com/)

**Recent Plays**
Photo by [Bruce Mars](https://unsplash.com/photos/DBGwy7s3QY0) on [Unsplash](https://unsplash.com/)

## License

MIT
