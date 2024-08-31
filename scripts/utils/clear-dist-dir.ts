import { resolve } from 'path';

import { emptyDir } from 'fs-extra';

export const clearDistDir = () => emptyDir(resolve(__dirname, '../../dist'));
