import { runCommand } from './utils/run-command';
import { clearDistDir } from './utils/clear-dist-dir';
import { Builder } from './utils/builder';

runCommand(async () => {
  await clearDistDir();

  await Builder.buildCMSConfig();
});
