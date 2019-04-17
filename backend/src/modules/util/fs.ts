import * as Util from 'util';
import * as Fs from 'fs';

export const WriteFile = Util.promisify(Fs.writeFile);
