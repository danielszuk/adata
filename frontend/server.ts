// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as helmet from 'helmet';
import { join } from 'path';

const PORT = process.env.PORT || 3000;
const APP_NAME = 'adata';
const DIST_FOLDER = join(process.cwd() + `/${APP_NAME}`);

const app = express();

// Security
app.use(helmet());

// Static Assets
app.get('*.*', express.static(APP_NAME));

// Point all routes to Angular
app.get('*', function(req, res) {
  res.sendFile(`${DIST_FOLDER}/index.html`);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
