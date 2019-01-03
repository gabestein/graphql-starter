# React GraphQL Starter

## A basic starter for universally rendered (if you want) graphql-powered sites using NextJS, Auth0, and Apollo.
This is a basic, highly opinionated starter that allows you to very quickly build React apps with
authentication, authorization, a good API, and universal rendering out of the box. **Before using this
project, you should be aware that it has not been hardened for production use, and is more an exploration
of a few emerging philosophies than a working toolkit. There are a number of tradeoffs that come with it.
In other words: use at your own risk.**

The main goal of this project is to make it possible for a single developer to build a complex,
service-oriented-style app that can be expanded later, while still feeling as if they're working on a
monolithic-style, easy-to-reason stack.
A few new technologies, chief among them GraphQL, make achieving this flexibility newly possible.

This was built by a someone with limited daily professional development experience, but a fair amount of
computer science education and application architecture experience.
Thus, it is designed to solve common headaches that come from building entire apps by yourself.
Among them:

### Minimizing Dev Environment Complexity
The project uses NextJS's out-of-the-box development server with hot-swapping and Netlify's local
lambda environment.
The goal was to take away the pain of self-managing a tangle of Babel, Webpack, and other toolchains
while allowing developers the ability to hook into those configurations if needed.

### Minimizing State Management Complexity
The project uses Apollo/GraphQL to tightly couple data to individual components with a central store
managed behind the scenes by Apollo.
The goal, bluntly, was to take away the pain of Redux. Redux was a vast improvement over previous flux
architecture, but is still painful for an individual developer to manage when apps get more complex.
The combination of Apollo and React Context makes self-managing a single atom/store with reducers
unnecessary.

### Minimizing External Service Requirements**
The project encourages "owning" as much as your own stack as feasible, while still being simple to manage.
It's not a complete success.
It relies entirely on [Auth0](https://auth0.com) for authentication.
Other than that, it can consume any GraphQL endpoint, and be hosted on just about any platform.

### Minimizing API Development Complexity**
The project encourages the use of a GraphQL service like [Hasura](https://hasura.io) or [Prisma](https://prisma.io).
These projects, combined with hosting services like Heroku, Digital Ocean, and Amazon Lightsail, make it extremely
simple to design and deploy scalable, performant APIs with authorization with little configuration or server management required.
The goal was twofold:
First, to avoid the pain of managing a REST API, which is the chief source of complexity for many single developers
attempting to build service-oriented-style apps.
Second, to avoid the pain of writing your own resolvers, which is a source of complexity for more barebones graphQL
engines.
Using modern GraphQL engines comes with a tradeoff, however.
They drastically simplify the movement of data from database to front-end component by eliminating the need to
translate from database structures to server-side structures to API endpoint structures.
In so doing, they remove the ORM metaphors many developers are familiar with, instead translating directly from
relational database best practices to graphs.
Thus, developers should have a basic understanding of relational database practices before working with these
systems.

### Minimizing Build and Deployment Complexity**
The project uses NextJS's deployment tools so it can be built and deployed as a server-side-only rendered app (SSR),
a client-side single page application (SPA), a universal app, or all of the above at once.
The project can be easily deployed on Heroku, Netlify, Amazon AWS/Lightsail, Digital Ocean, and beyond with
minimal configuration.

## Tech
- [NextJS](https://nextjs.org), for the basic React-based universal framework
- [Express](https://expressjs.com/), for custom server routes if running server-side
- [Apollo](https://www.apollographql.com/), for the GraphQL client
- [Auth0](https://www.auth0.com/), for authentication
- [Blueprint](https://blueprintjs.com), for components and basic styles
- [ESLint](https://eslint.org/), for linting/static analysis
- [Netlify-Lambda](https://netlify.com) for static functions

## Missing Pieces
The project is by no means complete.
It's missing quite a few pieces that are required for most projects.
Among them:

- Background jobs/processing/queuing.
- More intelligent state management/hydration for bootstrapping the client in SSR apps via Apollo.
- Server-side authorization.
- Clearer understanding of server-side and client-side parts of the app, in particular NextJS's getInitialProps.
- Universal server-side functions that can run via express or via Lambda. I.E.,
if you don't intend to use Netlify or AWS Lambda, you'll need to develop Express
functions served by NextJS.
- Better development environment database support.
- Offline mode.
- Any testing at all.

## Installation
1. Make sure you have the version of node specified in .node-version installed on your machine. I use nodenv to help with this.
1. Grab modules by running `npm install`
1. Copy `example.env` to `.env` and set the proper credentials.
1. If using Hasura, copy `db/config.example.yaml` to `db/config.yaml` and add the proper credetnails.
1. If using Hasura, [install the CLI](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html).
1. If using Hasura, apply the first migrations with `hasura migrate apply`.

## Running

### SSR Dev
1. Run `npm run dev`
1. The site will be available at `https://localhost:3000`

### SSR Dev with Functions
1. Run `npm run dev:functions`
1. The site will be available at `https://localhost:3000`
1. Netlify lambda functions will be available at `https://localhost:9000/function-name`

### Static builds
1. Run `npm run export`
1. cd to `out` directory
1. User `serve` or similar via `serve -p 8080` and browse to `localhost:8080` to see static site

### Hasura
1. run `cd db`
1. run `hasura console`
1. Any modifications made via the console will be saved as migrations.

## Deploying
This describes the deployment configurations I've tried, all of which use static generation.
But NextJS is simply an Express app.
If you intend to use it for SSR, it can be deployed almost anywhere that supports Node/Express.

### Netlify
1. Create a new site from your repo.
1. Set the build command to `npm run export`.
1. Set the serving directory to `out`.
1. Set the environment variables for `API_URL`, `AUTH_CLIENT_ID`, `AUTH_DOMAIN`, and `SITE_URL`.
1. Trigger a build manually or via a new git push.

### Hasura
Hasura can be deployed on top of any postgres database, but it's especially nice because it can be installed with one click to Heroku or Digital Ocean, both of which I've used.
[More info in their docs](https://docs.hasura.io/1.0/graphql/manual/deployment/index.html).
From there, [securing the endpoint](https://docs.hasura.io/1.0/graphql/manual/deployment/securing-graphql-endpoint.html) is relatively trivial either via environment variables for Heroku, or a config file for configurations that use Docker instances, like Digital Ocean.

## Development Notes

### Environment variables
The starter uses a combination of dot-env and [NextJS runtime config](https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side) to make sure no sensitive environment variables leak to the client. By default, no variables are available to client that aren't explicitly set in [next.config.js](/next.config.js). Environment variables set upstream (ie on Heroku or Netlify) will automatically replace environment variables set in .env, so make sure to set your variables in those locations.

### Lambda functions
Code placed in `functions/src` will be automatically packaged and built when you run `npm run dev:functions` or `npm run export`.
These functions resemble AWS Lambda, returning a callback with status and body information.
For more documentation about functions, see [Netlify's docs](https://www.netlify.com/docs/functions/).

### Auth0 + Safari Issues
I'm honestly not a big fan of auth0, for a bunch of reasons. But it works. One big issue they currently have is there is no way to keep someone logged in on the client on Safari without setting up a custom domain at the same root as your site. See: https://auth0.com/docs/api-auth/token-renewal-in-safari
