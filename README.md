# Evolution TypeScript bootcamp project

![Banner](https://user-images.githubusercontent.com/39806020/173252914-c4987705-04c5-4d89-8360-fa5012147d2c.png)

![GitHub](https://img.shields.io/github/license/edheidel/which-music-style-is-this?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/edheidel/which-music-style-is-this?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/edheidel/which-music-style-is-this)
![GitHub deployments](https://img.shields.io/github/deployments/edheidel/which-music-style-is-this/production)

Find genres for the music you are listening to.

![Gif](./demo.gif)

Deployed version: https://which-music-style-is-this.vercel.app/

## Technologies used
- TypeScript
- React
- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- CSS Modules, Flexbox, animations
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint](https://eslint.org/), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## How it works
1. The server handles an authentication with Spotify API via [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/) and fetches artist data via [/search endpoint](https://developer.spotify.com/documentation/web-api/reference/#/operations/search).
3. The custom Artists API outputs a JSON with the artist data.
Example: `https://which-music-style-is-this.vercel.app/api/artists/imagine%20dragons`
3. Data is parsed on the client side and gets rendered on the UI using React components.

## How to use
Download the repo and install dependencies:
```
yarn
```
Create an app in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Store `Client ID` and `Client Secret` keys in `.env.local` file in the project root folder:
```
SPOTIFY_CLIENT_ID=123456789f4540bb8d19b7b3a6c9cxyz
SPOTIFY_CLIENT_SECRET=123456789800c40a2b4cd202a1df5bxyz
```

Set up the local environment by running:
```
yarn dev
```
To start unit tests run:
```
yarn test
```
💡 When deploying the app, make sure that the `Client ID` and `Client Secret` keys are stored in a production `.env` configuration.
