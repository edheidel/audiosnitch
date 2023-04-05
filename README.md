# AudioSnitch

![GitHub issues](https://img.shields.io/github/issues-raw/edheidel/audiosnitch?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/edheidel/audiosnitch?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/edheidel/audiosnitch?style=flat-square)
![GitHub deployments](https://img.shields.io/github/deployments/edheidel/audiosnitch/production?style=flat-square)

Find genres for the music you love.

Deployed version: https://audiosnitch.app/

## Technologies used
- [Next.js](https://nextjs.org/) (TypeScript, React)
- [Material UI](https://mui.com/)
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint](https://eslint.org/)

## How it works
1. Middleware handles the authentication with Spotify API via [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/).
2. Next.js backend uses Spotify API for creating own endpoints:
- [/api/search](https://audiosnitch.app/api/search/burzum)
- [/api/artist](https://audiosnitch.app/api/artist/7L6u6TyhjuwubrcojPeNgf)
- [/api/related-artists](https://audiosnitch.app/api/related-artists/7L6u6TyhjuwubrcojPeNgf)
3. Client parses and renders data on the UI using React components.

## How to use
Install dependencies:
```
yarn
```
Create an app in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). 

Store `Client ID` and `Client Secret` keys in `.env.local` file in the project root folder.
```
#Example
SPOTIFY_CLIENT_ID=ab12cd34ef5678901234gh56ij78k9l0
SPOTIFY_CLIENT_SECRET=ab12cd34ef5678901234gh56ij78k9l1
```

Start the local environment by running:
```
yarn dev
```
Run tests with:
```
yarn test
```

To deploy the app, merge changes to remote `main` branch. GitHub action will trigger automatic deployment to Vercel.

💡 Before deploying the app, make sure that `Client ID` and `Client Secret` keys are stored in production `.env` configuration.
