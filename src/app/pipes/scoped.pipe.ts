import {Pipe} from '@angular/core';
import {Task} from '../task';

@Pipe({
  name: 'scoped'
})
export class ScopedPipe {
  transform(tasks: Task[], scope: String): Task[] {
    switch (scope) {
      case 'coming':
        return tasks.filter((task) => {
          return task.isComing();
        });
      case 'expired':
        return tasks.filter((task) => {
          return task.isExpired();
        });
      case 'closed':
        return tasks.filter((task) => {
          return task.isClosed();
        });
      case 'all':
      default:
        return tasks;
    }
  }
}
