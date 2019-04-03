# universal-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and has been modified to be handle server rendering.

The following changes have been made from a standard Create React App project:

- An `index.node.js` file has been added, which will be bundled to the `build/node` directory. It exports a standard Node HTTP middleware that can be used to render the app within an Express app, or within a serverless function.
- A `%RENDERED_CONTENT%` placeholder has been added to `index.html`, which is replaced with the rendered content by the NNode renderer.
- A middleware has been added to the dev server that uses `index.node.js` to render your app during development.
- Support for both `.web.js` and `.node.js` extensions, which will be used in their respective environments.
- The original value of the `process.env` object has been made usable, allowing the Node bundle to access environment variables.
- The React app has been updated to use `ReactDOM.hydrate()` instead of `ReactDOM.render()`.
- A `serve` script has been added, which can be called with `npm run serve`, and will serve the contents of `build`. It includes an express-based server to load the exported middleware.
- All SSR-related features can be disabled by removing index.node.js.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run server`

Launches a server for the content in the `build` folder.<br>
It loads the Node bundle to handle server rendering when available.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
