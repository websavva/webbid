import { staleOrdersRemovalJob } from './stale-orders-removal';

export class TasksManager {
  private static jobs = [staleOrdersRemovalJob];

  public static init() {
    this.jobs.forEach((job) => {
      job.start();
    });
  }

  public static stop() {
    this.jobs.forEach((job) => job.stop());
  }
}
