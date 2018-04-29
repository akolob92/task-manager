import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Task} from './task';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const TASKS_KEY = 'tasks';

@Injectable()
export class TaskService {
  private tasks: Task[];
  private subject = new BehaviorSubject<Task[]>(this.tasks);

  saveTasks(): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
    this.subject.next(this.tasks);
  }

  loadTasks(): void {
    let data = [];
    try {
      data = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
    } catch (e) {
      data = [];
    }

    this.tasks = data.map(t => new Task(t));
    this.subject.next(this.tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.subject.asObservable();
  }

  createTask(task): Task {
    const maxId = this.tasks.reduce((result: number, t: Task) => {
      return result > t.id ? result : t.id;
    }, 0);

    const maxPosition = this.tasks.reduce((result: number, t: Task) => {
      return result > t.id ? result : t.id;
    }, 0);
    task.id = maxId + 1;
    task.position = maxPosition + 1;
    this.tasks.push(task);
    this.saveTasks();

    return task;
  }

  deleteTask(task): void {
    const taskIndex = this.tasks.findIndex(t => +t.id === +task.id);

    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  }

  constructor() {
    this.loadTasks();
  }
}
