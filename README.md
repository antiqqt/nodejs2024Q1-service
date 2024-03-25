# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.JS - [Download & Install Node.JS](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone git@github.com:antiqqt/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### OpenAPI docs

When running the app, you can access OpenAPI docs at http://localhost:4000/api.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Running application with Docker

This command will build and start all the app's containers in detached mode.

```
npm run docker:start
```

To stop application use

```
npm run docker:stop
```

To restart application use

```
npm run docker:restart
```

## Checking for vulnerabilities

To make a quick health & security check of the image, use

```
npm run docker:scout
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.
