import {Injectable, OnInit} from '@angular/core';

import {Task} from './task';

const TASKS_KEY = 'tasks';

@Injectable()
export class TaskService implements OnInit {
  tasks: Task[];

  saveTasks(): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    try {
      this.tasks = JSON.parse(localStorage.getItem(TASKS_KEY));
      return this.tasks;
    } catch (e) {
      return [];
    }
  }

  moveTask(task: Task, position: number): void {
    const current = this.tasks.find(t => t.id === task.id);
    if (current) {
      current.position = position;
    }
    this.tasks.sort((a, b) => a.position - b.position);
    this.saveTasks();
  }

  createTask(task): void {
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
  }

  updateTask(id, updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex(t => +t.id === +updatedTask.id);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1, updatedTask);
      this.saveTasks();
    }
  }

  deleteTask(task): void {
    const taskIndex = this.tasks.findIndex(t => +t.id === +task.id);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  }

  closeTask(task: Task): void {
    const current = this.tasks.find(t => t.id === task.id);
    if (current) {
      current.closed = true;
    }
    this.saveTasks();
  }

  editTask(task: Task): void {
    const current = this.tasks.find(t => t.id === task.id);
    if (current) {
      current.closed = true;
    }
    this.saveTasks();
  }

  ngOnInit() {
  }

  constructor() {
  }
}
