// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as helmet from 'helmet';
import { join } from 'path';

const PORT = process.env.FE_PORT || 8080;
const APP_NAME = 'adata';
const DIST_FOLDER = join(process.cwd(), `dist`);

const app = express();

// Security
app.use(helmet());

// Static Assets
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// Point all routes to Angular
app.get('*', function(req, res) {
  res.sendFile(`${DIST_FOLDER}/${APP_NAME}/index.html`);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
