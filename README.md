# fahmirizaldi.com

My personal website built with Next.js, TypeScript, and Tailwind CSS.

<div align="center">
  <a href="https://fahmirizaldi.com" target="_blank">![View Demo](https://img.shields.io/badge/View%20Demo-8865ff?style=for-the-badge)</a> 
  <a href="https://github.com/rizaldifahmi/portfolio/issues/new?assignees=&labels=bug&template=bug_report.md&title=" target="_blank">![Report Bug](https://img.shields.io/badge/Report%20Bug-ff5432?style=for-the-badge)</a> 
  <a href="https://github.com/rizaldifahmi/portfolio/issues/new?assignees=&labels=&template=feature_request.md&title=" target="_blank">![Request Feature](https://img.shields.io/badge/Request%20Feature-96d117?style=for-the-badge)</a>
  <a href="https://github.com/rizaldifahmi/portfolio/fork" target="_blank">![Forks](https://img.shields.io/github/forks/rizaldifahmi/portfolio?color=8865ff&style=for-the-badge)</a>
  <a href="https://github.com/rizaldifahmi/portfolio/stargazers" target="_blank">![Stars](https://img.shields.io/github/stars/rizaldifahmi/portfolio?color=8865ff&style=for-the-badge)</a>
</div>

## Running Locally

1. Clone this repository
   ```bash
   git clone https://github.com/rizaldifahmi/portfolio.git
   ```
2. Change directory
   ```bash
   cd portfolio
   ```
3. Install dependencies
   ```bash
   yarn install
   ```
4. Create a `.env` file similar to [`.env.example`](https://github.com/rizaldifahmi/portfolio/blob/main/.env.example) and input environment variables

   ```txt
    # Client

    NEXT_PUBLIC_APP_URL=http://localhost:3000
    NEXT_PUBLIC_GOOGLE_ANALYTICS=
    NEXT_PUBLIC_SENTRY_DSN=
    NEXT_PUBLIC_AVAILABLE_FOR_HIRE=true

    # Server

    # database
    DATABASE_URL=

    # next-auth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=

    # sentry
    SENTRY_DSN=
    SENTRY_AUTH_TOKEN=

    # google
    GOOGLE_ID=
    GOOGLE_SECRET=

    # github
    GITHUB_ID=
    GITHUB_SECRET=
    GITHUB_READ_USER_TOKEN_PERSONAL=

    # spotify
    SPOTIFY_CLIENT_ID=
    SPOTIFY_CLIENT_SECRET=
    SPOTIFY_CLIENT_REFRESH_TOKEN=

    # wakatime
    WAKATIME_API_KEY=
   ```

5. Start hacking
   ```bash
   yarn dev
   ```

## Deployment

Deploy to Vercel, Netlify, etc

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/rizaldifahmi/portfolio) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rizaldifahmi/portfolio)

## License

Licensed under the [MIT License](https://github.com/rizaldifahmi/portfolio/blob/master/LICENSE).
