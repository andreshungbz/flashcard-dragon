// app.ts
// Express server

import express from 'express';
import path from 'path';

import httpLogger from './middleware/http-logger.js';
import notFound from './middleware/not-found.js';

import mainRoute from './routes/main-route.js';

import appconfig from './config/settings.js';

const app = express();

// templating configuration
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/views'));

// static assets configuration
app.use(express.static(path.join(process.cwd(), 'src/public')));

// middleware
app.use(express.urlencoded({ extended: true })); // parse HTML form data
app.use(httpLogger);

// routes
app.use('/', mainRoute);

// handle non-existent routes
app.use(notFound);

app.listen(appconfig.port, () => {
  console.log(
    `${appconfig.abbreviation} ${appconfig.name} running at ${appconfig.url}`
  );
});
