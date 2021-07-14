# Open Tender Web App

An open source web app powered by the Open Tender e-commerce platform for restaurants.

## Getting started with the Open Tender Web App

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux Toolkit](https://redux-toolkit.js.org/) template. See the "Available Scripts" section below for guidance on basic usage.

To get started, pull down a copy of the repo and run `yarn install` in your new directory. This will install all of the dependencies for the project. Once you've done this, follow the steps below to get up and running.

Add an `.env` file that looks like this:

```
SKIP_PREFLIGHT_CHECK=true
```

Add an `.env.development` file that looks like this:

```
REACT_APP_AUTH_URL=https://api.sandbox.opentender.io
REACT_APP_API_URL=https://api.sandbox.opentender.io/order-api
REACT_APP_CLIENT_ID=[OPEN_TENDER_CLIENT_ID]
REACT_APP_BRAND_ID=[OPEN_TENDER_BRAND_ID]
```

An Open Tender client ID and brand ID will be provided by the Open Tender dev team once your company (if you're a restaurant) or your client (if you're a design agency) has established an Open Tender account. For more information about this, please visit the Open Tender website.

Once those files have been added, run `yarn start` to start the app. The app should open up at http://localhost:3000, and it should be able to make requests to the Open Tender Sandbox API. Please note that you can change your port by adding `PORT=[PORT_NUMBER]` to your `.env.development` file, such as `PORT=3010`.

## Available Scripts

Since this app was originally started from Create React App (CRA), it comes with all of the regular CRA scripts, and we've added a couple of additional ones:

### `yarn build:staging`

This is used for deploying to staging per the instructions below.

### `yarn prebuild`

This is used for versioning of the app, which allows for cache busting on the client side. See `src/app/version.js` for details into how this works.

In short, the `yarn prebuild` script updates the `meta.json` file that lives in the `public` directory. Each time the `maybeRefreshVersion()` function runs (which runs on every page load by default), it checks to see if the version of the user's app matches this version. If not, it will automatically reload the page, which ensures that the user has the latest and greatest code.

In order to leverage this, each time you push a new version to staging or production, you should increment the app version using `yarn version` (typically in conjunction with one of the `--patch`, `--minor`, or `--major` flags, see [the docs on `yarn version` for details](https://classic.yarnpkg.com/en/docs/cli/version/)), and then run the `yarn prebuild` script and commit the updated `meta.json` file).

This will guarantee that your users always get the latest version of the app, even if they don't refresh the page or load a new window when coming back to the app after they've already visited it.

## Deploying to Production and Staging Environments

The repo contains example `.env.production` and `.env.staging` files that you can use for deploying to production and staging environments. The important differences include the following environment variables:

```
REACT_APP_AUTH_URL=https://api.opentender.io
REACT_APP_API_URL=https://api.opentender.io/order-api
REACT_APP_CLIENT_ID=[OPEN_TENDER_CLIENT_ID]
```

The production API lives at `https://api.opentender.io` and the sandbox API lives at `https://api.sandbox.opentender.io`. Your Client ID will also be different for each environment.

Two other env vars are worth noting:

### `REACT_APP_SENTRY_DSN`

The Open Tender web app supports Sentry for bug tracking, a

### `REACT_APP_RECAPTCHA_KEY`

The Open Tender web app supports Google Recaptcha v2 on certain payment forms, which can be found in the following components that come from the `@open-tender/components` library:

- `CreditCardForm`
- `GiftCardsForm`
- `DonationForm`

If your companny or client has chosen to use Google Recaptcha in these components, you will need to create a Google Recaptcha v2 account that works for the relevant domains.
